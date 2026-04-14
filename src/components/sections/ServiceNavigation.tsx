"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ArrowRight } from "@/components/ui/Icons";

export default function ServiceNavigation() {
    const ts = useTranslations("services");

    const services = [
        { key: "designCalc", label: ts("designCalc.name"), href: "/services/design-calculation" },
        { key: "materialSelection", label: ts("materialSelection.name"), href: "/services/material-selection" },
        { key: "specAssistance", label: ts("specAssistance.name"), href: "/services/specification-assistance" },
        { key: "epcSupport", label: ts("epcSupport.name"), href: "/services/epc-project-support" },
        { key: "techConsultation", label: ts("techConsultation.name"), href: "/services/technical-consultation" },
    ];

    return (
        <SectionWrapper bg="white">
            <div className="py-12 lg:py-20 border-t border-border-subtle">
                <div className="mb-12">
                    <h2 className="text-[32px] md:text-[42px] font-normal text-black leading-tight mb-4">
                        Looking for another engineering service?
                    </h2>
                    <p className="text-[16px] text-type-secondary">
                        Our full-cycle engineering support for industrial insulation systems across the GCC
                    </p>
                </div>

                <div className="flex flex-col">
                    {services.map((service, idx) => (
                        <Link
                            key={idx}
                            href={service.href}
                            className="group flex items-center justify-between py-6 border-b border-border-subtle hover:px-4 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-black font-normal opacity-30 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                                <span className="text-[20px] md:text-[28px] font-normal text-black group-hover:text-type-brand transition-colors">
                                    {service.label}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all">
                                <ArrowRight className="w-5 h-5 text-black group-hover:text-white transition-colors rotate-[-45deg]" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
