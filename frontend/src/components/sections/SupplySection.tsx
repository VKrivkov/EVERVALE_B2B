import React from "react";
import Image from "next/image";
import Card from "../common/Card";
import InfoContainer from "../common/InfoContainer";
import badge from "../../../public/icons/badge.svg";
import { cn } from "../../lib/utils";

interface SupplySectionProps {
  className?: string;
  sectionId?: string;
}

const SupplySection: React.FC<SupplySectionProps> = ({
  className,
  sectionId,
}) => {
  return (
    <section id={sectionId} className={cn("w-full", className)}>
      <Card
        width="100%"
        height="auto"
        className="flex w-full flex-col items-center justify-center gap-6 py-12 sm:py-14 md:py-16 min-h-[360px] sm:min-h-[400px] md:min-h-[460px]"
        data-reveal
      >
        {/* A3 — decorative: the heading underneath carries the meaning. */}
        <Image
          src={badge}
          alt=""
          aria-hidden="true"
          className="mb-1"
          width={140}
          height={140}
        />
        <InfoContainer
          title="Out Suppliers."
          textAlign="center"
          titleClassName="text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.08] font-extrabold text-pr_dg"
          contentClassName="display-md_thin text-pr_dg/70"
          containerGap="gap-4"
        >
          Every batch follows strict quality protocols and documented controls
          <br /> aligned with GACP, GMP, and ISO requirements, ensuring
          <br />
          full compliance and traceability from seed to shipment.
        </InfoContainer>
      </Card>
    </section>
  );
};

export default SupplySection;
