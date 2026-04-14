"use client";

import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Image from "next/image";

export default function IndustryOutcomes() {
  const t = useTranslations("industryOutcomes");
  const items = t.raw("items") as string[];

  return (
    <SectionWrapper id="industry-outcomes" bg="white">
      <div className="flex flex-col w-full">
        <h2 className="font-sans text-[32px] md:text-[44px] xl:text-[56px] font-normal leading-[1.1] tracking-[-0.02em] text-black max-w-[900px] mb-10 md:mb-14">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => {
            const numberStr = `0${index + 1}`;
            return (
              <div
                key={index}
                className="bg-background rounded-[16px] p-6 md:p-8 flex flex-col justify-between min-h-[320px] md:min-h-[380px] relative"
              >
                {/* Corner dots + number */}
                <div className="flex justify-between items-start w-full">
                  <div className="w-2 h-2 bg-surface-dark rounded-sm" />
                  <span className="font-mono text-[14px] text-type-secondary">
                    {numberStr}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center flex-1 py-4">
                  <div className="relative w-[240px] h-[140px] md:w-[280px] md:h-[160px]">
                    <Image
                      src="/images/safety-icon.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Label */}
                <div className="w-full text-center mb-4">
                  <span className="font-sans text-[22px] md:text-[28px] font-semibold leading-[1.2] text-type-brand">
                    {item}
                  </span>
                </div>

                {/* Bottom dots */}
                <div className="flex justify-between items-end w-full">
                  <div className="w-2 h-2 bg-surface-dark rounded-sm" />
                  <div className="w-2 h-2 bg-surface-dark rounded-sm" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
