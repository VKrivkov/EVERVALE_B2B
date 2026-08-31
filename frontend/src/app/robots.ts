import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/seo/siteConfig";

/**
 * A1 — /robots.txt, generated at build time. This works under
 * `output: "export"`: Next writes a static out/robots.txt during the build.
 *
 * Unlike the storefront, this site has no cart, no accounts and no admin, so
 * there is nothing to hide from crawlers: every one of its six pages is meant
 * to rank. The only rule beyond "allow everything" points at the sitemap.
 *
 * Keep any future Disallow entries tight — the audit's B2 note applies here
 * too: a stray broad pattern is the one mistake that removes the whole site
 * from search.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
