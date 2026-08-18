import { upsertSubscriber } from '@/lib/mailerlite';
import { LEAD_MAGNETS } from '@/lib/catalog';
import { getLeadToken, saveLead } from '@/lib/store';
import { checkSignupLimits, clientIp } from '@/lib/ratelimit';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let email: string;
  let groupParam: string;
  let firstName: string;
  let lastName: string;
  let slug: string;
  let website: string;
  try {
    const body = await request.json();
    email = typeof body?.email === 'string' ? body.email.trim() : '';
    groupParam = typeof body?.group === 'string' ? body.group : '';
    firstName = typeof body?.firstName === 'string' ? body.firstName.trim() : '';
    lastName = typeof body?.lastName === 'string' ? body.lastName.trim() : '';
    slug = typeof body?.slug === 'string' ? body.slug.trim() : '';
    website = typeof body?.website === 'string' ? body.website : '';
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: 'A valid email address is required.' },
      { status: 400 },
    );
  }

  // ─── Lead magnet flow ────────────────────────────────────────────────────
  if (slug) {
    // Honeypot: bots fill hidden fields, humans don't
    if (website) {
      return Response.json({ error: 'Invalid submission.' }, { status: 400 });
    }

    const leadMagnet = LEAD_MAGNETS[slug];
    if (!leadMagnet) {
      return Response.json({ error: 'Unknown freebie.' }, { status: 400 });
    }

    const ip = clientIp(request.headers);
    const rl = await checkSignupLimits(ip, email);
    if (!rl.ok) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    // Deduplication: return the existing token if they already signed up
    const existingToken = await getLeadToken(email, slug);
    if (existingToken) {
      const siteUrl = process.env.SITE_URL ?? '';
      return Response.json({
        downloadUrl: `${siteUrl}/download/${existingToken}`,
        repeat: true,
      });
    }

    const token = crypto.randomUUID();
    const siteUrl = process.env.SITE_URL ?? '';
    const downloadUrl = `${siteUrl}/download/${token}`;

    await saveLead({
      token,
      email,
      slug,
      fileKey: leadMagnet.fileKey,
      label: leadMagnet.name,
      createdAt: new Date().toISOString(),
    });

    await upsertSubscriber({
      email,
      groups: [leadMagnet.mlGroupId],
      status: 'active',
      fields: {
        download_url: downloadUrl,
        purchased_product: leadMagnet.name,
        ...(firstName ? { name: firstName } : {}),
        ...(lastName ? { last_name: lastName } : {}),
      },
    });

    return Response.json({ downloadUrl, repeat: false });
  }

  // ─── Existing flow (quiz email capture, etc.) ────────────────────────────
  const apiKey = process.env.MAILERLITE_API_KEY;
  const freebieGroupId = process.env.MAILERLITE_FREEBIE_GROUP_ID;
  const waitlistGroupId = process.env.MAILERLITE_CONSULTATION_WAITLIST_GROUP_ID;

  if (!apiKey || !freebieGroupId) {
    console.error('Missing MAILERLITE_API_KEY or MAILERLITE_FREEBIE_GROUP_ID');
    return Response.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  const resolvedGroupId =
    groupParam === 'waitlist' && waitlistGroupId ? waitlistGroupId : freebieGroupId;

  try {
    await upsertSubscriber({
      email,
      groups: [resolvedGroupId],
      status: 'active',
      ...((firstName || lastName) ? {
        fields: {
          ...(firstName ? { name: firstName } : {}),
          ...(lastName ? { last_name: lastName } : {}),
        },
      } : {}),
    });
    return Response.json({ success: true });
  } catch (err) {
    console.error('MailerLite upsert failed:', err);
    return Response.json(
      { error: 'Could not subscribe. Please try again.' },
      { status: 502 },
    );
  }
}
