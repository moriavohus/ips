import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { CornerBracket } from "@/components/ui/Icons";

const features = [
    "local",
    "compliance",
    "expertise",
    "range",
] as const;

interface WhyChooseUsProps {
    namespace?: string;
}

export default function WhyChooseUs({ namespace = "whyChooseUs" }: WhyChooseUsProps = {}) {
    const t = useTranslations(namespace);

    return (
        <SectionWrapper id="why-choose-us" bg="white">
            <div className="bg-white border-[10px] lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] p-[20px] flex flex-col items-center">
                    <div className="w-full flex flex-col md:flex-row mb-12">
                        <div className="flex-1 flex flex-col text-left">
                            {t("eyebrow") && (
                                <div className="text-caps-style text-type-secondary mb-4 md:mb-5">
                                    {t("eyebrow")}
                                </div>
                            )}
                            <h2 className="heading-h2 text-type-primary mb-4">
                                {t("title")}
                            </h2>
                            <div className="font-sans text-[16px] md:text-[19px] font-normal leading-[1.4] tracking-normal text-type-secondary max-w-[800px]">
                                {t("subtitle")}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col mb-12 md:mb-[60px]">
                        {/* Top Divider */}
                        <div className="w-full border-t border-type-secondary" />

                        {/* Grid Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr">
                            {features.map((key, index) => {
                                // Mobile: border-b on all except the last item
                                // Desktop: border-b only on the top 2 items
                                const borderClass = index < 3 ? "border-b border-type-secondary " : "";
                                const desktopBorderClass = index < 2 ? "md:border-b md:border-type-secondary" : "md:border-b-0";
                                const pyClass = "py-6 md:py-[28px]";

                                return (
                                    <div key={key} className={`relative flex items-center justify-center text-center px-[15px] md:px-16 ${borderClass} ${desktopBorderClass} ${pyClass}`}>
                                        {/* Decorative Corners */}
                                        <div className="absolute top-[15px] md:top-[28px] left-[15px] md:left-[30px] text-type-brand">
                                            <CornerBracket className="-rotate-90" />
                                        </div>
                                        <div className="absolute top-[15px] md:top-[28px] right-[15px] md:right-[30px] text-type-brand">
                                            <CornerBracket />
                                        </div>
                                        <div className="absolute bottom-[15px] md:bottom-[28px] left-[15px] md:left-[30px] text-type-brand">
                                            <CornerBracket className="rotate-180" />
                                        </div>
                                        <div className="absolute bottom-[15px] md:bottom-[28px] right-[15px] md:right-[30px] text-type-brand">
                                            <CornerBracket className="rotate-90" />
                                        </div>

                                        {/* Text Container */}
                                        <div className="font-sans text-[22px] md:text-[32px] font-bold text-type-primary leading-[1.3] tracking-[-0.5px] max-w-[420px]">
                                            {t(`features.${key}`)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom Divider */}
                        <div className="w-full border-t border-type-secondary" />
                    </div>

                    {/* Action Button */}
                    <Link
                        href="/about"
                        className="bg-type-brand hover:bg-black transition-colors text-white font-sans text-[16px] md:text-[18px] font-medium leading-[1.1] tracking-[0.02em] uppercase px-[30px] md:px-[40px] py-[16px] md:py-[20px] rounded-[14px] flex items-center justify-center gap-2 w-fit"
                    >
                        {t("button")}
                    </Link>
            </div>
        </SectionWrapper>
    );
}
