"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface ServiceScopeProps {
    data: {
        title: string;
        description: string;
        items: string[];
    };
    className?: string;
}

export default function ServiceScope({ data, className }: ServiceScopeProps) {
    return (
        <SectionWrapper bg="white" className={className}>
            <div className="relative left-1/2 flex w-screen -translate-x-1/2 flex-col items-start gap-12 px-m py-12 md:px-xl lg:flex-row lg:items-start lg:gap-20 lg:py-20">
                {/* Left: Titles */}
                <div className="flex w-full flex-1 basis-0 flex-col items-start gap-m">
                    <span className="text-caps-mobile md:text-caps text-type-primary uppercase">SCOPE OF WORK</span>
                    <h2 className="text-h2-mobile md:text-h2 text-type-primary">
                        {data.title}
                    </h2>
                    <p className="text-body-mobile md:text-body text-type-secondary max-w-[640px]">
                        {data.description}
                    </p>
                </div>

                {/* Right: Grid of Checkmarks */}
                <div className="flex w-full flex-1 basis-0 flex-col items-start gap-7">
                    <ul className="grid w-full grid-cols-1 gap-y-8 gap-x-12 md:grid-cols-2">
                        {data.items.map((item, idx) => (
                            <li key={idx} className="flex w-full flex-col gap-[14px]">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                    <Image src="/images/list:done.svg" alt="Done" width={14} height={14} className="brightness-0 invert" />
                                </div>
                                <span className="text-h4-bold-mobile md:text-h4-bold text-black">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
}
