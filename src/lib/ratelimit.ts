import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

/**
 * Fixed-window limiter. Crude compared to a sliding window, but it is a single
 * Redis command, and precision genuinely does not matter for abuse control.
 *
 * Every public route in this app is unauthenticated and does something that
 * costs money: sends email through a third party, creates Stripe objects, or
 * serves bytes out of object storage. Rate limiting here is cost control at
 * least as much as it is security.
 */
export async function limit(
  key: string,
  max: number,
  windowSeconds: number,
): Promise<{ ok: boolean; count: number }> {
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSeconds);
  return { ok: count <= max, count };
}

/**
 * Trust only the platform-set header. Anything the client can spoof is
 * useless for this purpose, and on Vercel the leftmost entry is the real
 * client address.
 */
export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

const HOUR = 60 * 60;
const DAY = 24 * HOUR;

/** Signup form. Generous on email because people legitimately retry. */
export async function checkSignupLimits(ip: string, email: string) {
  const byIp = await limit(`rl:signup:ip:${ip}`, 10, HOUR);
  if (!byIp.ok) return { ok: false as const, reason: 'ip' as const };

  const byEmail = await limit(`rl:signup:email:${email.toLowerCase()}`, 5, HOUR);
  if (!byEmail.ok) return { ok: false as const, reason: 'email' as const };

  return { ok: true as const };
}

/**
 * Checkout session creation. Tight, because the legitimate pattern is one or
 * two sessions per person per visit. A loop here is either a card-testing
 * probe or a bug of yours, and both are worth stopping.
 */
export async function checkCheckoutLimits(ip: string) {
  return limit(`rl:checkout:ip:${ip}`, 15, HOUR);
}

/**
 * Download route. The permanent token link is the whole point, so this has to
 * accommodate a customer re-downloading over months. What it stops is a token
 * getting posted publicly and pulling thousands of fetches.
 */
export async function checkDownloadLimits(ip: string, token: string) {
  const byIp = await limit(`rl:dl:ip:${ip}`, 60, HOUR);
  if (!byIp.ok) return { ok: false as const, reason: 'ip' as const };

  const byToken = await limit(`rl:dl:token:${token}`, 25, DAY);
  if (!byToken.ok) return { ok: false as const, reason: 'token' as const };

  return { ok: true as const };
}

/**
 * Lifetime counter per token, kept separately from the rate-limit window.
 * This is your sharing signal: a token sitting at 400 downloads was posted
 * somewhere public.
 */
export async function recordDownload(token: string): Promise<number> {
  return redis.incr(`dl:count:${token}`);
}
