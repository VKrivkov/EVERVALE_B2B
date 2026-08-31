"use client";

import React from "react";
import Button from "../ui/Button";
import { cn } from "../../lib/utils";
import { triggerCatalogDownload } from "../../lib/catalogDownload";
import { PAGE_SEO } from "../../lib/seo/siteConfig";

interface HeroSectionProps {
  contentWidthClass?: string;
  className?: string;
  sectionId?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  contentWidthClass = "w-full",
  className,
  sectionId,
}) => {
  const handleCatalogClick = () => {
    triggerCatalogDownload("hero");
  };

  return (
    <section
      id={sectionId}
      className={cn("mt-8 w-full sm:mt-10 md:mt-12 lg:mt-0", className)}
    >
      <div
        className={cn(
          "flex w-full flex-col items-center gap-5 text-center mx-auto",
          contentWidthClass,
        )}
      >
        {/* B5 — the page's only <h1>. It used to read "Where Nature Meets
            Precision.", the same slogan evervale.org's homepage used, so the
            two sites' most important heading was identical and said nothing
            about either. This one names what this site sells and to whom;
            the slogan moved to the subheading below, where it still reads as
            brand copy without competing for the page's topic. */}
        <h1
          className="w-full text-[clamp(3rem,7.9vw,8.2rem)] leading-[0.97] font-extrabold tracking-[-0.02em] animated-gradient-text"
          data-reveal
          style={{ "--reveal-delay": "40ms" } as React.CSSProperties}
        >
          {PAGE_SEO.home.heading}
        </h1>
        <p
          className="display-md_thin max-w-3xl text-pr_w/75"
          data-reveal
          style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
        >
          Where nature meets precision — professional-grade cannabis genetics
          for licensed businesses.{" "}
          <br className="hidden sm:block" />
          Certified. Compliant. Consistent.
        </p>
        <Button
          variant="primary"
          onClick={handleCatalogClick}
          data-reveal
          style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
        >
          Request product catalog
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
