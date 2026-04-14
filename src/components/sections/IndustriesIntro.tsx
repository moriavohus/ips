"use client";

import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function IndustriesIntro() {
  const t = useTranslations("industriesIntro");

  return (
    <SectionWrapper id="industries-intro" bg="white">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 lg:gap-32 py-12 lg:py-20">
        <h2 className="text-h2-mobile md:text-h2 text-type-primary md:w-[40%] flex-shrink-0">
          {t("title")}
        </h2>
        <div className="md:w-[60%]">
          <p className="text-body-mobile md:text-body text-type-primary mb-[19px]">
            {t("text")}
          </p>
          <p className="text-body-mobile md:text-body text-type-primary">
            {t("text2")}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
