"use client";

import { useTranslations } from "next-intl";

export default function MobileFooterText() {
  const t = useTranslations("footer");

  return (
    <section className="lg:hidden bg-surface-dark py-[20px] -mb-px">
      <div className="container mx-auto">
        <p className="font-sans text-[32px] font-normal leading-[1.1] tracking-[-1px] text-white">
          {t("headline")}
        </p>
      </div>
    </section>
  );
}
