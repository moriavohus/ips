"use client";

import { useTranslations } from "next-intl";
import CTAForm from "@/components/ui/CTAForm";

interface CTASectionProps {
  variant?: "default" | "industry";
}

export default function CTASection({ variant = "default" }: CTASectionProps) {
  const t = useTranslations("cta");
  // const tf = useTranslations("footer");

  return (
    <section id="contact" className="bg-black-primary overflow-hidden pb-[32.5px] lg:pb-10">
      <div className="container mx-auto flex w-full max-w-[1920px] flex-col items-center gap-40 px-5 pb-5 pt-0 md:gap-20 md:pb-10 md:pt-0 lg:gap-0 lg:px-10">
        {variant === "industry" && (
          <div className="w-full py-12 md:py-16">
            <p className="w-full font-sans text-[40px] md:text-[48px] font-normal leading-[1] tracking-[-1px] text-white">
              {t("industryHeadline")}
            </p>
          </div>
        )}
        <div className="grid w-full grid-cols-1 items-start gap-40 md:gap-20 lg:grid-cols-2 lg:gap-24">
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
