import { Redis } from '@upstash/redis';

/**
 * Thin persistence layer backed by Upstash Redis.
 * Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in env.
 */

const redis = Redis.fromEnv();

export type PurchaseRecord = {
  token: string;
  email: string;
  entitlementKeys: string[];
  sessionId: string;
  createdAt: string;
  revoked?: boolean;
};

const purchaseKey = (token: string) => `purchase:${token}`;
const eventKey = (eventId: string) => `stripe:event:${eventId}`;
const sessionIndexKey = (sessionId: string) => `session:${sessionId}`;

/**
 * Returns true the first time it sees a Stripe event ID, false on every retry.
 * Stripe redelivers on any non-2xx, so without this a network blip means the
 * buyer gets two delivery emails.
 */
export async function claimEvent(eventId: string): Promise<boolean> {
  const result = await redis.set(eventKey(eventId), '1', {
    nx: true,
    ex: 60 * 60 * 24 * 30,
  });
  return result === 'OK';
}

export async function savePurchase(record: PurchaseRecord): Promise<void> {
  await redis.set(purchaseKey(record.token), record);
  await redis.set(sessionIndexKey(record.sessionId), record.token);
}

export async function getPurchase(token: string): Promise<PurchaseRecord | null> {
  return (await redis.get<PurchaseRecord>(purchaseKey(token))) ?? null;
}

/** Used by the thank-you page to show the download link without trusting the URL. */
export async function getPurchaseBySession(
  sessionId: string,
): Promise<PurchaseRecord | null> {
  const token = await redis.get<string>(sessionIndexKey(sessionId));
  return token ? getPurchase(token) : null;
}

export async function revokePurchase(
  sessionId: string,
): Promise<PurchaseRecord | null> {
  const record = await getPurchaseBySession(sessionId);
  if (!record) return null;
  await savePurchase({ ...record, revoked: true });
  return record;
}
