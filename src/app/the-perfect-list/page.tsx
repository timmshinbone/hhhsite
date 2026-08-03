import type { Metadata } from "next";
import Image from "next/image";
import Faq from "@/components/Faq";
import styles from "./page.module.css";

import tpglImg from "../../../public/images/web_mockups/Main Page TPGL Option 2.png";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "The Perfect Grocery List",
  description:
    "A 5-chapter grocery shopping system with list templates, meal planners, retail psychology insights, UPF identification tips, and 14 healthy recipes. Helps you shop smarter, eat healthier, and save money.",
  url: "https://www.healthyhomemadehabits.com/the-perfect-list",
  brand: { "@type": "Organization", name: "Healthy Homemade Habits" },
  author: [
    { "@type": "Person", name: "Hana" },
    { "@type": "Person", name: "Timm" },
  ],
  offers: {
    "@type": "Offer",
    price: "47.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Healthy Homemade Habits" },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is The Perfect Grocery List different than buying a grocery list template on Etsy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Perfect Grocery List isn't just a grocery list template, but a simple system for getting you organized before you get to the store. Many shopping list templates overcomplicate things by including superfluous charts and trackers that have nothing to do with grocery shopping. The Perfect Grocery List is simple and straightforward, but effective, because it was designed by practical shoppers who hate to faff around.",
      },
    },
    {
      "@type": "Question",
      name: "Is The Perfect Grocery List just templates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, it's so much more than templates! We've done the research on the tips, tricks, and traps of the grocery store, so you can get in and out quicker, on budget, and without the usual hassle. We also teach you how to read ingredient labels, how to spot UPF red flags, and how to organize yourself for sustainable results.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to follow a certain diet or budget to use The Perfect Grocery List?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all! This list is inclusive of all diets and grocery budgets. The list system helps you better judge how much you're spending on each trip because of the way it's laid out. For specific diets, this list (in conjunction with the included menu planner) helps you keep track of what you're buying so you never forget a crucial ingredient.",
      },
    },
    {
      "@type": "Question",
      name: "I'm not an organized person and I hate making lists. Is The Perfect Grocery List for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! The Perfect Grocery List is perfect for you because it's been designed in a way that basically organizes itself for you. All you need to do is choose some recipes or meals, fill out the needed ingredients in the provided columns, and get shopping. It's even more simple than writing a list on the back of a piece of mail.",
      },
    },
    {
      "@type": "Question",
      name: "Will The Perfect Grocery List work for a single person?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! The Perfect Grocery List was made to organize shopping for households of all sizes, whether you're shopping just for yourself, for a couple, or for a family.",
      },
    },
    {
      "@type": "Question",
      name: "I prefer to shop online rather than in the store. Can I use The Perfect Grocery List?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Definitely! The Perfect Grocery list works in person, but is also ideal for organizing your online shopping. Because the grocery list and meal planner work hand-in-hand, grocery shopping online becomes even easier when you have a column-style plan in front of you.",
      },
    },
    {
      "@type": "Question",
      name: "How will I receive my copy of The Perfect Grocery List?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After purchasing, you'll have the option to click a download now button; the PDF will save directly to your device. We'll also send it in an email. This is an instant download that can be read on any device, any time.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "The Perfect Grocery List - Smarter, Healthier Shopping System ($47)",
  description:
    "A 5-chapter grocery shopping guide with list templates, meal planners, retail psychology secrets, UPF identification tips, and 14 healthy recipes. Stop dreading the grocery store. $47 instant PDF download.",
  keywords: [
    "grocery list template",
    "healthy grocery shopping guide",
    "grocery organization system",
    "how to shop for real food",
    "meal planning grocery list",
    "avoid impulse buying grocery store",
    "retail psychology grocery store",
    "ultra processed food grocery shopping",
    "smarter grocery shopping PDF",
  ],
  openGraph: {
    title: "The Perfect Grocery List - $47 | Healthy Homemade Habits",
    description:
      "Stop dreading the grocery store. A complete shopping system with list templates, meal planners, retail psychology tips, UPF guides, and 14 healthy recipes. $47 instant download.",
    url: "https://www.healthyhomemadehabits.com/the-perfect-list",
  },
};

