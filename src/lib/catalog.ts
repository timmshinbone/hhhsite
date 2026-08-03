/**
 * Single source of truth for products and what buying them grants.
 * Add future products here; nothing else in the codebase needs to change
 * to support a new slug at /[slug]/checkout.
 */

export type Entitlement = {
  /** Stable internal key — used in purchase records, never shown to buyers. */
  key: string;
  /** Human label — used in the MailerLite purchased_product field. */
  label: string;
  /** MailerLite group ID that triggers the delivery automation. */
  mailerliteGroupId: string;
  /**
   * Object key inside your private R2 bucket.
   * PLACEHOLDER — update this to match your actual R2 file key after upload.
   * Null for non-file products (e.g. consultations).
   */
  fileKey: string | null;
};

export const ENTITLEMENTS: Record<string, Entitlement> = {
  grocery_guide: {
    key: 'grocery_guide',
    label: 'The Perfect Grocery List',
    mailerliteGroupId: process.env.MAILERLITE_THE_PERFECT_GROCERY_LIST_GROUP_ID!,
    fileKey: 'The-Perfect-Grocery-List-HHH_download.pdf', // PLACEHOLDER — set to your actual R2 key
  },
};

/** Stripe price ID → entitlement keys. Bundles list several keys on one price. */
export const PRICE_TO_ENTITLEMENTS: Record<string, string[]> = {
  [process.env.STRIPE_PRICE_GROCERY_GUIDE!]: ['grocery_guide'],
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  priceId: string;
  displayPrice: string;
  bullets: string[];
};

export const PRODUCTS: Record<string, Product> = {
  'the-perfect-list': {
    slug: 'the-perfect-list',
    name: 'The Perfect List',
    tagline: 'The grocery list that makes clean eating automatic.',
    priceId: process.env.STRIPE_PRICE_GROCERY_GUIDE!,
    displayPrice: '$47',
    bullets: [
      'Instant PDF download',
      'Free updates for life',
    ],
  },
};

export function productBySlug(slug: string): Product | null {
  return PRODUCTS[slug] ?? null;
}

export type LeadMagnet = {
  name: string;
  fileKey: string;
  mlGroupId: string;
};

export const LEAD_MAGNETS: Record<string, LeadMagnet> = {
  'swap-sheet': {
    name: 'The 5-Second Shopper',
    fileKey: 'The-5-Second-Shopper-HHH.pdf',
    mlGroupId: process.env.MAILERLITE_5_SECOND_SHOPPER_GROUP_ID!,
  },
};

/** Every buyer lands in this group regardless of what they purchased. */
export const ML_GROUP_CUSTOMERS = process.env.MAILERLITE_THE_PERFECT_GROCERY_LIST_GROUP_ID!;

/** Buyers who ticked the marketing opt-in inside the Stripe form. */
export const ML_GROUP_NEWSLETTER = process.env.MAILERLITE_THE_PERFECT_GROCERY_LIST_GROUP_ID!;

export function entitlementsForPrices(priceIds: string[]): Entitlement[] {
  const keys = new Set<string>();
  for (const priceId of priceIds) {
    for (const key of PRICE_TO_ENTITLEMENTS[priceId] ?? []) keys.add(key);
  }
  return [...keys].map((k) => ENTITLEMENTS[k]).filter(Boolean);
}
