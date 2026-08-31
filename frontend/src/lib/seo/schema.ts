import {
  B2C_URL,
  ORGANIZATION,
  PAGE_SEO,
  PageKey,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./siteConfig";

/**
 * A4 — the JSON-LD nodes this site emits. The audit found zero structured data
 * on either domain; these cover the types it asks for that apply to a B2B site
 * with no catalogue of its own: Organization, WebSite and BreadcrumbList.
 * (Product belongs on the storefront's strain pages, not here.)
 *
 * `@id` values are stable URLs so the nodes can reference each other instead of
 * repeating themselves, and so the same Organization emitted on every page is
 * understood as one entity rather than six.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type JsonLdNode = Record<string, unknown>;

export function organizationSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: ORGANIZATION.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/logo.svg"),
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    vatID: ORGANIZATION.vatId,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.address.street,
      addressLocality: ORGANIZATION.address.locality,
      postalCode: ORGANIZATION.address.postalCode,
      addressCountry: ORGANIZATION.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: ORGANIZATION.email,
      telephone: ORGANIZATION.telephone,
      availableLanguage: ["en"],
    },
    // The consumer storefront is the same company under the same brand; saying
    // so links the two domains instead of letting them look like rivals.
    sameAs: [B2C_URL, ...ORGANIZATION.sameAs],
  };
}

export function webSiteSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/**
 * Breadcrumb for a second-level page: Home > <page>. The site is two levels
 * deep, so this is the whole trail.
 */
export function breadcrumbSchema(key: Exclude<PageKey, "home">): JsonLdNode {
  const page = PAGE_SEO[key];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl(PAGE_SEO.home.path),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.heading,
        item: absoluteUrl(page.path),
      },
    ],
  };
}
