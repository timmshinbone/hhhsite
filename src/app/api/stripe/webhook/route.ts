import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import Stripe from 'stripe';
import {
  entitlementsForPrices,
  ML_GROUP_CUSTOMERS,
  ML_GROUP_NEWSLETTER,
  ENTITLEMENTS,
} from '@/lib/catalog';
import { upsertSubscriber, findSubscriber, removeFromGroup } from '@/lib/mailerlite';
import { claimEvent, savePurchase, getPurchaseBySession, revokePurchase } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  if (!signature) return new NextResponse('Missing signature', { status: 400 });

  // Raw body is required for signature verification.
  // Do NOT call req.json() first — it consumes the stream.
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      raw,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!, // PLACEHOLDER — set to your Stripe webhook signing secret
    );
  } catch (err) {
    console.error('stripe signature verification failed', err);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  // Stripe redelivers on any non-2xx. Claim the event ID so a retry after
  // a partial failure cannot double-fire the delivery email.
  if (!(await claimEvent(event.id))) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'charge.refunded':
        await handleRefund(event.data.object as Stripe.Charge);
        break;
      default:
        break;
    }
  } catch (err) {
    // Returning 500 makes Stripe retry, which is what we want for transient
    // MailerLite or Redis failures.
    console.error(`handler failed for ${event.type} / ${event.id}`, err);
    return new NextResponse('Handler error', { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCompleted(session: Stripe.Checkout.Session) {
  if (session.payment_status !== 'paid') return;

  const email =
    session.customer_details?.email ?? session.customer_email ?? null;
  if (!email) throw new Error(`No email on session ${session.id}`);

  // Line items are not included in the webhook payload — fetch them.
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });
  const priceIds = lineItems.data
    .map((li) => li.price?.id)
    .filter((id): id is string => Boolean(id));

  const entitlements = entitlementsForPrices(priceIds);
  if (entitlements.length === 0) {
    throw new Error(
      `No entitlements matched prices ${priceIds.join(',')} on ${session.id}`,
    );
  }

  // One opaque token covers the whole order. /download/<token> serves every
  // file the order granted, so a bundle buyer gets one link, not several.
  const token = randomBytes(24).toString('base64url');

  await savePurchase({
    token,
    email,
    entitlementKeys: entitlements.map((e) => e.key),
    sessionId: session.id,
    createdAt: new Date().toISOString(),
  });

  const optedIn = session.consent?.promotions === 'opt_in';

  const groups = [
    ML_GROUP_CUSTOMERS,
    ...entitlements.map((e) => e.mailerliteGroupId),
    ...(optedIn ? [ML_GROUP_NEWSLETTER] : []),
  ];

  // Read from our custom_fields first; fall back to splitting the billing name.
  const cfMap = Object.fromEntries(
    (session.custom_fields ?? []).map((f) => [f.key, f.text?.value ?? ''])
  );
  const fullName = session.customer_details?.name ?? '';
  const [splitFirst, ...splitRest] = fullName.split(' ');
  const firstName = cfMap.first_name?.trim() || splitFirst || '';
  const rest = cfMap.last_name?.trim() ? [cfMap.last_name.trim()] : splitRest;

  const subscriber = await upsertSubscriber({
    email,
    groups,
    // Only mark active on explicit consent. Never quietly resubscribe someone
    // who previously opted out — a purchase alone is not marketing consent.
    status: optedIn ? 'active' : undefined,
    fields: {
      name: firstName || '',
      last_name: rest.join(' '),
      download_url: `${process.env.SITE_URL}/download/${token}`,
      purchased_product: entitlements.map((e) => e.label).join(', '),
      order_ref: session.id,
    },
  });

  // A previously-unsubscribed buyer will not receive the MailerLite automation
  // email. The thank-you page still shows the link, but flag it so you can
  // follow up manually.
  if (subscriber.status !== 'active') {
    console.warn(
      `[delivery-risk] ${email} is ${subscriber.status} in MailerLite; ` +
        `automation email will not send. Purchase ${session.id}, token ${token}`,
    );
  }
}

async function handleRefund(charge: Stripe.Charge) {
  // Only act on a full refund — partial refunds on a bundle need a human.
  if (charge.amount_refunded < charge.amount) return;

  const sessions = await stripe.checkout.sessions.list({
    payment_intent: charge.payment_intent as string,
    limit: 1,
  });
  const session = sessions.data[0];
  if (!session) return;

  const record = await revokePurchase(session.id);
  if (!record) return;

  const subscriber = await findSubscriber(record.email);
  if (!subscriber) return;

  for (const key of record.entitlementKeys) {
    const ent = ENTITLEMENTS[key];
    if (ent) await removeFromGroup(subscriber.id, ent.mailerliteGroupId);
  }
}
