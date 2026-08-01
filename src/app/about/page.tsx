import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import heroImg from "../../../public/images/main_home_lifestyle.jpeg";
import cartImg from "../../../public/images/shopping_cart.jpg";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Hana & Timm",
  description:
    "Hana & Timm are a Midwest couple who cut Ultra Processed Foods in 2020 and built Healthy Homemade Habits to share what they learned. They teach the 80/20 real-food lifestyle through free guides, PDF products, and weekly YouTube videos.",
  keywords: [
    "Hana and Timm",
    "Healthy Homemade Habits founders",
    "real food couple",
    "80/20 lifestyle",
    "ultra processed food free",
    "healthy homemade cooking",
    "Midwest food bloggers",
    "who are Healthy Homemade Habits",
  ],
  openGraph: {
    title: "About Hana & Timm | Healthy Homemade Habits",
    description:
      "We cut Ultra Processed Foods in 2020 and haven't looked back. We teach the 80/20 real-food lifestyle through free guides, PDF products, and weekly YouTube videos.",
    url: "https://www.healthyhomemadehabits.com/about",
  },
};

const socials = [
  { icon: "ph-envelope-simple", label: "Email", href: "mailto:hana@healthyhomemadehabits.com" },
  { icon: "ph-youtube-logo", label: "YouTube", href: "https://www.youtube.com/@healthyhomemadehabits" },
  { icon: "ph-instagram-logo", label: "Instagram", href: "https://www.instagram.com/healthyhomemadehabits/" },
  { icon: "ph-x-logo", label: "X", href: "#" },
  // { icon: "ph-tiktok-logo", label: "TikTok", href: "#" },
];

