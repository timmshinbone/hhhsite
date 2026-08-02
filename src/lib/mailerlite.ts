const ML_BASE = 'https://connect.mailerlite.com/api';

type UpsertArgs = {
  email: string;
  fields?: Record<string, string | number | null>;
  groups: string[];
  /**
   * Only pass 'active' when the buyer explicitly opted in to marketing.
   * Never silently resubscribe someone who previously opted out.
   */
  status?: 'active' | 'unconfirmed';
};

export type MlSubscriber = {
  id: string;
  email: string;
  status: string;
};

/**
 * Upsert by email. Creates or updates, and additively merges groups
 * (it does not remove existing ones).
 *
 * IMPORTANT: fields and groups go in ONE call. If you add the subscriber
 * first and set download_url second, the "joined group" automation can
 * fire against an empty field and mail a broken link.
 */
export async function upsertSubscriber(args: UpsertArgs): Promise<MlSubscriber> {
  const body: Record<string, unknown> = {
    email: args.email,
    groups: args.groups.filter(Boolean),
  };
  if (args.fields) body.fields = args.fields;
  if (args.status) body.status = args.status;

  const res = await fetch(`${ML_BASE}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MailerLite upsert failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as { data: MlSubscriber };
  return json.data;
}

/** Used by the refund handler to revoke group access. */
export async function removeFromGroup(subscriberId: string, groupId: string) {
  const res = await fetch(
    `${ML_BASE}/subscribers/${subscriberId}/groups/${groupId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        Accept: 'application/json',
      },
    },
  );
  if (!res.ok && res.status !== 404) {
    throw new Error(`MailerLite group removal failed (${res.status})`);
  }
}

export async function findSubscriber(email: string): Promise<MlSubscriber | null> {
  const res = await fetch(
    `${ML_BASE}/subscribers/${encodeURIComponent(email)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        Accept: 'application/json',
      },
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`MailerLite lookup failed (${res.status})`);
  const json = (await res.json()) as { data: MlSubscriber };
  return json.data;
}
