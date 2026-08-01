import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import StepFlow from "@/components/StepFlow";
import heroImg from "../../public/images/main_home_lifestyle.jpeg";
import tpglImg from "../../public/images/web_mockups/Main Page TPGL Option 1.png";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Healthy Homemade Habits — Real Food. Real Life. 80/20.",
  },
  description:
    "Hana & Timm help everyday people cut Ultra Processed Foods using the 80/20 eating method — without giving up the foods they love. Get a free UPF ingredient guide, grocery shopping system, and weekly real-food tips.",
  keywords: [
    "ultra processed foods",
    "cut processed foods",
    "80/20 diet",
    "real food lifestyle",
    "healthy grocery shopping",
    "UPF free diet",
    "healthy eating guide",
    "whole food habits",
    "avoid ultra processed food",
  ],
  openGraph: {
    title: "Healthy Homemade Habits — Real Food. Real Life. 80/20.",
    description:
      "Cut Ultra Processed Foods without giving up the foods you love. Free UPF ingredient guide, grocery list system, and weekly real-food tips from Hana & Timm.",
    url: "https://www.healthyhomemadehabits.com",
  },
};

const groceryIncludes = [
  "4 blank, beautifully designed Perfect Grocery Lists (print again and again, every time you need to go to the grocery store)",
  "4 blank Perfect Meal Menus (coordinating designs, because we all love a matchy-matchy!)",
  "14 of our favorite healthy, delicious, inexpensive recipes to get you started on our Perfect System",
  "1 Done For You Perfect Menu and Perfect Grocery List, using the ingredients in the provided recipes",
];

const groceryBonuses = [
  "We give you a behind the scenes tour of what makes groceries so expensive, and why grocery stores are designed to be confusing!",
  "We walk you through our exact method of choosing healthy recipes, and clean food, so you can be confident in making the perfect list for your health and budget",
  "5 more FREE bonuses that will make eating healthier easier, and will help save you more money",
];

const youtubeVideos = [
  {
    duration: "12:04",
    title: "Reading labels at the store (what we actually skip)",
    meta: "Grocery haul · This week",
  },
  {
    duration: "08:37",
    title: "5 ultra-processed swaps we make every single week",
    meta: "Real food swaps",
  },
  {
    duration: "15:22",
    title: "A real 80/20 week of eating (no perfection required)",
    meta: "Meal plan · Honest",
  },
];

