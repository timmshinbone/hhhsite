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
            <h1 className={styles.productName}>The Perfect Grocery List</h1>
            <p className={styles.tagline}>
              Save hours of time, days worth of energy, and hundreds of dollars, every year.
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
                1 Done For You Perfect Menu and Perfect Grocery List to get you started using this system right away!
              </li>
              <li className={styles.bullet}>
                <i className="ph ph-check" />
                The complete outline of our perfect shopping system to save you time and money at the grocery stores
              </li>
            </ul>
          </div>

          <div className={styles.includesList}>
            <span className={styles.includesLabel}>What&apos;s inside</span>
            <ul className={styles.bullets}>
              <li className={styles.bullet}>
                <i className="ph ph-check" />
                4 blank, beautifully designed Perfect Grocery Lists (print again and again, every time you need to go to the grocery store)
              </li>
              <li className={styles.bullet}>
                <i className="ph ph-check" />
                4 blank Perfect Meal Menus (coordinating designs, because we all love a matchy-matchy!)
              </li>
              <li className={styles.bullet}>
                <i className="ph ph-check" />
                A detailed explanation of how grocery stores trick you into spending more money!
              </li>
              <li className={styles.bullet}>
                <i className="ph ph-check" />
                A quick guide that makes healthy eating easy, delicious, and budget friendly!
              </li>
              <li className={styles.bullet}>
                <i className="ph ph-check" />
                14 of our favorite healthy, delicious, inexpensive recipes to get you started on our Perfect System
              </li>
            </ul>
          </div>

          <p className={styles.savingsStat}>
            In the past 6 years, we&apos;ve saved an estimated $2,500 per year in groceries using this list. Now you can too!
          </p>

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
            Your download link appears the second payment clears, and lands in
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
