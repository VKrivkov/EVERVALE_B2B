import type { MetadataRoute } from "next";
import { PAGE_SEO, absoluteUrl } from "@/lib/seo/siteConfig";

/**
 * A2 — /sitemap.xml, generated at build time from PAGE_SEO.
 *
 * PAGE_SEO is the same object the pages take their titles from, so a page
 * cannot be added to the site and forgotten here: it gets an entry the moment
 * it gets metadata. Every URL is absolute, on the canonical origin, without a
 * trailing slash or query string — one version per page, as B1 requires.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return Object.values(PAGE_SEO).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
