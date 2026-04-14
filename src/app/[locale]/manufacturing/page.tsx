import { useTranslations } from "next-intl";
import ContactFooterSequence from "@/components/sections/ContactFooterSequence";
import FooterTextSection from "@/components/sections/FooterTextSection";
import ProductGrid from "@/components/sections/ProductGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SplitHero from "@/components/sections/SplitHero";
import FloatingDownloadButton from "@/components/ui/FloatingDownloadButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ManufacturingPage() {
    const t = useTranslations("manufacturing");
    const nav = useTranslations("nav");

    type StepOption = { num: string; title: string; text: string };
    type SpecItem = { left: string; right: string };

    // Re-use safe handlers for arrays from previous
    const safeRawArr = (key: string) => {
        try {
            const val = t.raw(key);
            if (Array.isArray(val)) return val;
            return [];
        } catch {
            return [];
        }
    };

    const steps = safeRawArr("process.steps") as StepOption[];
    const specItems = safeRawArr("specs.items") as SpecItem[];

    return (
        <main className="bg-white">
            <SplitHero
                breadcrumb={
                    <Breadcrumbs
                        items={[
                            { label: nav("home"), href: "/" },
                            { label: nav("manufacturing") || "MANUFACTURING" },
                        ]}
                    />
                }
                title={t("hero.title")}
                subtitle={t("hero.subtitle")}
                ctaText={t("hero.cta")}
                ctaHref="/products"
                imageSrc="/images/DOCUMENTS/Portfolio Header/12.png"
                imageAlt="Manufacturing Hub"
                imageFit="contain"
            />

            <section className="bg-white py-[20px] overflow-visible">
                <div className="container mx-auto flex flex-col gap-12 px-5 lg:flex-row lg:gap-20 lg:px-10 relative">
                    {/* Left column — text */}
                    <div className="lg:w-[38%] lg:sticky lg:top-32 lg:self-start">
                        <span className="text-caps-mobile md:text-caps text-type-primary uppercase mb-6 block">{t("process.eyebrow")}</span>
                        <h2 className="text-h2-mobile md:text-h2 text-type-primary mb-8 whitespace-pre-line">
                            {t("process.title")}
                        </h2>
                        <div className="flex flex-col gap-6 text-type-secondary text-body-mobile md:text-body pr-6">
                            <p>{t("process.desc1")}</p>
                            <p>{t("process.desc2")}</p>
                        </div>
                    </div>

                    {/* Right column — steps on grey background, extending to right edge */}
                    <div className="lg:w-[62%] relative">
                            {/* Grey container with thin border effect */}
                        <div className="bg-background rounded-[12px] p-[4px] flex flex-col gap-[4px]">
                            {steps.map((step, idx) => {
                                const isFirst = idx === 0;
                                const isLast = idx === steps.length - 1;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white px-8 py-10 flex items-start gap-6 relative min-h-[140px] rounded-[8px]"
                                    >
                                        {/* Line going DOWN from this circle (not on last card) */}
                                        {!isLast && (
                                            <div
                                                className="absolute w-[2px] bg-surface-dark"
                                                style={{
                                                    left: "calc(2rem + 22px)",
                                                    top: "calc(2.5rem + 46px)",
                                                    bottom: "0px"
                                                }}
                                            ></div>
                                        )}
                                        {/* Line going UP into this circle (not on first card) */}
                                        {!isFirst && (
                                            <div
                                                className="absolute w-[2px] bg-surface-dark"
                                                style={{
                                                    left: "calc(2rem + 22px)",
                                                    top: "0px",
                                                    height: "2.5rem"
                                                }}
                                            ></div>
                                        )}

                                        {/* Circle with number */}
                                        <div className="shrink-0 w-[46px] h-[46px] bg-surface-dark rounded-full flex items-center justify-center text-white font-bold text-[16px] relative z-10">
                                            {step.num}
                                        </div>
                                        {/* Content */}
                                        <div className="flex flex-col gap-2 pt-1">
                                            <h3 className="text-h3-bold-mobile md:text-h3-bold text-type-primary">{step.title}</h3>
                                            <p className="text-body-mobile md:text-body text-type-secondary">{step.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* SCOPE / PRODUCTS SECTION */}
            <ProductGrid />

            {/* SPECS SECTION */}
            <section className="bg-white py-[20px]">
                <div className="container mx-auto lg:px-10">
                    {/* Title — outside the frame */}
                        <h2 className="text-h2-mobile md:text-h2 text-type-primary mb-8">
                            {t("specs.title")}
                        </h2>

                    {/* Grey background with two white cards on top */}
                    <div className="bg-background rounded-[10px] p-[4px] flex flex-col md:flex-row gap-[4px]">
                        {/* Left card — Specifications */}
                        <div className="w-full md:w-1/2 bg-white rounded-[6px] p-[14px]">
                            <h3 className="text-h2-mobile md:text-h2 text-type-primary mb-[40px]">
                                {t("specs.col1")}
                            </h3>
                            <div className="flex flex-col gap-5">
                                {specItems.map((item, idx) => (
                                    <div key={`left-${idx}`} className="text-button-style text-black">
                                        {item.left}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right card — How we achieve it */}
                        <div className="w-full md:w-1/2 bg-white rounded-[6px] p-[14px]">
                            <h3 className="text-h2-mobile md:text-h2 text-type-primary mb-[40px]">
                                {t("specs.col2")}
                            </h3>
                            <div className="flex flex-col gap-5">
                                {specItems.map((item, idx) => (
                                    <div key={`right-${idx}`} className="text-button-style text-black">
                                        {item.right}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <WhyChooseUs namespace="manufacturing.whyChoose" />

            <FooterTextSection text={t("footerText")} />

            <ContactFooterSequence />

            <FloatingDownloadButton />
        </main>
    );
}
