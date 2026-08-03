import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Our Products | Healthy Homemade Habits",
  description:
    "Browse all Healthy Homemade Habits products, from our free UPF ingredient guide to The Perfect Grocery List system.",
};

const products = [
  {
    eyebrow: "Free Download",
    title: "The 5-Second Shopper",
    description:
      "A color-coded guide to the most common Ultra Processed Ingredients. Organized alphabetically and color-coded so you can scan for what to eat, moderate, or avoid, at a glance.",
    cta: "Get it free",
    href: "https://checkout.mailerlite.com/checkout/32173",
    external: true,
    price: "Free",
  },
  {
    eyebrow: "PDF Guide",
    title: "Eat Real, Live Better",
    description:
      "A deep dive into the 80/20 eating method, retail psychology, and how to start eating real food without giving up everything you love. Includes tips for spotting UPFs and reading ingredient labels like a pro.",
    cta: "Buy Eat Real, Live Better",
    href: "https://checkout.mailerlite.com/checkout/32175",
    external: true,
    price: "$17",
  },
  {
    eyebrow: "PDF System",
    title: "The Perfect Grocery List",
    description:
      "Our complete grocery shopping system: 4 list templates, 4 meal planners, 14 healthy recipes, a done-for-you starter week, and the inside scoop on how grocery stores are designed to make you overspend.",
    cta: "Buy The Perfect Grocery List",
    href: "/the-perfect-list/checkout",
    external: false,
    price: "$47",
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="wrap">
          <div className="head-center">
            <span className="eyebrow">Our Products</span>
            <h1>Everything you need to shop smarter and eat better</h1>
          </div>
        </div>
      </section>

      <section className="section line">
        <div className="wrap">
          <div className={styles.grid}>
            {products.map((p) => (
              <div key={p.title} className={styles.card}>
                <div>
                  <span className="eyebrow">{p.eyebrow}</span>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                  <p className={styles.cardDesc}>{p.description}</p>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.price}>{p.price}</span>
                  <a
                    href={p.href}
                    target={p.external ? "_blank" : undefined}
                    rel={p.external ? "noopener noreferrer" : undefined}
                    className="btn btn-primary"
                  >
                    {p.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
