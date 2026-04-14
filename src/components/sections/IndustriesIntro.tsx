"use client";

import { useTranslations } from "next-intl";
export default function IndustriesIntro() {
  const t = useTranslations("industriesIntro");

  return (
    <section id="industries-intro" className="overflow-hidden bg-white">
      <div className="w-full px-5 lg:px-10">
        <div className="flex w-full flex-col items-center gap-16 md:flex-row md:items-start md:justify-center md:gap-20">
          <h2 className="w-full flex-shrink-0 text-h2-mobile text-type-primary md:w-[50%] md:text-h2">
            {t("title")}
          </h2>
          <div className="w-full md:w-[50%]">
            <p className="text-body-mobile text-type-primary md:text-body mb-[19px]">
              {t("text")}
            </p>
            <p className="text-body-mobile text-type-primary md:text-body">
              {t("text2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
