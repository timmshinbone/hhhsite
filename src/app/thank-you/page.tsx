import Link from 'next/link';
import type { Metadata } from 'next';
import { getPurchaseBySession } from '@/lib/store';
import styles from './thank-you.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Order Complete — Thank You',
  robots: { index: false, follow: false },
};

/**
 * Resolves the purchase record from the session ID with brief retries.
 *
 * Stripe redirects the browser and fires the webhook in parallel, so the
 * record occasionally is not written yet when the buyer lands here. Five
 * short retries cover the race without shipping a client-side polling loop.
 */
async function resolvePurchase(sessionId: string, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    const record = await getPurchaseBySession(sessionId);
    if (record) return record;
    await new Promise((r) => setTimeout(r, 600));
  }
  return null;
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <section className="section">
        <div className="wrap">
          <p>We could not find that order. If you believe this is an error, please reply to your receipt email.</p>
        </div>
      </section>
    );
  }

  const record = await resolvePurchase(sessionId);

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        {record ? (
          <>
            {/* ========== Confirmation card ========== */}
            <div className={styles.card}>
              <i className={`ph ph-check-circle ${styles.checkIcon}`} />
              <div className={styles.cardBody}>
                <span className={styles.orderLabel}>Order complete</span>
                <h1 className={styles.headline}>You are all set</h1>
                <p className={styles.emailNote}>
                  We&apos;ve also emailed this link to{' '}
                  <strong>{record.email}</strong> so you can find it later.
                </p>
              </div>
              <Link href={`/download/${record.token}`} className={styles.downloadBtn}>
                <i className="ph ph-download-simple" />
                Download now
              </Link>
              <p className={styles.permanentNote}>
                <i className="ph ph-link-simple" />
                This link is yours permanently — it always serves the latest
                version of the guide.
              </p>
            </div>

            {/* ========== Info grid ========== */}
            <div className={styles.infoGrid}>
              <div className={styles.infoCard} data-accent="forest">
                <i className="ph ph-envelope-simple" />
                <h3>Check your inbox</h3>
                <p>
                  Your receipt and download link arrive within a couple of
                  minutes. Look in Promotions if you don&apos;t see it.
                </p>
              </div>
              <div className={styles.infoCard} data-accent="sage">
                <i className="ph ph-question" />
                <h3>Need a hand?</h3>
                <p>
                  Reply to your receipt and we will send the file straight over.
                  The order reference is on the receipt.
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Webhook hasn't written the record yet — show a safe fallback */
          <div className={styles.card}>
            <i className={`ph ph-check-circle ${styles.checkIcon}`} />
            <div className={styles.cardBody}>
              <span className={styles.orderLabel}>Payment received</span>
              <h1 className={styles.headline}>Your download is on its way</h1>
              <p className={styles.emailNote}>
                It&apos;s being prepared and will land in your inbox within a
                couple of minutes. If it doesn&apos;t arrive, reply to your
                receipt and we&apos;ll send it straight over.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
