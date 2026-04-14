"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

interface ServiceProcessProps {
    data: {
        title: string;
        items: string[];
    };
    className?: string;
}

export default function ServiceProcess({ data, className }: ServiceProcessProps) {
    return (
        <SectionWrapper bg="white" className={className}>
            <div className="relative left-1/2 w-screen -translate-x-1/2 px-m py-12 md:px-xl lg:py-20">
                <div className="mb-12">
                    <span className="text-caps-mobile md:text-caps text-type-primary uppercase mb-4 block">ENGINEERING PROCESS</span>
                    <h2 className="text-h2-mobile md:text-h2 text-type-primary">
                        {data.title}
                    </h2>
                </div>

                <div className="bg-background rounded-[12px] p-[4px] relative flex items-start self-stretch">
                    <div className="grid grid-cols-1 gap-[4px] w-full">
                        {data.items.map((item, idx) => {
                            const isFirst = idx === 0;
                            const isLast = idx === data.items.length - 1;

                            return (
                            <div
                                key={idx}
                                className="bg-white rounded-[8px] flex items-start gap-6 px-8 py-10 relative min-h-[140px] overflow-visible"
                            >
                                {idx < data.items.length - 1 && (
                                    <div className="absolute left-[48px] top-[54px] bottom-0 w-[2px] bg-black z-[1] lg:hidden" />
                                )}
                                {idx > 0 && (
                                    <div className="absolute left-[48px] top-0 h-[24px] w-[2px] bg-black z-[1] lg:hidden" />
                                )}
                                {!isLast && (
                                    <div className="hidden lg:block absolute left-[55px] top-[86px] bottom-0 w-[2px] bg-black z-[1]" />
                                )}
                                {!isFirst && (
                                    <div className="hidden lg:block absolute left-[55px] top-0 h-[40px] w-[2px] bg-black z-[1]" />
                                )}

                                <div className="shrink-0 w-[46px] h-[46px] bg-surface-dark rounded-full flex items-center justify-center text-white font-bold text-[16px] relative z-10">
                                    {(idx + 1).toString().padStart(2, "0")}
                                </div>

                                <div className="flex flex-col gap-2 pt-1">
                                    <span className="text-h3-bold-mobile md:text-h3-bold text-type-primary">
                                        {item}
                                    </span>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
