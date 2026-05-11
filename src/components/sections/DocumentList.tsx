"use client";

import { useTranslations } from "next-intl";
import DocumentDownloadList from "@/components/ui/DocumentDownloadList";

interface DocItem {
    title: string;
    meta: string;
    url?: string;
}

interface DocSectionProps {
    id: string;
    num: string;
    title: string;
    subtitle: string;
    points: string[];
    items: DocItem[];
    showLabel?: boolean;
    availableLabel: string;
    includesLabel: string;
}

function DocSection({ id, num, title, subtitle, points, items, showLabel, availableLabel, includesLabel }: DocSectionProps) {
    return (
        <div id={id} className="mb-16 lg:mb-20 last:mb-0 scroll-mt-28 flex w-full flex-col items-start gap-[40px] p-[20px] md:gap-16 md:p-10">
            {/* Header Content */}
            <div className="w-full">
                {showLabel && (
                    <span className="font-sans text-[16px] font-bold text-type-primary uppercase leading-[1.1] mb-10 block">
                        {availableLabel}
                    </span>
                )}

                <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-sans text-[32px] md:text-[48px] font-normal text-type-primary leading-[48px] tracking-[-1px]">{num}.</span>
                    <h2 className="font-sans text-[32px] md:text-[48px] font-normal text-type-primary leading-[48px] tracking-[-1px]">
                        {title}
                    </h2>
                </div>

                <p className="text-body-mobile md:text-body text-type-primary mb-2 max-w-[800px]">
                    {subtitle}
                </p>

                <div className="mb-5">
                    <p className="text-body-mobile md:text-body text-type-primary mb-2">{includesLabel}</p>
                    <ul className="space-y-1">
                        {points.map((pt, i) => (
                            <li key={i} className="flex items-baseline gap-3 text-body-mobile md:text-body text-type-primary">
                                <span className="block w-[5px] h-[5px] bg-black rounded-full shrink-0 relative top-[2px]"></span>
                                {pt}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Document Cards in Grey Frame */}
            <div className="w-full self-stretch">
                <DocumentDownloadList items={items} />
            </div>
        </div>
    );
}

export default function DocumentList() {
    const documents = useTranslations("documents");
    const t = useTranslations("documents.sections");

    const sections = ["datasheets", "brochures", "guidelines", "presentation"];

    return (
        <section className="overflow-hidden bg-white">
            <div className="w-full pt-[60px] pb-0">
                {sections.map((key, idx) => {
                    const section = t.raw(key);
                    return (
                        <DocSection
                            key={key}
                            id={key}
                            num={section.num}
                            title={section.title}
                            subtitle={section.subtitle}
                            points={section.points}
                            items={section.items}
                            showLabel={idx === 0}
                            availableLabel={documents("availableLabel")}
                            includesLabel={documents("includesLabel")}
                        />
                    );
                })}

                <div className="w-full flex justify-center">
                    <div className="w-full self-stretch border-t border-black-third px-[40px] py-[20px]">
                        <p className="w-full text-body-mobile md:text-body text-type-primary whitespace-pre-line">
                            {documents("footerNotice")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
