import type { Metadata } from "next";
import Image from "next/image";
import SignupForm from "./SignupForm";

import styles from "./page.module.css";

import tpglImg from "../../../public/images/web_mockups/Product Page TFSS.png";
import coupleImg from "../../../public/images/handt_couple_photo.jpeg";

// TODO: Update schema once final copy is written for Simple Shopping Savings
const freeGuideSchema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  name: "Simple Shopping Savings",
  description:
    "A free guide to cutting your grocery bill without sacrificing the food you love.",
  author: { "@type": "Organization", name: "Healthy Homemade Habits" },
  url: "https://www.healthyhomemadehabits.com/free-guide",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

// TODO: Update metadata once final copy is written for Simple Shopping Savings
export const metadata: Metadata = {
  title: "Simple Shopping Savings - Free Grocery Savings Guide",
  description:
    "Free downloadable guide to cutting your grocery bill without sacrificing the food you love.",
  keywords: [
    "grocery savings guide",
    "how to save money on groceries",
    "free healthy eating guide",
    "grocery budget tips",
    "smart grocery shopping",
  ],
  openGraph: {
    title: "Simple Shopping Savings - Free Guide | Healthy Homemade Habits",
    description:
      "Free guide to cutting your grocery bill without sacrificing the food you love.",
    url: "https://www.healthyhomemadehabits.com/free-guide",
  },
};

// TODO: Replace with final copy for Simple Shopping Savings
const whatsInside = [
  {
    icon: "ph-list-checks",
    accent: "a-sage",
    title: "TODO: What's inside benefit 1",
    description: "TODO: Description for benefit 1.",
  },
  {
    icon: "ph-timer",
    accent: "a-sky",
    title: "TODO: What's inside benefit 2",
    description: "TODO: Description for benefit 2.",
  },
  {
    icon: "ph-storefront",
    accent: "a-blush",
    title: "TODO: What's inside benefit 3",
    description: "TODO: Description for benefit 3.",
  },
];

// TODO: Replace with final copy for Simple Shopping Savings
const benefits = [
  {
    icon: "ph-magnifying-glass",
    accent: "a-forest",
    title: "TODO: Is this you? scenario 1",
    description: "TODO: Description for scenario 1.",
  },
  {
    icon: "ph-scales",
    accent: "a-sky",
    title: "TODO: Is this you? scenario 2",
    description: "TODO: Description for scenario 2.",
  },
  {
    icon: "ph-footprints",
    accent: "a-blush",
    title: "TODO: Is this you? scenario 3",
    description: "TODO: Description for scenario 3.",
  },
];

export default function FreeGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(freeGuideSchema) }}
      />
      {/* ============ HERO ============ */}
      <section className={styles.hero} id="get">
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <span className="eyebrow">Free digital guide</span>
            {/* TODO: Update h1 with final Simple Shopping Savings headline */}
            <h1>
              Simple Shopping Savings
            </h1>
            {/* TODO: Update with final Simple Shopping Savings description */}
            <p className={styles.sub}>
              TODO: Add hero description for Simple Shopping Savings.
            </p>
            <div className={styles.metaRow}>
              <span className={styles.m}>
                <i className="ph ph-clock" />
                Quick reference guide
              </span>
              <span className={styles.dot} />
              <span className={styles.m}>
                <i className="ph ph-gift" />
                100% free
              </span>
              <span className={styles.dot} />
              <span className={styles.m}>
                <i className="ph ph-heart" />
                Small steps toward better health
              </span>
            </div>
            <SignupForm slug="simple-shopping-savings" />
          </div>
          <div className={styles.heroMedia}>
              <div className={styles.productCover}>
                <Image
                  src={tpglImg}
                  alt="Simple Shopping Savings - free guide product mockup"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            <p className={styles.heroCap}>A free guide from Hana &amp; Timm</p>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section className="section line">
        <div className="wrap">
          <div className="head-center">
            <span className="eyebrow">Is this you?</span>
            {/* TODO: Update with final Simple Shopping Savings benefits headline */}
            <h2>TODO: Add benefits section headline.</h2>
          </div>
          <div className="kgrid cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className={`kcard ${benefit.accent}`}>
                <i className={`ph ${benefit.icon} kic`} />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INSIDE ============ */}
      <section className="section line" id="inside">
        <div className="wrap">
          <div className="head-center">
            <span className="eyebrow">What&apos;s inside the free guide</span>
            {/* TODO: Update with final Simple Shopping Savings inside headline */}
            <h2>TODO: Add what's inside headline.</h2>
          </div>
          <div className="kgrid cols-3">
            {whatsInside.map((item) => (
              <div key={item.title} className={`kcard ${item.accent}`}>
                <i className={`ph ${item.icon} kic`} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="section line">
        <div className={`wrap ${styles.aboutGrid}`}>
          <div className={styles.aboutMedia}>
            <div className={styles.coupleCover}>
              <Image
                src={coupleImg}
                alt="Hana and Timm"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div>
            <span className="eyebrow">Our Story</span>
            <h2>We&apos;re Hana &amp; Timm.</h2>
            <p>
              We&apos;re health-conscious (but not health-nuts!) homecooks with a love of fresh, wholesome foods, and a little side of something fun. We&apos;ve been avoiding UPFs since 2020, and haven&apos;t missed them a bit! We&apos;ve learned a lot along the way about how to make satisfying swaps, how to make common UPFs with better ingredients from scratch, and how to spot the UPF red flags in the grocery store. We&apos;re excited to share our knowledge with you!
            </p>
            <p className={styles.sig}>Hana &amp; Timm</p>
          </div>
        </div>
      </section>

      {/* ============ MINI CTA ============ */}
      <section className="section line">
        <div className="wrap">
          <div className={`frame cta-center ${styles.minicta}`}>
            <span className="eyebrow">Ready to start saving?</span>
            {/* TODO: Update CTA headline and subtext for Simple Shopping Savings */}
            <h2>Grab your free copy of &ldquo;Simple Shopping Savings!&rdquo;</h2>
            <p>
              Click below to grab your free copy — it&apos;s instant!
            </p>
            <SignupForm slug="simple-shopping-savings" />
          </div>
        </div>
      </section>
    </>
  );
}
