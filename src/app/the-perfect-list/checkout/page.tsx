import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './checkout.module.css';
import CheckoutForm from './CheckoutForm';

export const metadata: Metadata = {
  title: 'Checkout: The Perfect Grocery List',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className={styles.page}>

      {/* ========== Stripped checkout header ========== */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/small-circle-logo.svg"
              alt=""
              width={38}
              height={38}
              unoptimized
            />
            Healthy Homemade Habits
          </Link>
          <div className={styles.headerRight}>
            <span className={styles.secureLabel}>
              <i className="ph ph-lock-simple" />
              Secure checkout
            </span>
            <Link href="/the-perfect-list" className={styles.backLink}>
              <i className="ph ph-arrow-left" />
              Back to the guide
            </Link>
          </div>
        </div>
      </header>

      {/* ========== Two-column layout ========== */}
      <main className={styles.main}>

        {/* Left — sticky product summary */}
        <section className={styles.summary}>
          <div className={styles.summaryTop}>
            <span className={styles.summaryLabel}>You&apos;re buying</span>
            <h1 className={styles.productName}>The Perfect List</h1>
            <p className={styles.tagline}>
              The grocery list that makes clean eating automatic.
            </p>
          </div>

          <div className={styles.productGrid}>
            <div className={styles.coverWrap}>
              <Image
                src="/images/web_mockups/Main Page TPGL Option 2.png"
                alt="The Perfect Grocery List product mockup"
                fill
                sizes="200px"
                loading="eager"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <ul className={styles.bullets}>
              <li className={styles.bullet}>
                <i className="ph ph-check" />
                Instant PDF download
              </li>
              <li className={styles.bullet}>
                <i className="ph ph-check" />
                Free updates for life
              </li>
            </ul>
          </div>

          <div className={styles.priceLine}>
            <span className={styles.priceNote}>
              One-time purchase · yours forever
            </span>
            {/* PLACEHOLDER — if price changes, update here AND in Stripe */}
            <span className={styles.price}>$47</span>
          </div>
        </section>

        {/* Right — Stripe embedded checkout form */}
        <section className={styles.form}>
          <CheckoutForm slug="the-perfect-list" />
          <p className={styles.trustItem}>
            <i className="ph ph-shield-check" />
            Payment is handled by Stripe. We never see or store your card details.
          </p>
          <p className={styles.trustItem}>
            <i className="ph ph-download-simple" />
            Your download link appears the second payment clears — and lands in
            your inbox too.
          </p>
        </section>
      </main>

      {/* ========== Checkout footer ========== */}
      <footer className={styles.checkoutFooter}>
        All sales of downloadable PDFs are final. No refunds, returns, or
        exchanges once the file is accessed.{' '}
        <Link href="/refund-policy" className={styles.refundLink}>
          Read Refund Policy
        </Link>
        <br />
        &copy; Healthy Homemade Habits - Hana &amp; Timm
      </footer>
    </div>
  );
}
