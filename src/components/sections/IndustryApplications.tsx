"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface IndustryApplicationsProps {
    data: {
        title: string;
        items: string[];
        footerNote: string;
    };
}

export default function IndustryApplications({ data }: IndustryApplicationsProps) {
    return (
        <div className="bg-white">
            <SectionWrapper bg="white">
                <div className="relative left-1/2 flex w-screen -translate-x-1/2 flex-col items-start gap-12 px-m py-12 md:px-xl lg:flex-row lg:items-start lg:gap-20 lg:py-20">
                    {/* Left: Title */}
                    <div className="flex w-full flex-1 basis-0 flex-col items-start gap-m">
                        <h2 className="text-h2-mobile md:text-h2 text-type-primary">
                            {data.title}
                        </h2>
                    </div>

                    {/* Right: Grid of Checkmarks */}
                    <div className="flex w-full flex-1 basis-0 flex-col items-start gap-7">
                        <ul className="grid w-full grid-cols-1 gap-y-8 gap-x-12 md:grid-cols-2">
                            {data.items.map((item, idx) => (
                                <li key={idx} className="flex w-full max-w-[320px] items-start gap-[14px] md:max-w-none">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                                        <Image src="/images/list:done.svg" alt="Done" width={14} height={14} className="brightness-0 invert" />
                                    </div>
                                    <span className="flex-1 text-h4-bold-mobile md:text-h4-bold text-black">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SectionWrapper>

            {/* Footer Note Area - Black Block */}
            <section className="bg-surface-dark py-20 lg:py-32">
                <div className="container mx-auto px-5 lg:px-10">
                    <p className="w-full lg:w-[calc(100%-200px)] font-sans text-[32px] md:text-[48px] font-normal leading-[48px] tracking-[-1px] text-white">
                        {data.footerNote}
                    </p>
                </div>
            </section>
        </div>
    );
}