const features = [
  {
    icon: "ph-magnifying-glass",
    accent: "a-forest",
    title: "Crafting your ideal 80/20 diet plan",
    description:
      "Make an eating plan that works for you, your schedule, and your personal goals, while still enjoying your favorite foods!",
  },
  {
    icon: "ph-prohibit",
    accent: "a-blush",
    title: "Understanding retail psychology, so you can avoid the store's UPF traps",
    description:
      "Use your knowledge to beat the system and be a smarter shopper",
  },
  {
    icon: "ph-storefront",
    accent: "a-sky",
    title: "Using The Perfect List, in real time, at the grocery store",
    description:
      "Master ingredient label reading, decoding UPFs, and recognizing the red flags, so you can shop quickly, efficiently, and healthfully every single trip.",
  },
  {
    icon: "ph-list-checks",
    accent: "a-sage",
    title: "Creating a menu of healthy meals that you actually want to eat",
    description:
      "Plan a week's worth of breakfasts, lunches, and dinners in advance, and shop for them efficiently",
  },
  {
    icon: "ph-fork-knife",
    accent: "a-forest",
    title: "Finding delicious, healthy, and fun recipes across the internet",
    description:
      "We give you a full week of our favorite recipes and recipe sources, so you can start eating healthy right away! We even pre-filled a list with all the needed ingredients!",
  },
  {
    icon: "ph-scales",
    accent: "a-blush",
    title: "Our Perfect Grocery List System",
    description:
      "We've included a done-for-you menu and list, so you can start shopping efficiently today! Other materials include 4 blank grocery lists, 4 blank weekly menus, along with a pre-filled example you can use immediately to plan a week of meals!",
  },
];

const painPoints = [
  {
    icon: "ph-smiley",
    title: "Grocery shopping shouldn't feel like a chore!",
    text: "Walking in with a plan and a positive mindset changes everything, and saves you time and stress! (Also, just think about all the yummy food you're about to buy!)",
  },
  {
    icon: "ph-file-magnifying-glass",
    title: "Does it pass the UPF Test?",
    text: "Understanding labels and packaging claims keeps you from making choices against your best interest!",
  },
  {
    icon: "ph-receipt",
    title: "Wait, I spent how much??",
    text: "Resisting impulse purchases, marketing traps, and analysis paralysis keeps you on budget!",
  },
];

const faqItems = [
  {
    question: "How is this different than buying a grocery list template on Etsy?",
    answer:
      "The Perfect Grocery List isn't just a grocery list template, but a simple system for getting you organized before you get to the store! Many shopping list templates overcomplicate things by including superfluous charts and trackers that have nothing to do with grocery shopping. The Perfect Grocery List is simple and straightforward, but effective, because it was designed by practical shoppers who hate to faff around.",
  },
  {
    question: "Is it just templates?",
    answer:
      "No, it's so much more than that! In our opinion, knowledge is power, so to be a smart shopper, it's important to know a little background information about grocery shopping. We've done the research on the tips, tricks, and traps of the grocery store, so you can get in and out quicker, on budget, and without the usual hassle associated with shopping. We also teach you how to read ingredients labels, how to spot UPF red flags, and how to organize yourself for sustainable results.",
  },
  {
    question: "Do I have to follow a certain diet to use The Perfect Grocery List? How about a certain budget?",
    answer:
      "Not at all! This list is inclusive of all diets and grocery budgets. In fact, this list system will help you better judge how much you're spending on each trip because of the way it's laid out. As for specific diets, this list (in conjunction with the included menu planner) helps you keep track of what you're buying better than a traditional list, so you're sure to never forget a crucial ingredient for a recipe/dietary requirement.",
  },
  {
    question: "I'm not an organized person, and I hate making lists. Is this for me?",
    answer:
      "Absolutely! In fact, The Perfect Grocery List is perfect for you, because it's been designed in a way that basically organizes itself for you. All you need to do is choose some recipes/meals (we've recommended our favorites!), fill out the needed ingredients in the provided columns, and get shopping! It's even more simple than writing a list on the back of a piece of mail.",
  },
  {
    question: "I'm only one person, making meals for myself. Will this system work for me?",
    answer:
      "Absolutely! The Perfect Grocery List was made to organize shopping for households of all sizes, whether you're shopping just for yourself, for a shared dorm situation, for a couple, or for a family of ten!",
  },
  {
    question: "I'm shopping for my spouse and I, plus our two young kids. Will this system work for us?",
    answer:
      "Yes! The Perfect Grocery List was made to organize shopping for households of all sizes, whether you're shopping for a small family, a growing family, or a large and extended family!",
  },
  {
    question: "I prefer to shop online rather than in the store. Can I use this system?",
    answer:
      "Definitely! The Perfect Grocery list works in person, but is also ideal for organizing your online shopping. Because the grocery list and meal planner work hand-in-hand, grocery shopping online becomes even easier when you have a column-style plan in front of you. We dedicated a section in Chapter 4 to how to use our list for shopping online.",
  },
  {
    question: "How will I receive my copy of The Perfect Grocery List?",
    answer:
      "After purchasing, you'll have the option to click a \"download now\" button; the PDF will save directly to your device! We'll also send it in an email! This is an instant download that can be read on any device, any time.",
  },
];

