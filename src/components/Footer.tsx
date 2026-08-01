import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={`wrap ${styles.footTop}`}>
        <div>
          <div className={styles.footBrand}>
            <Image
              src="/small-circle-logo.svg"
              alt=""
              width={40}
              height={40}
              unoptimized
            />
            Healthy Homemade Habits
          </div>
          <p className={styles.footTag}>
            Helping You Start Better Habits, One Grocery Trip At A Time
          </p>
        </div>
        <nav className={styles.footNav}>
          <span className={styles.label}>Explore</span>
          <div className={styles.footNavLinks}>
            <Link href="/">Home</Link>
            <Link href="/quiz">See How Much You&apos;re Overspending (Cart Cost Quiz)</Link>
            <Link href="/consultations">Consultations</Link>
            <Link href="/about">About Us</Link>
          </div>
        </nav>
        <div className={styles.footSocial}>
          <a href="https://www.instagram.com/healthyhomemadehabits/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <i className="ph ph-instagram-logo" />
          </a>
          <a href="https://www.youtube.com/@healthyhomemadehabits" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <i className="ph ph-youtube-logo" />
          </a>
        </div>
      </div>
      <div className={styles.footBottom}>
        <p style={{ marginBottom: 6 }}>
          All sales of downloadable PDFs are final. No refunds, returns, or exchanges once the file is accessed.{" "}
          <Link href="/refund-policy" style={{ color: "var(--forest)", textDecoration: "underline" }}>
            Read Refund Policy
          </Link>
        </p>
        © Healthy Homemade Habits - Hana &amp; Timm
      </div>
    </footer>
  );
}
