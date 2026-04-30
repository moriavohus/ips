"use client";

import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { MessageIcon, PhoneIcon, PlaceIcon } from "@/components/ui/Icons";

interface ContactUsBlockProps {
    variant?: "light" | "dark";
}

export default function ContactUsBlock({ variant = "dark" }: ContactUsBlockProps) {
    const t = useTranslations("contactUsBlock");
    const isDark = variant === "dark";

    const borderColor = isDark ? "border-black" : "border-background";
    const innerStyle = isDark ? "bg-surface-dark" : "bg-white";
    const titleStyle = isDark ? "text-white" : "text-black";
    const subtitleStyle = isDark ? "text-type-third" : "text-type-secondary";
    const cardLabelStyle = isDark ? "text-white" : "text-type-primary";
    const iconColor = isDark ? "text-white" : "text-black-secondary";

    return (
        <SectionWrapper id="contact-us-details" bg="white">
            <div className={`${innerStyle} outside-stroke-mobile-light border-0 lg:border-[20px] ${borderColor} rounded-[24px] lg:rounded-[44px] p-s lg:p-[20px] flex flex-col items-start w-full`}>
                    {/* Header */}
                    <div className="mb-10 lg:mb-14">
                        <h2 className={`font-sans text-[32px] md:text-[46.5px] font-normal leading-[1.1] tracking-[-1.44px] ${titleStyle} mb-2 md:mb-4`}>
                            {t("title")}
                        </h2>
                        <div className={`font-sans text-[16px] font-normal leading-[20px] tracking-wide ${subtitleStyle}`}>
                            {t("subtitle")}
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="flex flex-col md:flex-row justify-center items-start gap-1 self-stretch w-full">
                        {/* Email */}
                        <div className="bg-background rounded-[4px] flex flex-col items-start gap-5 self-stretch p-s md:flex-[1_0_0]">
                            <MessageIcon className={`w-5 h-5 ${iconColor}`} aria-label="Email" />
                            <a href={`mailto:${t("email")}`} className={`min-w-0 break-all font-sans text-[22px] font-bold leading-[26px] ${cardLabelStyle} hover:text-type-brand transition-colors`}>
                                {t("email")}
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="bg-background rounded-[4px] flex flex-col items-start gap-5 self-stretch p-s md:flex-[1_0_0]">
                            <PhoneIcon className={`w-5 h-5 ${iconColor}`} aria-label="Phone" />
                            <a href={`tel:${t("phone").replace(/\s/g, "")}`} className={`font-sans text-[22px] font-bold leading-[26px] ${cardLabelStyle} hover:text-type-brand transition-colors`}>
                                {t("phone")}
                            </a>
                        </div>

                        {/* Address */}
                        <div className="bg-background rounded-[4px] flex flex-col items-start gap-5 self-stretch p-s md:flex-[1_0_0]">
                            <PlaceIcon className={`w-5 h-5 ${iconColor}`} aria-label="Address" />
                            <div className={`font-sans text-[22px] font-bold leading-[26px] ${cardLabelStyle}`}>
                                {t("address")}
                            </div>
                        </div>
                    </div>
            </div>
        </SectionWrapper>
    );
}
