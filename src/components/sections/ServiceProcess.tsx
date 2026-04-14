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
    const desktopGridClass = data.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

    return (
        <SectionWrapper bg="white" className={className}>
            <div className="relative left-1/2 w-screen -translate-x-1/2 px-m py-12 md:px-xl lg:py-20">
                <div className="mb-12">
                    <span className="text-caps-mobile md:text-caps text-type-primary uppercase mb-4 block">ENGINEERING PROCESS</span>
                    <h2 className="text-h2-mobile md:text-h2 text-type-primary">
                        {data.title}
                    </h2>
                </div>

                <div className="bg-background rounded-[12px] p-1 relative flex items-start self-stretch">
                    <div className={`grid grid-cols-1 ${desktopGridClass} gap-1 w-full`}>
                        {data.items.map((item, idx) => {
                            const isFirst = idx === 0;
                            const isLast = idx === data.items.length - 1;
                            const topClass = isFirst
                                ? "pt-7 pl-7 pr-0 pb-0 justify-center items-center"
                                : isLast
                                    ? "pt-7 px-0 pb-0 items-center"
                                    : "pt-7 px-0 pb-0 justify-center items-center";
                            const bottomClass = isFirst
                                ? "p-7 flex-col items-start gap-[13px]"
                                : "p-7 flex-col justify-center items-start gap-[22px]";

                            return (
                            <div
                                key={idx}
                                className="bg-white rounded-[8px] flex flex-col items-start gap-2 flex-1 self-stretch relative min-h-[212px] overflow-visible"
                                style={{ backdropFilter: "blur(5.15px)" }}
                            >
                                {/* Mobile: vertical line from bottom of circle to bottom of card + through gap */}
                                {idx < data.items.length - 1 && (
                                    <div className="absolute left-[48px] top-[54px] bottom-0 w-[2px] bg-black z-[1] lg:hidden" />
                                )}
                                {/* Mobile: vertical line from top of card to top of circle */}
                                {idx > 0 && (
                                    <div className="absolute left-[48px] top-0 h-[24px] w-[2px] bg-black z-[1] lg:hidden" />
                                )}
                                {/* Circle box */}
                                <div className={`flex self-stretch relative z-[2] ${topClass}`}>
                                    {!isFirst && (
                                        <div className="hidden lg:block w-7 h-px bg-black shrink-0" />
                                    )}
                                    <div className="w-[48px] h-[48px] rounded-full bg-black text-white flex items-center justify-center text-h4-mobile md:text-h4 shrink-0 relative z-[2]">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </div>
                                    {!isLast && (
                                        <div className="hidden lg:block flex-1 h-px bg-black relative z-[1]" />
                                    )}
                                </div>
                                {/* Text box */}
                                <div className={`flex self-stretch ${bottomClass}`}>
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
