"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import FloatingDownloadButton from "@/components/ui/FloatingDownloadButton";
import Button from "@/components/ui/Button";
import { scrollToContactForm } from "@/lib/utils";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="bg-white pt-[10px] pb-[32.5px] lg:pb-[40px] min-h-[70vh] flex items-center">
        <div className="container mx-auto">
          {/* Grey Frame around Hero */}
          <div className="outside-stroke-mobile-light bg-white border-0 lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] relative min-h-[calc(70vh-16px)] overflow-visible flex flex-col lg:grid lg:grid-cols-12">

              {/* Left Content Column - Span 6 cols */}
              <div className="lg:col-span-6 p-s lg:p-[20px] flex flex-col relative z-10 w-full rounded-t-[24px] lg:rounded-l-[24px] lg:rounded-tr-none bg-white">
                <div className="mb-6">
                  <span className="text-caps-style text-type-primary">HOME</span>
                </div>

                <div className="flex-1">
                <h1 className="font-sans text-[36px] md:text-[46px] xl:text-[58px] font-normal leading-[1] tracking-[-0.02em] text-type-primary mb-6 lg:mb-8">
                  {t("title")}
                </h1>

                <div className="w-full h-[1px] bg-black-thout mb-6 lg:mb-8"></div>

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
                    {t("cta")}
                  </Button>
                </div>
              </div>

              {/* Right Image Column - Span 6 cols */}
              <div className="lg:col-span-6 relative h-[400px] lg:h-auto min-h-full">
                {/* Technical Drawing Background */}
                <div className="absolute inset-[20px] overflow-hidden rounded-[14px]">
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
