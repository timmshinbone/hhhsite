import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { productBySlug } from '@/lib/catalog';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * POST { slug: string }  →  { clientSecret: string }
 *
 * Accepts a slug rather than a price ID so the client never names a price
 * and there is nothing to tamper with.
 * The Stripe EmbeddedCheckoutProvider calls this on mount.
 */
export async function POST(req: NextRequest) {
  try {
    const { slug } = (await req.json()) as { slug?: string };
    const product = slug ? productBySlug(slug) : null;

    if (!product) {
      return NextResponse.json({ error: 'Unknown product' }, { status: 400 });
    }

    const origin = req.headers.get('origin') ?? process.env.SITE_URL!;

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page',
      mode: 'payment',
      line_items: [{ price: product.priceId, quantity: 1 }],

      // PLACEHOLDER — this URL is where Stripe sends the buyer after payment.
      // It must match the domain registered in Stripe and be publicly accessible.
      return_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,

      // Enable after accepting ToS at dashboard.stripe.com/settings/checkout:
      // consent_collection: { promotions: 'auto' },

      // Enable once Stripe Tax is configured on the account:
      // automatic_tax: { enabled: true },

      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      customer_creation: 'always',

      metadata: { slug: product.slug },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error('checkout session create failed', err);
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 500 });
  }
}
