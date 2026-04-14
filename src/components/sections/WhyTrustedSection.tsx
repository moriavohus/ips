import { useTranslations } from "next-intl";

export default function WhyTrustedSection() {
    const t = useTranslations("about");

    return (
        <section className="bg-white py-8 lg:py-12">
            <div className="container mx-auto px-m lg:px-xl">
                <h2 className="font-sans text-[32px] md:text-[44px] leading-[48px] tracking-[-1.44px] font-normal text-type-primary mb-4">
                    {t("whyTrusted.title")}
                </h2>
                <p className="font-sans text-[16px] font-normal leading-[1.45] text-type-secondary max-w-[700px]">
                    {t("whyTrusted.subtitle")}
                </p>
            </div>
        </section>
    );
}
