import React from "react";
import HeroSection from "../sections/HeroSection";
import ExplanationSection from "../sections/AboutSection";
import WhyWeSection from "../sections/WhyWeSection";
import ContactSection from "../sections/ContactSection";
import RevealObserver from "../common/RevealObserver";

/**
 * Shared shell values with the storefront's homepage: the same 140/200px
 * section rhythm, the same bottom gutter, and the same
 * px-4 -> xl:px-[130px] container scale on every band.
 *
 * The container padding lives on each section rather than on <main>, because
 * the hero band needs to run full-bleed behind its own top padding while the
 * content bands stay inset.
 */
const SECTION_PX = "w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[130px]";

const B2B = () => {
  return (
    <div
      id="b2b-page"
      className="flex flex-col gap-[140px] pb-10 sm:pb-14 lg:gap-[200px] lg:pb-24"
    >
      <RevealObserver />
      {/* Hero band — clears the fixed header; HeroSection adds its own
          mt-[150px] on top, exactly as the storefront hero does. */}
      <section
        id="hero"
        className="scroll-mt-[62px] pt-[92px] sm:scroll-mt-[80px] sm:pt-[110px] md:scroll-mt-[96px] lg:pt-[128px]"
      >
        <HeroSection />
      </section>
      <section
        id="about"
        className={`${SECTION_PX} scroll-mt-[62px] sm:scroll-mt-[80px] md:scroll-mt-[96px]`}
      >
        <ExplanationSection />
      </section>
      <section
        id="why"
        className={`${SECTION_PX} scroll-mt-[62px] sm:scroll-mt-[80px] md:scroll-mt-[96px]`}
      >
        <WhyWeSection />
      </section>
      <section
        id="contact"
        className={`${SECTION_PX} scroll-mt-[62px] sm:scroll-mt-[80px] md:scroll-mt-[96px]`}
      >
        <ContactSection />
      </section>
    </div>
  );
};

export default B2B;
