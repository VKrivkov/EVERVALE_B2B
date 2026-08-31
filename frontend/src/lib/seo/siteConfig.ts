/**
 * Single source of truth for the B2B site's SEO values: the public origin, the
 * per-page title/description pairs, and the JSON-LD organisation details.
 *
 * b2b.evervale.org and evervale.org are separate sites that share a brand, so
 * every value here has to be deliberately different from its B2C counterpart —
 * the August 2026 audit flagged both homepages for sharing one title, one
 * description and one H1. `npm run seo:check` re-checks that after every build.
 */

/** Public origin of the B2B site. Used for canonical + sitemap URLs. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://b2b.evervale.org"
).replace(/\/+$/, "");

/** The consumer storefront. Referenced from JSON-LD, never canonicalised to. */
export const B2C_URL = "https://evervale.org";

export const SITE_NAME = "Evervale B2B";

/** Audit limits: titles 30-60 characters, descriptions at most 155. */
export const TITLE_MIN = 30;
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

/**
 * Turn "/disclaimer" into "https://b2b.evervale.org/disclaimer".
 *
 * The root is emitted without a trailing slash, because that is how Next
 * normalises `alternates.canonical`. Sitemap entries and canonical tags are
 * compared against each other during acceptance, so the two have to agree
 * character for character rather than just point at the same page.
 */
export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const normalised = (path.startsWith("/") ? path : `/${path}`).replace(
    /\/+$/,
    "",
  );
  return `${SITE_URL}${normalised}`;
}

/**
 * Every page this site serves, with the metadata it should carry.
 *
 * `heading` is the page's H1. It is kept here next to the title so the two stay
 * distinct from each other and from the B2C site — the audit's B5 finding was
 * that both homepages rendered the same slogan as their only H1.
 */
export const PAGE_SEO = {
  home: {
    path: "/",
    title: "Wholesale Cannabis Seeds for Licensed Buyers",
    description:
      "Evervale supplies certified cannabis genetics to licensed distributors, seed banks and growers. GACP-aligned production, full batch traceability.",
    heading: "Wholesale Cannabis Genetics for Licensed Partners",
    priority: 1,
    changeFrequency: "monthly" as const,
  },
  privacyPolicy: {
    path: "/privacy-policy",
    title: "Privacy Policy for B2B Partners | Evervale",
    description:
      "How Evervale collects, stores and protects the data of its wholesale partners, which cookies we set, and how to exercise your rights under the GDPR.",
    heading: "Privacy Policy",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  termsAndConditions: {
    path: "/terms-and-conditions",
    title: "Terms & Conditions of Wholesale Supply",
    description:
      "The terms governing wholesale supply from Evervale: ordering, pricing, payment, delivery, age and licensing requirements, and partner obligations.",
    heading: "Terms & Conditions",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  returnRefundPolicy: {
    path: "/return-refund-policy",
    title: "Return & Refund Policy for Bulk Orders",
    description:
      "When Evervale accepts returns on wholesale seed orders, how to request a refund, and the timeframes and packaging conditions that apply.",
    heading: "Return & Refund Policy",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  disclaimer: {
    path: "/disclaimer",
    title: "Legal Disclaimer & Product Notice | Evervale B2B",
    description:
      "Legal information about Evervale cannabis seeds sold to trade partners, their intended use as collectable souvenirs, and responsibilities under local law.",
    heading: "Disclaimer",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  germinationGuarantee: {
    path: "/germination-guarantee",
    title: "Germination Guarantee & Seed Quality Standards",
    description:
      "The germination rates Evervale stands behind on wholesale batches, how a partner claims a replacement, and the storage and sowing conditions required.",
    heading: "Germination Guarantee",
    priority: 0.4,
    changeFrequency: "yearly" as const,
  },
} as const;

export type PageKey = keyof typeof PAGE_SEO;

/** Company details behind the JSON-LD Organization node. */
export const ORGANIZATION = {
  legalName: "ELEVAN plus s.r.o.",
  email: "info@evervale.org",
  telephone: "+357 978 162 42",
  vatId: "CZ02928205",
  address: {
    street: "Na Čečeličce 425/4",
    locality: "Praha",
    postalCode: "150 00",
    country: "CZ",
  },
  sameAs: [
    "https://instagram.com/evervale_official",
    "https://www.linkedin.com/company/evervale/",
  ],
} as const;
