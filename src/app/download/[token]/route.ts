import { NextRequest, NextResponse } from 'next/server';
import { getPurchase } from '@/lib/store';
import { ENTITLEMENTS } from '@/lib/catalog';
import { presignDownload } from '@/lib/storage';

export const runtime = 'nodejs';

/**
 * GET /download/<token>           → single file redirect, or chooser for bundles
 * GET /download/<token>?item=key  → redirect to a fresh presigned R2 URL
 *
 * The token link is permanent so a buyer can come back months later.
 * The presigned URL it mints lives 15 minutes, so the bucket object is
 * never publicly addressable or indexable.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const record = await getPurchase(token);

  if (!record || record.revoked) {
    return new NextResponse('This download link is no longer valid.', {
      status: 404,
    });
  }

  const files = record.entitlementKeys
    .map((k) => ENTITLEMENTS[k])
    .filter((e) => e && e.fileKey);

  if (files.length === 0) {
    return new NextResponse('Nothing to download for this order.', { status: 404 });
  }

  const requested = req.nextUrl.searchParams.get('item');
  const target =
    files.length === 1 ? files[0] : files.find((f) => f.key === requested);

  if (!target) {
    // Bundle with no item specified: render a minimal chooser.
    const links = files
      .map(
        (f) =>
          `<li><a href="/download/${token}?item=${f.key}">${f.label}</a></li>`,
      )
      .join('');
    return new NextResponse(
      `<!doctype html><meta charset="utf-8">
       <title>Your downloads — Healthy Homemade Habits</title>
       <h1>Your downloads</h1><ul>${links}</ul>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }

  const url = await presignDownload(target.fileKey!, `${target.label}.pdf`);
  return NextResponse.redirect(url, 302);
}