export default function AboutPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <div className={`wrap ${styles.floatSection}`}>
          <div className={styles.floatRight}>
            <div className={styles.heroImgWrap}>
              <Image
                src={heroImg}
                alt="Hana and Timm in the kitchen"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <p className={styles.heroCap}>Hana &amp; Timm</p>
          </div>
          <h1>Hey! We&apos;re Hana and Timm!</h1>
          <p className={styles.sub}>
            We&apos;re ga-ga about grocery shopping! Helping you save time, money, and energy at the grocery store is what we&apos;re all about, and if we can help make shopping a little more fun for you, that&apos;s great too!
          </p>
          <p className={styles.body}>
            We haven&apos;t always loved grocery shopping. In fact, it used to cause us a lot of stress, and not just because of how expensive it was! It felt like we were always there <em>forever</em>, and like we always forgot at least one crucial ingredient, even though we&apos;d walked through each aisle 7 times. Not to mention the crowds, the decision-fatigue, and the impulse buys that would send us well past our budget.
          </p>
          <p className={styles.body}>
            We tried everything to make this necessary chore easier: shopping online (the delivery fees&hellip; brutal), delivery meal kits to offset the grocery bill (just another expense on top of staples, and not that tasty or healthy), coupon clipping (is anything useful <em>ever</em> on sale?), cutting out carbs (what were we thinking?!), and a whole host of other failed attempts. What we didn&apos;t realize was that we needed to get more organized, and more to the point, make a more organized list.
          </p>
          <p className={styles.body}>
            <em>How many stories have started off saying something like, &ldquo;Oh, during 2020, we had to change the way we did things.&rdquo;? Well, let&apos;s add another one to the list.</em>
          </p>
          <p className={styles.body}>
            When the lockdowns started, Timm and I found ourselves in an interesting position. We were living with family during an unexpected financial slump, and, being the ones in the household that actually enjoyed cooking, we took on the responsibility of being the family shoppers. We had to find a way to get in and out of the store quick, without spending a lot of money, all while factoring in 2 other adult&apos;s food preferences. It was a challenge that we were happy to face, but it meant that we needed to get serious about how we shopped.
          </p>
          <p className={styles.body}>
            Thus, The Perfect Grocery List was born.
          </p>
          <p className={styles.body}>
            Our method is simple: choose the meals you want to eat for 1 week (breakfast, lunch, <em>and</em> dinner, plus snacks and other staples), write down the necessary items in aisle based categories, and shop one section at a time.
          </p>
          <p className={styles.body}>
            That&apos;s it. Nothing fancy, nothing complicated. We like to think of it as <em>intuitive</em> shopping.
          </p>
          <ul className={styles.body}>
            <li>Its simplicity keeps us focused so we <strong>save time</strong> by not ping-ponging through the aisles.</li>
            <li>So we <strong>save money</strong>, by not straying from necessary items.</li>
            <li>So we <strong>save energy</strong>, by moving forward at a steady and unstressed pace.</li>
          </ul>
          <p className={styles.body}>
            This method got us through COVID, through moving to a new state, through moving back to our home state, and through the hardest financial stretch of our lives.
          </p>
          <p className={styles.body}>
            And, strangely, it&apos;s made the rest of the areas of our lives easier and more organized too. Let&apos;s be real, grocery shopping is the chore that takes up most of our time, and by streamlining that, everything else gets the care and attention it deserves.
          </p>
          <p className={styles.body}>
            We love this grocery list method so much that we thought it was high time to share it with the whole world! We know you&apos;ll love it too!
          </p>
        </div>
      </section>


      {/* ============ GROCERY ============ */}
      <section className="section line">
        <div className={`wrap ${styles.floatSection}`}>
          <div className={styles.floatLeft}>
            <div className={styles.groceryImgWrap}>
              <Image
                src={cartImg}
                alt="Grocery shopping"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <span className="eyebrow">Where It All Starts</span>
          <h2 className={styles.groceryH2}>We LOVE to grocery shop, now you can too!</h2>
          <p>
            <strong>Want to know more about us, outside the grocery store?</strong>
          </p>
          <p>
            We&apos;ve been together since 2015, and eloped on a beach in 2022! We met at the theatre: Hana was Stage Managing a show, and Timm was friends with a cast member. We started talking at the afterparty, and haven&apos;t stopped talking since! We eloped because we&apos;re both introverts and don&apos;t like being the center of attention. Also, our families live on opposite sides of the country from each other, so the logistics of a traditional wedding just didn&apos;t make sense to us.
          </p>
          <p>
            Neither of us are trained cooks, but we love being in the kitchen trying out new recipes. Timm studied architecture and Hana studied theatre. Neither of those careers align with who we are now, but we still use what we learned in our majors every day. Nowadays, Timm develops games, and Hana writes a non-fiction series that she hopes to publish in the near future!
          </p>
          <p>
            We both learned to cook from our parents and grandparents, and have spent a lot of time watching cooking shows (and cooking competition shows like GGG and TOC). Timm likes to improvise in the kitchen, while Hana prefers to use a recipe.
          </p>
          <p>
            Activities we find most relaxing: Cooking, golf (playing and watching), and Stardew Valley.
          </p>
          <p>
            Coffee or tea? Definitely coffee, but we both like green tea a lot. (Hoji-cha is a hidden gem!)
          </p>
          <p>
            We love all kinds of cuisines, our favorites being Japanese, Italian, Mediterranean, and classic American. We pretty much always cook at home (like, 98% of the time), and what we cook is pretty clean. In 2020, we really made an effort to cut out UPFs from our diet, and decided the best approach to eating was the 80/20 diet. That being said, for our 20%, we like to have fun cereal, chocolate, the occasional potato chip, or a fun coffee at a cafe.
          </p>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section line">
        <div className="wrap">
          <div className={`frame ${styles.contact}`}>
            <div className={styles.contactHead}>
              <span className="eyebrow">Get In Touch</span>
              <h2>We&rsquo;re so excited that you&rsquo;re here!</h2>
              <p>
                If you want to get in touch with us, or have a question about
                Ultra Processed Foods, the 80/20 diet, or something grocery
                store related, email us and we&apos;ll get back to you as soon
                as we can!
              </p>
            </div>
            <ul className={styles.socialList}>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className={styles.socialRow}>
                    <i className={`ph ${s.icon}`} />
                    <span className={styles.socialLabel}>{s.label}</span>
                    <i className={`ph ph-arrow-right ${styles.arrow}`} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
