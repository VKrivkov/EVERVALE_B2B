import type { Metadata } from "next";
import { gilroy } from "../fonts/gilory";
import { nunitoSans } from "../fonts/nunito";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ConsentAwareGTM from "../components/analytics/ConsentAwareGTM";

import Script from "next/script";

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
          src="https://cdn-cookieyes.com/client_data/72e63957d3c30f044edeeefae53db61e/script.js"
          strategy="beforeInteractive" 
        />
      </head>
      <body className={`${nunitoSans.variable} ${gilroy.variable} antialiased`}>
        <ConsentAwareGTM />
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
