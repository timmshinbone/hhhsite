import type { Metadata } from "next";
import Image from "next/image";
import SignupForm from "./SignupForm";

import styles from "./page.module.css";

import tpglImg from "../../../public/images/web_mockups/Product Page TFSS.png";
import coupleImg from "../../../public/images/handt_couple_photo.jpeg";

const freeGuideSchema = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  name: "The 5-Second Shopper",
  description:
    "A free quick-reference guide listing 125+ Ultra Processed Food ingredients alphabetically, color-coded by severity, plus a simple 5-second formula for evaluating any packaged food at the grocery store.",
  author: { "@type": "Organization", name: "Healthy Homemade Habits" },
  url: "https://www.healthyhomemadehabits.com/free-guide",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export const metadata: Metadata = {
  title: "The 5-Second Shopper - Free UPF Ingredient Guide",
  description:
    "Free downloadable guide listing 125+ Ultra Processed Food ingredients, color-coded by severity (fine, moderate, avoid), plus our simple 5-second formula for evaluating any packaged food at the grocery store.",
  keywords: [
    "ultra processed food ingredients list",
    "UPF ingredients",
    "how to identify processed foods",
    "food additives list",
    "free healthy eating guide",
    "ingredient label reading",
    "how to avoid ultra processed foods",
    "packaged food evaluation",
  ],
  openGraph: {
    title: "The 5-Second Shopper - Free UPF Ingredient Guide | Healthy Homemade Habits",
    description:
      "Free guide: 125+ Ultra Processed Food ingredients listed alphabetically, color-coded by severity. Includes our simple 5-second formula for evaluating packaged foods at the grocery store.",
    url: "https://www.healthyhomemadehabits.com/free-guide",
  },
};

const whatsInside = [
  {
    icon: "ph-list-checks",
    accent: "a-sage",
    title: "A list of over 125 Ultra Processed ingredients",
    description:
      "Listed in alphabetical order for quick scanning, color coded for quick understanding - fine to consume in moderation, limit consumption, and avoid entirely.",
  },
  {
    icon: "ph-timer",
    accent: "a-sky",
    title: "A simple formula to gauge whether or not this food is worth being in your cart",
    description:
      "This is the simple, 5-second method we use to calculate whether or not we want to consume a packaged product.",
  },
  {
    icon: "ph-storefront",
    accent: "a-blush",
    title: "Tried and true tips for navigating the grocery store",
    description:
      "The grocery store wants you to buy UPFs, but if you're committed to avoiding them, we teach you how to buy the most healthful ingredients possible!",
  },
];

const benefits = [
  {
    icon: "ph-magnifying-glass",
    accent: "a-forest",
    title: "You know “junk food” isn't good for you, but what makes some food junk, and some food not?",
    description:
      "Ingredient labels are straightforward, but the ingredients… not so much. Find out what all those chemical sounding names really mean!",
  },
  {
    icon: "ph-scales",
    accent: "a-sky",
    title: "You confidently pick up the “natural” looking packaging, especially the ones that say “full of fiber” or “super protein” or “Real healthy!”",
    description:
      "Then you feel confused or discouraged when the ingredient list is as long as your arm, and full of ingredients you’ve never heard before.",
  },
  {
    icon: "ph-footprints",
    accent: "a-blush",
    title: "You tried to eat clean before, but felt dissatisfied by the bland, boring, and overcomplicated recipes.",
    description:
      "Eating healthy doesn't mean giving up everything you love. It means balancing wholesome, nutritious foods with small, smartly chosen indulgences. Eating clean is simple when you know exactly what you're consuming.",
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
            <h1>
              Identify Ultra Processed Foods in 5 Seconds with this handy list!
            </h1>
            <p className={styles.sub}>
              Tired of standing in the grocery aisles, trying to figure out if a packaged food is healthy or not? Maybe you've heard about Ultra Processed Foods, but you don't know what they are, or how to identify them, and especially how to avoid them. Or maybe you're aware that food dyes and artificial sweeteners are under scrutiny, but with so many chemical sounding names on the ingredients lists you're not sure which ones they are. The 5-Second Shopper answers all those questions for you, and so much more!
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
            <SignupForm slug="swap-sheet" />
          </div>
          <div className={styles.heroMedia}>
              <div className={styles.productCover}>
                <Image
                  src={tpglImg}
                  alt="The 5-Second Shopper - free guide product mockup"
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
            <h2>You really want to eat healthier, but it feels like everything in the store is against you.</h2>
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
            <h2>Start Eating Healthier Today</h2>
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
            <span className="eyebrow">Ready to stop eating UPFs?</span>
            <h2>Grab your free copy of &ldquo;The 5-Second Shopper!&rdquo;</h2>
            <p>
              Click below to grab your free copy - it&apos;s instant!
            </p>
            <SignupForm slug="swap-sheet" />
          </div>
        </div>
      </section>
    </>
  );
}
