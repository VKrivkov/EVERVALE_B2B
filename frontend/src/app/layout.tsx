import type { Metadata } from "next";
import { gilroy } from "../fonts/gilory";
import { nunitoSans } from "../fonts/nunito";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Script from "next/script";

const COOKIEYES_SCRIPT_SRC =
  "https://cdn-cookieyes.com/client_data/87c379f49309a488b710ea709cf703f4/script.js";
const GTM_ID = "GTM-KGFP25F4";

export const metadata: Metadata = {
  title: "Evervale B2B | Wholesale Cannabis Seeds",
  description:
    "Wholesale cannabis genetics for licensed distributors and seed banks. GACP certification, full traceability from seed to shipment.",
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
        <Header />
        <div className="app-shell">
          <main className="px-4 sm:px-6 md:px-8 lg:px-[130px] pt-[140px] pb-[140px] lg:pt-[200px] lg:pb-[200px]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
