import React from "react";
import Card from "../common/Card";
import InfoContainer from "../common/InfoContainer";
import Image from "next/image";
// B6 — WebP, not PNG. These two were 289 KB and 252 KB, the only assets on the
// site over the audit's 100 KB line; re-encoded at the same 532x267 they are
// 28 KB and 24 KB. `images.unoptimized` is on (static export), so the file that
// ships is exactly the file imported here — the format has to be right at rest.
import cannabis1 from "../../../public/images/ExplanationSectionImages/cannabis1.webp";
import cannabis2 from "../../../public/images/ExplanationSectionImages/cannabis2.webp";
import { cn } from "../../lib/utils";

interface ExplanationSectionProps {
  className?: string;
  sectionId?: string;
}

const ExplanationSection: React.FC<ExplanationSectionProps> = ({
  className,
  sectionId,
}) => {
  return (
    <section id={sectionId} className={cn("w-full", className)}>
      <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
        <div className="max-w-full md:max-w-[620px]">
          <InfoContainer
            title="Rooted in Science. Growing with Trust."
            textAlign="left"
            titleClassName="text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.08] font-extrabold text-pr_w"
            contentClassName="display-md_thin text-pr_w/70"
            containerGap="gap-4"
            reveal
            revealDelay={40}
          >
            Evervale is a new generation of cannabis genetics provider built on
            transparency and precision.
          </InfoContainer>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 md:justify-center">
          <Card
            width="100%"
            height="auto"
            className="md:flex-1 md:max-w-[calc(50%-8px)] transition-all duration-300 ease-out hover:-translate-y-1 lg:w-auto lg:max-w-[560px]"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <Image
              src={cannabis1}
              alt="Flowering cannabis plant maturing under LED lights in an indoor cultivation facility"
              className="mb-4 md:mb-5 lg:mb-6 w-full h-auto rounded-tr-2xl rounded-bl-2xl"
            />
            <InfoContainer
              as="h3"
              title="Wholesale Seed Sales"
              textAlign="left"
              titleClassName="display-md_bold text-pr_dg"
              contentClassName="display-sm text-pr_dg/70"
              containerGap="gap-3"
            >
              We promote responsible sourcing & environmentally
              <br className="hidden md:block" /> conscious production.
            </InfoContainer>
          </Card>
          <Card
            width="100%"
            height="auto"
            className="md:flex-1 md:max-w-[calc(50%-8px)] transition-all duration-300 ease-out hover:-translate-y-1 lg:w-auto lg:max-w-[560px]"
            data-reveal
            style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
          >
            <Image
              src={cannabis2}
              alt="Close-up of purple-tinged cannabis flowers on plants in late bloom"
              className="mb-4 md:mb-5 lg:mb-6 w-full h-auto rounded-tr-2xl rounded-bl-2xl"
            />
            <InfoContainer
              as="h3"
              title="Custom Breeding"
              textAlign="left"
              titleClassName="display-md_bold text-pr_dg"
              contentClassName="display-sm text-pr_dg/70"
              containerGap="gap-3"
            >
              Constantly improving our genetics through science
              <br className="hidden md:block" /> and collaboration.
            </InfoContainer>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExplanationSection;
