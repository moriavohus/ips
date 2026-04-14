"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function IndustryOutcomes() {
  const t = useTranslations("industryOutcomes");
  const items = t.raw("items") as string[];

  return (
    <section id="industry-outcomes" className="section-padding overflow-hidden bg-white">
      <div className="w-full px-5 lg:px-10">
        <div className="flex w-full flex-col items-stretch">
          <div className="w-full py-20">
            <h2 className="w-full text-h2-mobile md:text-h2 text-black">
              {t("title")}
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, index) => {
              const numberStr = `0${index + 1}`;
              return (
                <div
                  key={index}
                  className="relative flex h-full w-full flex-col justify-between rounded-[16px] bg-background p-6 min-h-[320px] md:min-h-[380px] md:p-8"
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
      </div>
    </section>
  );
}
