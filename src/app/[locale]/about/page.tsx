import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { en: "About — IPS Middle East", ar: "عن الشركة — IPS الشرق الأوسط", ru: "О компании — IPS Ближний Восток" };
  const desc: Record<string, string> = { en: "About IPS Middle East — leading industrial insulation manufacturer in UAE and GCC.", ar: "عن IPS الشرق الأوسط — شركة رائدة في العزل الصناعي", ru: "О компании IPS — ведущий производитель промышленной изоляции в ОАЭ" };
  return { title: titles[locale] || titles.en, description: desc[locale] || desc.en, openGraph: { title: titles[locale] || titles.en, description: desc[locale] || desc.en } };
}

import { useTranslations } from "next-intl";
import Image from "next/image";

import ContactFooterSequence from "@/components/sections/ContactFooterSequence";
import GlobalNetwork from "@/components/sections/GlobalNetwork";
import ProductsServicesSection from "@/components/sections/ProductsServicesSection";
import CertificationsBar from "@/components/sections/CertificationsBar";
// import FooterTextSection from "@/components/sections/FooterTextSection";
import PerformanceMetrics from "@/components/sections/PerformanceMetrics";
import SplitHero from "@/components/sections/SplitHero";
import FloatingDownloadButton from "@/components/ui/FloatingDownloadButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function AboutPage() {
  const t = useTranslations("about");
  const buttons = useTranslations("buttons");

  const safeRawArr = (key: string) => {
    try {
      const val = t.raw(key);
      if (Array.isArray(val)) return val;
      return [];
    } catch {
      return [];
    }
  };

  const coreValues = safeRawArr("coreValues.items") as { title: string; description: string }[];

  return (
    <main className="bg-white">
      <SplitHero
        breadcrumb={
          <Breadcrumbs
            items={[
              { label: "HOME", href: "/" },
              { label: "ABOUT US" },
            ]}
          />
        }
        title={t("title")}
        subtitle={t("subtitle")}
        ctaText={buttons("getQuote")}
        ctaHref="/contact"
        imageSrc="/images/about_hero.png"
        imageAlt="About IPS Middle East"
        imageFit="cover"
      />

      {/* PERFORMANCE METRICS */}
      <PerformanceMetrics hideHeader />

      <FloatingDownloadButton />

      {/* MISSION & VISION */}
      <section id="mission" className="bg-background py-[112px] scroll-mt-24">
        <div className="container mx-auto px-5 lg:px-10">
          <div className="flex flex-col gap-12 lg:gap-16">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
              <div className="lg:w-1/4">
                <span className="heading-h3-bold text-type-primary">{t("mission.eyebrow")}</span>
              </div>
              <div className="lg:w-3/4">
                <p className="heading-h2 text-type-primary">
                  {t("mission.text")}
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
              <div className="lg:w-1/4">
                <span className="heading-h3-bold text-type-primary">{t("vision.eyebrow")}</span>
              </div>
              <div className="lg:w-3/4">
                <p className="heading-h2 text-type-primary">
                  {t("vision.text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section id="values" className="bg-white py-[40px] scroll-mt-24">
        <div className="container mx-auto lg:px-10">
          <div>
              <h2 className="font-sans text-[32px] md:text-[46.5px] font-normal leading-[1.1] tracking-[-1.44px] text-black mb-10 lg:mb-14">
                {t("coreValues.title")}
              </h2>

              <div className="bg-background rounded-[12px] p-[4px] grid grid-cols-1 md:grid-cols-2 gap-[4px]">
                {coreValues.map((item, index) => {
                  const images = [
                    "/images/about/0e13d6fe262e56e5e72b62b1da56e484315938c6.png",
                    "/images/about/659ced20120c51b3d2f15c7e8d6013e82b0b9aee.png",
                    "/images/about/8e7c1e9534b5ceab5b8d77e6d03c19a2813ac01c.png",
                    "/images/about/e5a58f845f54a316c5b5a06e271b427e659904a7.png",
                  ];
                  const num = String(index + 1).padStart(2, "0");
                  return (
                    <div key={index} className="bg-white rounded-[8px] overflow-hidden">
                      <div className="relative w-full h-[258px] bg-background rounded-[8px] overflow-hidden">
                        <Image
                          src={images[index]}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="px-[28px] pb-[28px]">
                        <div className="mt-[28px] mb-[20px] flex w-full self-stretch flex-col items-start justify-center gap-[8px] lg:flex-row lg:items-center lg:gap-s">
                          <span className="text-h4 text-type-primary">{num}</span>
                          <h3 className="w-full text-h2-bold-mobile md:text-h2-bold text-type-primary">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-body-mobile md:text-h4 text-type-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>
        </div>
      </section>

      <ProductsServicesSection />
      <section id="network" className="scroll-mt-24">
        <GlobalNetwork />
      </section>
      <CertificationsBar />

      <ContactFooterSequence />
    </main>
  );
}
