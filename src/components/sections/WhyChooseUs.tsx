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
    const buttons = useTranslations("buttons");

    return (
        <SectionWrapper id="why-choose-us" bg="white">
            <div className="outside-stroke-mobile-light bg-white border-0 lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] p-s lg:p-[20px] flex flex-col items-center">
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
                                return (
                                    <div key={key} className={`flex items-stretch ${borderClass} ${desktopBorderClass}`}>
                                        <div className="flex w-full items-stretch justify-center gap-m px-m py-m md:gap-[30px] md:px-[30px] md:py-[28px]">
                                            <div className="flex shrink-0 flex-col justify-between self-stretch text-type-brand">
                                                <CornerBracket className="-rotate-90" />
                                                <CornerBracket className="rotate-180" />
                                            </div>

                                            <div className="flex flex-1 items-center justify-center text-center self-stretch">
                                                <div className="w-full max-w-[620px] font-sans text-h4-bold-mobile md:text-[32px] md:font-bold text-type-primary leading-[1.3] tracking-[-0.5px]">
                                                    {t(`features.${key}`)}
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 flex-col justify-between self-stretch text-type-brand">
                                                <CornerBracket />
                                                <CornerBracket className="rotate-90" />
                                            </div>
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
                        className="bg-type-brand hover:bg-black transition-colors text-white font-sans text-[16px] md:text-[18px] font-medium leading-[1.1] tracking-[0.02em] uppercase px-[30px] md:px-[40px] rounded-[14px] flex h-[56px] items-center justify-center gap-2 w-full md:w-fit"
                    >
                        {buttons("exploreAboutUs")}
                    </Link>
            </div>
        </SectionWrapper>
    );
}