export default function Home() {
  return (
    <>
      {/* ============ DARK BANNER (top of page, above hero) ============ */}
      <section className={styles.topBanner}>
        <div className="wrap">
          <h2 className={styles.topBannerHeading}>
            If you&apos;re spending over an hour in the grocery store, always forgetting one item, and spending way too much, you need a new system.
          </h2>
          <p>
            Take our 3 minute quiz to see just how much you&apos;re overspending at the grocery store
          </p>
          <p className={styles.topBannerGift}>
            (and receive a free gift when you finish the quiz)
          </p>
          <Link href="/quiz" className="btn btn-primary">
            Cart Cost Quiz
          </Link>
        </div>
      </section>

      {/* ============ HERO ============ */}
      <section className={styles.hero} id="top">
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <h1 style={{ marginTop: "22px" }}>
              Hey! We&apos;re Hana and Timm, and we love grocery shopping!
            </h1>
            <p className={styles.sub}>
              If you did a double take, we&apos;re used to it. Grocery shopping is the worst, right?
            </p>
            <p className={styles.sub}>
              We used to think so, but 6 years ago, we made one simple switch in how we organized ourselves, and it changed the way we shopped forever. Here&apos;s the secret: it all starts with making the right grocery list.
            </p>
            <p className={styles.sub}>
              Now we save hours of time, days worth of energy, and hundreds of dollars a year, and we actually have fun too!
            </p>
            <p className={styles.sub}>
              If that sounds like something you need, click the button below to get our exact grocery shopping formula that took us from stressed to saving!
            </p>
            <div className={styles.heroCta} style={{ justifyContent: "center" }}>
              <a
                href="https://checkout.mailerlite.com/checkout/32176"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                I want to save time, energy, and money!
              </a>
            </div>
          </div>
          <div className={styles.heroMedia}>
            {/* Picture of Hana & Timm — keep existing image, stays to the right */}
            <div className={styles.heroImgWrap}>
              <Image
                src={heroImg}
                alt="Hana and Timm in the kitchen"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY YOU SHOULD TRUST US ============ */}
      <section className="section line">
        <div className="wrap">
          <div className="head-center">
            <h2>Why You Should Trust Us</h2>
            <p className="lead">
              At the start of the 2020 lock downs, we knew we had to get in and out of the store quickly, so we built a list that would keep us on track. We didn&apos;t realize it would do so much more than that. It&apos;s 6 years later, and we haven&apos;t looked back!
            </p>
            <p>
              <strong>We used the layout of the store as our guide, and from that, The Perfect Grocery List was created.</strong>
            </p>
            <p>
              <strong>Deceptively simple, but surprisingly smart.</strong>
            </p>
          </div>
          <ul className={styles.trustList}>
            <li>Items on the list are grouped by aisle rather than by recipe, so you can focus on one area of the store at a time. No more wasted time running the length of the store over and over again, and forgetting that one important item.</li>
            <li>Plan your weekly meals ahead of time, and list your ingredients in aisle order, so there&apos;s no chance of impulse buys or going over budget.</li>
            <li>The aisle categories are listed by the flow of the store, so you can move quickly through each section, shaving minutes off each trip. (Those minutes add up to hours saved each year!)</li>
          </ul>
          <p className={styles.trustCatch}>
            <strong>The catch? There is none.</strong> You don&apos;t need anything else to save time and money at the grocery store, except for the Perfect Meal Menu, which is included in this PDF.
          </p>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <a
              href="https://checkout.mailerlite.com/checkout/32176"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Teach me the perfect system!
            </a>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section line">
        <div className="wrap">
          <StepFlow
            steps={[
              {
                number: 1,
                label: "Stressed — using a scattered list and wasting time, energy, and hundreds of dollars",
              },
              {
                number: 2,
                label: "Start using The Perfect Grocery List and Perfect Meal Menu",
              },
              {
                number: 3,
                label: "Shopping becomes easy, enjoyable, and now you're actually saving hundreds of dollars",
              },
            ]}
          />
          <p className="lead" style={{ textAlign: "center", marginTop: "32px" }}>
            We built a system that takes all the guesswork out of grocery shopping, so you can get in and out in under an hour and save hundreds of dollars*. All you have to do is follow our simple step-by-step method!
          </p>
          <p className="fineprint" style={{ textAlign: "center" }}>*hundreds of dollars a year</p>
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <a
              href="https://checkout.mailerlite.com/checkout/32176"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              I&apos;m ready to learn the easy steps
            </a>
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS TEASER ============ */}
      <section className="section line" id="products">
        <div className="wrap">
          <div className="head-center">
            <span className="eyebrow">Our Products</span>
            <h2>Everything you need to shop smarter and eat better</h2>
            <p className="lead">
              From a free UPF ingredient guide to our complete grocery shopping system, we&apos;ve built tools for every step of your journey.
            </p>
          </div>
          <div className={styles.productTeaser}>
            <div className={styles.teaserCard}>
              <span className="eyebrow">Free</span>
              <h3>The 5-Second Shopper</h3>
              <p>A color-coded guide to the most common Ultra Processed Ingredients — so you can spot them at a glance.</p>
            </div>
            <div className={styles.teaserCard}>
              <span className="eyebrow">$17</span>
              <h3>Eat Real, Live Better</h3>
              <p>A deep dive into the 80/20 eating method, retail psychology, and how to start eating real food without giving up everything you love.</p>
            </div>
            <div className={styles.teaserCard}>
              <span className="eyebrow">$47</span>
              <h3>The Perfect Grocery List</h3>
              <p>Our complete grocery shopping system — list templates, meal planners, 14 recipes, and the secrets to getting in and out in under an hour.</p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/products" className="btn btn-outline">
              View all our products
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU'LL GET (TPGL) ============ */}
      <section className="section line">
        <div className={`wrap ${styles.productGrid}`}>
          <div>
            <span className="eyebrow">The Perfect Grocery List</span>
            <h2>What You&apos;ll Get</h2>
            <p className={styles.lead}>
              You don&apos;t need to be good at organizing. Heck, you don&apos;t even need to like it! We&apos;ve done all the work for you, and we teach you how to continue using our system, step-by-easy-step!
            </p>
            <p><strong>What you&apos;ll get in this PDF:</strong></p>
            <ul className={styles.featureList}>
              {groceryIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p style={{ marginTop: "16px" }}><strong>Plus:</strong></p>
            <ul className={styles.featureList}>
              {groceryBonuses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              href="https://checkout.mailerlite.com/checkout/32176"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              I need that!
            </a>
          </div>
          <div className={styles.productCover}>
            <div className={styles.productImgWrap}>
              <Image
                src={tpglImg}
                alt="the perfect grocery list promotional image"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SAVINGS SOCIAL PROOF ============ */}
      <section className="section line">
        <div className="wrap">
          <div className="frame cta-center">
            <h2>
              In the past 6 years, we&apos;ve saved an estimated $2,500 per year in groceries using this list. Now you can too!
            </h2>
            <div style={{ marginTop: "24px" }}>
              <a
                href="https://checkout.mailerlite.com/checkout/32176"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Whoa, I want to save that much!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ YOUTUBE ============ */}
      <section className="section line" style={{ display: "none" }}>
        <div className="wrap">
          <div className="head-center">
            <span className="eyebrow">More free tips and tricks</span>
            <h2>We&apos;re on YouTube!</h2>
            <p className="lead">
              We post new videos every week about efficient grocery shopping, living the 80/20 life, and actual tasty swaps for Ultra Processed Foods!
            </p>
          </div>
          <div className={styles.ytGrid}>
            {youtubeVideos.map((video) => (
              <article key={video.title} className={styles.ytCard}>
                <div className={styles.ytThumb}>
                  <PlaceholderImage icon="ph-image" label="thumbnail" />
                  <div className={styles.ytPlay}>
                    <span>
                      <i className="ph ph-play-fill" />
                    </span>
                  </div>
                  <span className={styles.ytDur}>{video.duration}</span>
                </div>
                <h3>{video.title}</h3>
                <p className={styles.meta}>{video.meta}</p>
              </article>
            ))}
          </div>
          <div className={styles.centerCta}>
            <a href="https://www.youtube.com/@healthyhomemadehabits" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section line">
        <div className="wrap">
          <div className="frame cta-center">
            <h3 style={{ marginTop: "18px" }}>
              Ready for the best shopping trip of your life?
            </h3>
            <p className="lead" style={{ margin: "22px 0" }}>
              You don&apos;t need another expensive organization course, another meal prepping tutorial, or another YouTube budget guru showing you how they save on corndogs at Walmart.
            </p>
            <p className="lead" style={{ margin: "0 0 22px" }}>
              What you need is a simple, easy to follow grocery list that saves you time, energy, and money, every single trip.
            </p>
            <p style={{ marginBottom: "32px" }}>
              Click the button below to get saving at the grocery store today!
            </p>
            <a
              href="https://checkout.mailerlite.com/checkout/32176"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              You&apos;ve convinced me! I&apos;m ready to start saving!
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
