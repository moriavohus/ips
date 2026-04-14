"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { scrollToContactForm } from "@/lib/utils";

interface SplitHeroProps {
  breadcrumb: ReactNode;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  imageSrc: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
}

export default function SplitHero({
  breadcrumb,
  title,
  subtitle,
  ctaText,
  ctaHref,
  onCtaClick,
  imageSrc,
  imageAlt,
  imageFit = "cover",
}: SplitHeroProps) {
  return (
    <section className="bg-white pt-[10px] pb-[32.5px] lg:pb-[40px] min-h-[70vh] flex items-center">
        <div className="container mx-auto">
          <div className="outside-stroke-mobile-light bg-white border-0 lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] relative min-h-[calc(70vh-16px)] overflow-visible flex flex-col lg:grid lg:grid-cols-12">

          {/* Left Content Column */}
          <div className="lg:col-span-6 p-s lg:p-[20px] flex flex-col relative z-10 w-full rounded-t-[24px] lg:rounded-l-[24px] lg:rounded-tr-none bg-white">
            <div className="mb-[20px] lg:mb-16">
              {typeof breadcrumb === "string" ? (
                <span className="text-caps-style text-type-primary">{breadcrumb}</span>
              ) : (
                breadcrumb
              )}
            </div>

            <div className="flex-1">
              <h1 className="font-sans text-[36px] md:text-[46px] xl:text-[58px] font-normal leading-[1] tracking-[-0.02em] text-type-primary mb-6 lg:mb-8">
                {title}
              </h1>

              <div className="w-full h-[1px] bg-black-thout mb-6 lg:mb-8"></div>

              <p className="font-sans text-body font-normal leading-[1.4] tracking-normal text-type-primary max-w-[640px]">
                {subtitle}
              </p>
            </div>

            {ctaText && (ctaHref || onCtaClick) && (
              <div className="mt-8">
                {onCtaClick || ctaHref === "/contact" ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (onCtaClick) {
                        onCtaClick();
                        return;
                      }
                      scrollToContactForm();
                    }}
                    className="bg-primary hover:bg-type-brand text-white px-10 py-5 rounded-[14px] font-medium text-[18px] uppercase tracking-normal transition-colors inline-block w-full sm:w-fit text-center"
                  >
                    {ctaText}
                  </button>
                ) : (
                  <Link
                    href={ctaHref!}
                    className="bg-primary hover:bg-type-brand text-white px-10 py-5 rounded-[14px] font-medium text-[18px] uppercase tracking-normal transition-colors inline-block w-full sm:w-fit text-center"
                  >
                    {ctaText}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative h-[400px] lg:h-auto min-h-full">
            <div className="absolute inset-x-s bottom-s top-[20px] overflow-hidden rounded-[14px] lg:inset-[20px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className={imageFit === "contain" ? "object-contain p-4 xl:p-6" : "object-cover object-center mix-blend-multiply"}
                priority
              />
            </div>
          </div>

        </div>
        </div>
      </section>
  );
}
