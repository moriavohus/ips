"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import FloatingDownloadButton from "@/components/ui/FloatingDownloadButton";
import Button from "@/components/ui/Button";
import { scrollToContactForm } from "@/lib/utils";

export default function Hero() {
  const t = useTranslations("hero");
  const buttons = useTranslations("buttons");
  const nav = useTranslations("nav");
  const heroTitle = t("title").replace(/\s–/, "\u00A0–");

  return (
    <section className="bg-white pt-[10px] pb-[32.5px] lg:pb-[40px] min-h-[70vh] flex items-center">
        <div className="container mx-auto">
          {/* Grey Frame around Hero */}
          <div className="outside-stroke-mobile-light bg-white border-0 lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] relative overflow-visible flex flex-col gap-[40px] p-[14px] lg:min-h-[calc(70vh-16px)] lg:grid lg:grid-cols-12 lg:gap-0 lg:p-0">

              {/* Left Content Column - Span 6 cols */}
              <div className="order-2 lg:order-1 lg:col-span-6 px-0 pt-0 lg:p-[20px] flex flex-col relative z-10 w-full rounded-t-[24px] lg:rounded-l-[24px] lg:rounded-tr-none bg-white">
                <div className="mb-[20px] lg:mb-6">
                  <span className="text-caps-style text-type-primary">{nav("home")}</span>
                </div>

                <div className="flex-1">
                <h1 className="font-sans text-[36px] md:text-[46px] xl:text-[58px] font-normal leading-[1] tracking-[-0.02em] text-type-primary mb-5 lg:mb-8">
                  {heroTitle}
                </h1>

                <div className="hidden lg:block w-full h-[1px] bg-black-thout mb-8"></div>

                <p className="font-sans text-body font-normal leading-[1.4] tracking-normal text-type-primary max-w-[640px]">
                  {t("subtitle")}
                </p>
                </div>

                <div className="mt-[28px] lg:mt-0">
                  <Button
                    variant="primary"
                    onClick={scrollToContactForm}
                    className="w-full sm:w-fit"
                  >
                    {buttons("getQuote")}
                  </Button>
                </div>
              </div>

              {/* Right Image Column - Span 6 cols */}
              <div className="order-1 lg:order-2 relative h-[180px] w-full lg:col-span-6 lg:h-auto lg:min-h-full">
                {/* Technical Drawing Background */}
                <div className="relative h-full w-full overflow-hidden rounded-[14px] lg:absolute lg:inset-[20px] lg:h-auto lg:w-auto">
                  <Image
                    src="/images/hero_main.png"
                    alt="Technical blueprint of cellular glass insulation"
                    fill
                    className="object-cover object-center lg:object-[center_right] xl:object-center mix-blend-multiply"
                    priority
                  />
                </div>

              </div>

            </div>

        </div>
        <FloatingDownloadButton />
      </section>
  );
}
