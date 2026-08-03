import type { Metadata } from "next";
import { Instrument_Serif, Raleway } from "next/font/google";
import Script from "next/script";
import ConditionalSiteChrome from "@/components/ConditionalSiteChrome";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-sans",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.healthyhomemadehabits.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Healthy Homemade Habits",
    default: "Healthy Homemade Habits: Real Food. Real Life. 80/20.",
  },
  description:
    "Hana & Timm help everyday people cut Ultra Processed Foods without giving up the foods they love, using the 80/20 eating method. Free guides, PDF products, and weekly YouTube videos.",
  keywords: [
    "ultra processed foods",
    "UPF",
    "80/20 diet",
    "80/20 eating method",
    "real food",
    "whole food diet",
    "healthy eating habits",
    "cut processed foods",
    "healthy grocery shopping",
    "ingredient label reading",
    "real food lifestyle",
  ],
  authors: [{ name: "Hana & Timm", url: `${siteUrl}/about` }],
  creator: "Hana & Timm",
  openGraph: {
    type: "website",
    siteName: "Healthy Homemade Habits",
    locale: "en_US",
    url: siteUrl,
    title: "Healthy Homemade Habits: Real Food. Real Life. 80/20.",
    description:
      "Hana & Timm help everyday people cut Ultra Processed Foods without giving up the foods they love, using the 80/20 eating method.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthy Homemade Habits: Real Food. Real Life. 80/20.",
    description:
      "Hana & Timm help everyday people cut Ultra Processed Foods without giving up the foods they love, using the 80/20 eating method.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/small-circle-logo_w-bg.svg",
    apple: "/small-circle-logo_png.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Healthy Homemade Habits",
  url: siteUrl,
  logo: `${siteUrl}/small-circle-logo_w-bg.svg`,
  description:
    "Hana & Timm help everyday people identify and reduce Ultra Processed Foods using the 80/20 eating method, without giving up the foods they love.",
  founders: [
    { "@type": "Person", name: "Hana" },
    { "@type": "Person", name: "Timm" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@healthyhomemadehabits.com",
    contactType: "customer service",
  },
  sameAs: ["https://www.youtube.com/@healthyhomemadehabits"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrumentSerif.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          src="https://unpkg.com/@phosphor-icons/web@2.1.1"
          strategy="afterInteractive"
        />
        <ConditionalSiteChrome>
          {children}
        </ConditionalSiteChrome>
      </body>
    </html>
  );
}
