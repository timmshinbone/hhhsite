import { LEAD_MAGNETS } from '@/lib/catalog';
import { presignDownload } from '@/lib/storage';

export const runtime = 'nodejs';

export async function GET() {
  const { fileKey, name } = LEAD_MAGNETS['simple-shopping-savings'];
  const url = await presignDownload(fileKey, `${name}.pdf`);
  const r2 = await fetch(url);
  if (!r2.ok) {
    return new Response('File temporarily unavailable.', { status: 502 });
  }
  const headers: Record<string, string> = {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${name}.pdf"`,
    'Cache-Control': 'no-store',
  };
  const len = r2.headers.get('Content-Length');
  if (len) headers['Content-Length'] = len;
  return new Response(r2.body, { headers });
}
