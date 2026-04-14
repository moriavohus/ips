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
        <section className="relative h-[80svh] min-h-[80svh] w-full flex items-end overflow-hidden -mt-[112px]">
            {/* Background with Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={data.heroImage}
                    alt={data.fullName}
                    fill
                    className="object-cover object-center"
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

            <div className="container mx-auto relative z-10 px-5 pt-[160px] pb-xl lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">

                    <div className="lg:col-span-8 flex min-h-[180px] flex-col lg:min-h-[180px]">
                        {/* Breadcrumb */}
                        <div className="mb-6">
                            <Breadcrumbs
                                items={[
                                    { label: "HOME", href: "/" },
                                    { label: data.fullName.toUpperCase() },
                                ]}
                                variant="inverse"
                            />
                        </div>

                        {/* Title */}
                        <h1 className="font-sans text-[40px] md:text-[58px] font-normal leading-[1] tracking-[-0.02em] text-white mb-10">
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

                    <div className="lg:col-span-4 flex flex-1 flex-col items-start justify-between self-stretch">
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
