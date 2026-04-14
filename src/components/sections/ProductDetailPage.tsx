"use client";

import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "@/components/ui/Icons";
import { scrollToContactForm } from "@/lib/utils";

type SpecItem = { key: string; valueKey: string };

type Props = {
  productKey: string;
  specs: SpecItem[];
};

export default function ProductDetailPage({ productKey, specs }: Props) {
  const t = useTranslations("products");
  const tc = useTranslations("common");

  return (
    <>
      <SectionWrapper bg="dark">
        <div className="max-w-3xl">
          <Link
            href="/products"
            className="text-gray-400 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {tc("backToProducts")}
          </Link>
          <h1 className="heading-hero mb-4">{t(`${productKey}.name`)}</h1>
          <p className="text-body-lg text-gray-300">
            {t(`${productKey}.description`)}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image placeholder */}
          <div className="w-full aspect-[4/3] bg-gray-light rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Product image placeholder</span>
          </div>

          {/* Specs table */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">
              Technical Specifications
            </h2>
            <div className="space-y-0">
              {specs.map(({ key, valueKey }, i) => (
                <div
                  key={key}
                  className={`flex justify-between py-3 ${
                    i < specs.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <span className="font-medium text-gray-dark">
                    {t(`${productKey}.specs.${key}`)}
                  </span>
                  <span className="text-black font-semibold">
                    {t(`${productKey}.specs.${valueKey}`)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
              <Button onClick={scrollToContactForm} className="w-full sm:w-fit">
                {t("requestQuote")}
              </Button>
              <Button variant="outline" className="w-full sm:w-fit">
                {t("downloadDatasheet")}
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
