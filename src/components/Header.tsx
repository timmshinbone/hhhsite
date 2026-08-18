"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/quiz", label: "Cart Cost Quiz" },
  { href: "/the-perfect-list", label: "The Perfect Grocery List" },
  { href: "/consultations", label: "Consultations" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const rawPathname = usePathname();
  const pathname = rawPathname?.replace(/\/$/, "") ?? "";
  const [menuOpen, setMenuOpen] = useState(false);
  const isPerfectList = pathname === "/the-perfect-list";
  const isEatRealGuide = pathname === "/eat-real-guide";

  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.navInner}`}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/small-circle-logo.svg"
            alt=""
            width={38}
            height={38}
            unoptimized
          />
          Healthy Homemade Habits
        </Link>
        <div className={styles.navRight}>
          {isPerfectList ? (
            <Link href="/the-perfect-list/checkout" className="btn btn-primary">
              Buy The Perfect Grocery List - $47
            </Link>
          ) : isEatRealGuide ? (
            <a target="_blank" href="https://checkout.mailerlite.com/checkout/32175" className="btn btn-primary">
              Buy Eat Real, Live Better - $17
            </a>
          ) : (
            <Link href="/quiz" className="btn btn-primary">
              Take the Quiz!
            </Link>
          )}
        </div>
      </div>
      <div className={styles.subNav}>
        <div className={`wrap ${styles.subNavInner}`}>
          <div className={styles.mobileCta}>
            {isPerfectList ? (
              <Link href="/the-perfect-list/checkout" className="btn btn-primary">
                Get Guide · $47
              </Link>
            ) : isEatRealGuide ? (
              <a target="_blank" href="https://checkout.mailerlite.com/checkout/32175" className="btn btn-primary">
                Get Guide · $17
              </a>
            ) : (
              <Link href="/quiz" className="btn btn-primary">
                Take the Quiz!
              </Link>
            )}
          </div>
          <nav className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? styles.active : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className={styles.menuBtn}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <i className={menuOpen ? "ph ph-x" : "ph ph-list"} />
          </button>
        </div>
        {menuOpen && (
          <div className={`wrap ${styles.mobileMenu}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? styles.active : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