export default function GroceryGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <span className="eyebrow">The Perfect Grocery List</span>
            <h1>Healthy Grocery Shopping Starts With The Perfect List</h1>
            <p className={styles.sub}>
              We all have to grocery shop, so why not make it easier, healthier, and more enjoyable? Timm and I help you organize your shopping trip, so that you can shop smarter, eat healthier, and create better habits, one cart at a time!
            </p>
            <p className={styles.sub}>
              Ever wonder why the grocery stores seem to be filled with bad-for-you food? Or why, even if you go in for 1 item, you can never leave without less than 10? What ever happened to the good old days of knowledgeable butchers and mountains of fresh produce? Don't the stores want you to make healthy choices? This guide answers all those questions, and so much more! Join us as we uncover all of the tricks, traps, and truths of retail psychology, and how you can use that knowledge to become a better, healthier shopper!
            </p>
            <div className={styles.heroCta}>
              <a
                href="/the-perfect-list/checkout"
                className="btn btn-primary lg"
              >
                Buy The Perfect Grocery List - $47
              </a>
              <span className={styles.guarantee}>
                <i className="ph ph-shield-check" />
                Instant PDF download &nbsp;·&nbsp; Secure checkout.
              </span>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <div className={styles.productCover}>
              <Image
                src={tpglImg}
                alt="The Perfect Grocery List product mockup"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className={styles.heroCap}>
              <span className={styles.price}>$47</span>
              <span className={styles.pages}>Download now</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PAIN ============ */}
      <section className="section line">
        <div className="wrap">
          <div className="head-center">
            <span className="eyebrow">Does this sound like you?</span>
            <h2>&quot;I hate grocery shopping! Why can&apos;t it be easier, quicker, cheaper, healthier, more fun?!&quot;</h2>
          </div>
          <div className={styles.painCols}>
            {painPoints.map((point) => (
              <div key={point.text} className={styles.painCard}>
                <div className={styles.painHead}>
                  <i className={`ph ${point.icon} ${styles.ic}`} />
                  <h3>{point.title}</h3>
                </div>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="/the-perfect-list/checkout" className="btn btn-primary lg">
              Yes! Show me how to make grocery shopping easy!
            </a>
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INSIDE ============ */}
      <section className="section line" id="inside">
        <div className="wrap">
          <div className="head-center">
            <span className="eyebrow">What&apos;s inside</span>
            <h2>Having The Perfect Grocery List makes shopping simple!</h2>
            <p className="lead">
              In 5 easy to digest chapters, you&apos;ll be at pro at:
            </p>
          </div>
          <div className="kgrid cols-3">
            {features.map((feature) => (
              <div key={feature.title} className={`kcard ${feature.accent}`}>
                <i className={`ph ${feature.icon} kic`} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="/the-perfect-list/checkout" className="btn btn-primary lg">
              I want everything inside the guide!
            </a>
          </div>
        </div>
      </section>

      {/* ============ TRANSFORMATION ============ */}
      <section className="section line">
        <div className={`wrap ${styles.inner}`}>
          <span className="eyebrow">Life with the guide</span>
          <h2>Wouldn't it be great to just get in and out of the store without stressing, and actually leave with everything you need?</h2>
          <p>
            <span className={styles.leadLine}>
              Now it's possible with The Perfect Grocery List!
            </span>{" "}
            This simple system has been the only thing we&apos;ve used for the last 6 years, and we&apos;d never dream of going back to the old way! Shop quickly, shop with focus, and never forget an item again!
          </p>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <a href="/the-perfect-list/checkout" className="btn btn-primary lg">
              I want to get in and out, stress-free!
            </a>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section line">
        <div className="wrap">
          <div className="head-center">
            <span className="eyebrow">In Case You Were Wondering</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <Faq items={faqItems} />
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section line" id="buy">
        <div className="wrap">
          <div className={`frame cta-center ${styles.final}`}>
            <span className="eyebrow">Ready for the easiest shopping trip of your life?</span>
            <h2>Download your copy of The Perfect Grocery List!</h2>
            <p className="lead" style={{ marginTop: "20px" }}>
              Start saving time and money in the grocery store, and making healthy choices today!
            </p>
            <div className={styles.priceline}>
              $47 <small>Instant Download</small>
            </div>
            <div style={{ marginTop: "26px" }}>
              <a
                href="/the-perfect-list/checkout"
                className="btn btn-primary lg"
              >
                Get The Perfect Grocery List
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <div>
                <p className="fineprint">
                  <i className="ph ph-files" />
                  Instant PDF download &nbsp;·&nbsp; Secure checkout.
                </p>
                <p className="fineprint" style={{ marginTop: 8 }}>
                  <i className="ph ph-prohibit" />
                  <span style={{ textAlign: "left" }}>
                    All sales of downloadable PDFs are final.<br />
                    No refunds, returns, or exchanges once the file is accessed.<br />
                    <a href="/refund-policy" style={{ color: "var(--forest)", textDecoration: "underline" }}>Refund Policy</a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
