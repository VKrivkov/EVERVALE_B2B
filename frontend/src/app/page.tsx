import React from "react";
import type { Metadata } from "next";
import B2B from "../components/pages/B2B";
import { pageMetadata } from "../lib/seo/metadata";

// B3/B4 — the homepage's own title, description and self-referencing canonical.
// Organization + WebSite JSON-LD is emitted site-wide from the root layout.
export const metadata: Metadata = pageMetadata("home");

const page = () => {
  return (
    <div>
      <B2B />
    </div>
  );
};

export default page;
