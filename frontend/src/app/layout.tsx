import type { Metadata } from "next";
import { gilroy } from "../fonts/gilory";
import { nunitoSans } from "../fonts/nunito";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Script from "next/script";
import JsonLd from "../components/seo/JsonLd";
import { organizationSchema, webSiteSchema } from "../lib/seo/schema";
import { PAGE_SEO, SITE_URL } from "../lib/seo/siteConfig";

const COOKIEYES_SCRIPT_SRC =
  "https://cdn-cookieyes.com/client_data/87c379f49309a488b710ea709cf703f4/script.js";
const GTM_ID = "GTM-KGFP25F4";

/**
 * B3/B4 — the root layout no longer carries a title or description of its own.
 *
 * It used to, and because no page overrode them, all six pages of this site
 * shipped one identical title and one identical description — half of the
 * duplicates the audit counted across both domains. Each page now sets its own
 * via `pageMetadata()`; what stays here is only what is genuinely site-wide.
 *
 * `metadataBase` is what turns the relative canonical/OG paths into absolute
 * URLs on b2b.evervale.org rather than on the storefront.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Every page supplies its own title; this is the fallback if one forgets.
    default: PAGE_SEO.home.title,
    template: "%s",
  },
  icons: {
    icon: [
      { url: "/Favicon.svg", type: "image/svg+xml" },
      { url: "/Favicon.svg", rel: "shortcut icon" },
    ],
    shortcut: "/Favicon.svg",
    apple: "/Favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="cookieyes"
          src={COOKIEYES_SCRIPT_SRC}
          strategy="beforeInteractive"
        />
        <Script
          id="google-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                functionality_storage: 'denied',
                personalization_storage: 'denied',
                security_storage: 'granted',
                wait_for_update: 500
              });
            `,
          }}
        />
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({
                'gtm.start': new Date().getTime(), event:'gtm.js'
              });var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body className={`${nunitoSans.variable} ${gilroy.variable} antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* A4 — Organization + WebSite, site-wide. Both carry a stable @id, so
            repeating them per page describes one entity, not six. */}
        <JsonLd schema={[organizationSchema(), webSiteSchema()]} />
        <Header />
        <div className="app-shell">
          {/* Matches the storefront's shell: <main> owns only the bottom
              gutter, and each page section supplies its own side padding and
              header clearance. It used to add px-4..lg:px-[130px] and
              pt-[140px] here as well, which the legal pages then repeated —
              doubling both to 260px of side padding and 320px above the H1. */}
          <main className="pb-6 lg:pb-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
