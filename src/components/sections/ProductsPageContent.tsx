"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProductPortfolio from "@/components/sections/ProductPortfolio";
import PerformanceMetrics from "@/components/sections/PerformanceMetrics";
import GlobalNetwork from "@/components/sections/GlobalNetwork";
import ContactFooterSequence from "@/components/sections/ContactFooterSequence";
import Button from "@/components/ui/Button";
import { scrollToContactForm } from "@/lib/utils";

type ProductKey = "cellularGlass" | "mineralWool" | "stainlessAccessories" | "coatings";

export default function ProductsPageContent({ initialProduct }: { initialProduct?: ProductKey } = {}) {
  const t = useTranslations("productPortfolio");
  const nav = useTranslations("nav");
  const buttons = useTranslations("buttons");

  return (
    <>
      <div className="relative w-full h-[350px] md:h-[450px] -mt-[120px]">
        <Image
          src="/images/products_banner.png"
          alt="Products Banner"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-type-brand" />
      </div>

      <SectionWrapper bg="white" className="!pb-0">
        <div className="relative left-1/2 w-screen max-w-[1920px] -translate-x-1/2 px-5 lg:px-10">
          <div className="text-caps text-gray-dark mb-6 uppercase">
            <Link href="/" className="hover:text-type-primary transition-colors">{nav("home")}</Link>
            <span className="mx-2">/</span>
            <span className="text-caps-bold text-type-primary">{nav("products")}</span>
          </div>

          <h1 className="font-sans text-h1-mobile md:text-h1 text-type-primary mb-10">
            {t("title", { fallback: "IPS Insulation product portfolio" })}
          </h1>

          <Button
            variant="primary"
            onClick={scrollToContactForm}
            className="w-full sm:w-fit"
          >
            {buttons("getQuote")}
          </Button>
        </div>
      </SectionWrapper>

      <div className="pt-[135px] pb-16 bg-white">
        <ProductPortfolio initialProduct={initialProduct} />
      </div>

      <PerformanceMetrics />

      <div className="py-16 bg-white">
        <GlobalNetwork />
      </div>

      <ContactFooterSequence />
    </>
  );
}
