"use client";

import { useTranslations } from "next-intl";
import CTAForm from "@/components/ui/CTAForm";

interface CTASectionProps {
  variant?: "default" | "industry";
  pageVariant?: "default" | "contact";
}

export default function CTASection({ variant = "default", pageVariant = "default" }: CTASectionProps) {
  const t = useTranslations("cta");
  // const tf = useTranslations("footer");

  const topPaddingClass = "pt-xxxl";
  const containerGapClass = variant === "industry" ? "gap-[40px] md:gap-20 lg:gap-0" : "gap-40 md:gap-20 lg:gap-0";

  return (
    <section id="contact" className="bg-black-primary overflow-hidden">
      <div className={`container mx-auto flex w-full max-w-[1920px] flex-col items-center ${containerGapClass} px-5 pb-xxxl lg:px-10 ${topPaddingClass}`}>
        {variant === "industry" && (
          <div className="w-full pb-12 md:pb-16">
            <p className="w-full font-sans text-[40px] md:text-[48px] font-normal leading-[1] tracking-[-1px] text-white">
              {t("industryHeadline")}
            </p>
          </div>
        )}
        <div className="grid w-full grid-cols-1 items-start gap-xl md:gap-20 lg:grid-cols-2 lg:gap-24">
            {/* Left side texts */}
            <div className="flex flex-col">
              {t("eyebrow") && (
                <div className="text-caps-style text-white mb-4 md:mb-5">
                  {t("eyebrow")}
                </div>
              )}
              <h2 className="font-sans text-[40px] md:text-[48px] font-normal leading-[1] tracking-[-1px] text-white mb-4 md:mb-6">
                {t("title")}
              </h2>
              <p className="font-sans text-[19px] font-normal leading-[1.4] text-white max-w-[640px]">
                {t("subtitle")}
              </p>
            </div>

            {/* Right side form */}
            <div className="flex w-full flex-1 justify-start">
              <CTAForm />
            </div>
          </div>
      </div>
    </section>
  );
}
