"use client";

import React from "react";
import Image from "next/image";
import InfoContainer from "../common/InfoContainer";
import Button from "../ui/Button";
import Card from "../common/Card";
import protectionCardIcon from "../../../public/icons/about_protection_card_icon.svg";
import growCardIcon from "../../../public/icons/about_grow_card_icon.svg";
import dnaCardIcon from "../../../public/icons/about_dna_card_icon.svg";
import chainCardIcon from "../../../public/icons/about_chain_card_icon.svg";
import protectionIcon from "../../../public/icons/protection.svg";
import growIcon from "../../../public/icons/grow.svg";
import dnaIcon from "../../../public/icons/dna.svg";
import chainIcon from "../../../public/icons/chain.svg";
import { cn } from "../../lib/utils";
import { triggerCatalogDownload } from "../../lib/catalogDownload";

const cards = [
  {
    title: "Certified Quality",
    description:
      "GACP-, GMP-, and ISO-aligned production ensures consistent, lab-verified seed quality.",
    badgeIcon: protectionCardIcon,
    background: protectionIcon,
  },
  {
    title: "High-Yield Genetics",
    description:
      "Stable and repeatable performance with tested yields, resilience, and predictable results.",
    badgeIcon: growCardIcon,
    background: growIcon,
  },
  {
    title: "Custom Breeding",
    description:
      "Tailored phenotype development designed to match your market, climate, and production goals.",
    badgeIcon: dnaCardIcon,
    background: dnaIcon,
  },
  {
    title: "Full Traceability",
    description:
      "Complete seed-to-shipment documentation, including origin, lab tests, and batch passports.",
    badgeIcon: chainCardIcon,
    background: chainIcon,
  },
];

interface WhyWeSectionProps {
  className?: string;
  sectionId?: string;
}

const WhyWeSection: React.FC<WhyWeSectionProps> = ({
  className,
  sectionId,
}) => {
  const handleCatalogClick = () => {
    triggerCatalogDownload("why_us");
  };

  return (
    <section id={sectionId} className={cn("flex flex-col gap-10", className)}>
      <div className="flex w-full flex-col items-left gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <InfoContainer
          title="Why licensed buyers choose Evervale"
          titleClassName="text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.08] font-extrabold text-pr_w"
          contentClassName="display-md_thin text-pr_w/70"
          containerGap="gap-4"
          reveal
          revealDelay={40}
        >
          Evervale is a new generation of cannabis genetics <br /> provider
          built on transparency and precision.
        </InfoContainer>
        <div className="flex w-full justify-start md:w-auto md:justify-end">
          <Button
            onClick={handleCatalogClick}
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            Request product catalog
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            width="100%"
            className="relative w-full min-h-[280px] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1"
            data-reveal
            style={
              { "--reveal-delay": `${120 + index * 80}ms` } as React.CSSProperties
            }
          >
            {/* A3 — decorative watermark: it repeats the icon below it and
                carries no information, so an empty alt keeps screen readers
                from announcing the card's title three times over. */}
            <Image
              src={card.background}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-8 h-[260px] w-[260px] opacity-30"
            />
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d3326]">
                {/* Decorative too — the heading right beside it says the
                    same thing in words. */}
                <Image
                  src={card.badgeIcon}
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={36}
                />
              </div>
              <InfoContainer
                as="h3"
                title={card.title}
                textAlign="left"
                titleClassName="display-md_bold text-pr_dg"
                contentClassName="display-sm text-pr_dg/70"
                containerGap="gap-3"
              >
                {card.description}
              </InfoContainer>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyWeSection;
