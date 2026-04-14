"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { scrollToContactForm } from "@/lib/utils";

interface IndustryHeroProps {
    data: {
        fullName: string;
        heroText: string;
        heroImage: string;
        tags: string[];
    };
}

export default function IndustryHero({ data }: IndustryHeroProps) {
    return (
        <section className="relative h-[80vh] min-h-[80vh] w-full flex items-end overflow-hidden -mt-[112px] lg:h-[80svh] lg:min-h-[80svh]">
            {/* Background with Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={data.heroImage}
                    alt={data.fullName}
                    fill
                    className="object-cover object-top md:object-center"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 26.24%, rgba(255, 255, 255, 0.00) 41.78%)",
                    }}
                />
            </div>

            <div className="container mx-auto relative z-10 px-5 pt-[148px] pb-xl lg:px-10">
                <div className="grid grid-cols-1 items-end gap-0 lg:grid-cols-12 lg:gap-10">

                    <div className="flex flex-col gap-s pb-m lg:col-span-8 lg:min-h-[180px] lg:gap-0 lg:pb-0">
                        {/* Breadcrumb */}
                        <div className="mb-0">
                            <Breadcrumbs
                                items={[
                                    { label: "HOME", href: "/" },
                                    { label: data.fullName.toUpperCase() },
                                ]}
                                variant="inverse"
                            />
                        </div>

                        {/* Title */}
                        <h1 className="font-sans text-h2-mobile md:text-[58px] font-normal leading-[1] tracking-[-0.02em] text-white mb-0">
                            {data.fullName.split("/").map((part, i, arr) => (
                                <span key={i}>
                                    {part.trimEnd()}
                                    {i < arr.length - 1 && (
                                        <>
                                            /<br />
                                        </>
                                    )}
                                </span>
                            ))}
                        </h1>

                    </div>

                    <div className="flex flex-1 flex-col items-start gap-m self-stretch lg:col-span-4 lg:gap-[40px] lg:justify-between">
                        <p className="font-sans text-[19px] text-white font-normal leading-[1.4] max-w-[600px] opacity-90">
                            {data.heroText}
                        </p>

                        <Button
                            variant="white"
                            onClick={scrollToContactForm}
                            className="text-type-brand shadow-2xl w-full sm:w-fit"
                        >
                            Get a quote
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}
