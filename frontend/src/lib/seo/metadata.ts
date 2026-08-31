import type { Metadata } from "next";
import { PAGE_SEO, PageKey, absoluteUrl } from "./siteConfig";

/**
 * B1/B3/B4 — build the <title>, <meta name="description"> and canonical for a
 * page from its PAGE_SEO entry.
 *
 * The canonical is always the page's own absolute URL. Nothing on this site
 * should ever canonicalise elsewhere: the audit found the storefront pointing
 * /products/ pages at /seeds/ URLs that nothing linked to, and a
 * self-referencing canonical is the only way to be certain that cannot start
 * happening here.
 */
export function pageMetadata(key: PageKey): Metadata {
  const page = PAGE_SEO[key];

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: absoluteUrl(page.path) },
    openGraph: {
      type: "website",
      url: absoluteUrl(page.path),
      title: page.title,
      description: page.description,
      siteName: "Evervale B2B",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}
