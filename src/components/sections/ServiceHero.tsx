"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { scrollToContactForm } from "@/lib/utils";

interface ServiceHeroProps {
    data: {
        fullName: string;
        description: string;
        heroImage: string;
        aiBadge: string;
        aiText: string;
    };
}

export default function ServiceHero({ data }: ServiceHeroProps) {
    return (
        <section className="bg-white">
            {/* Top Banner Image */}
            <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] -mt-[120px]">
                <Image
                    src={data.heroImage}
                    alt="Technical drawing"
                    fill
                    className="object-cover object-bottom"
                    priority
                />
                {/* Red line at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[12px] bg-type-brand" />
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-m py-12 lg:px-10 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                    {/* Left Content */}
                    <div className="lg:w-2/3 flex flex-col">
                        <div className="mb-6">
                            <Breadcrumbs
                                items={[
                                    { label: "HOME", href: "/" },
                                    { label: data.fullName.toUpperCase() },
                                ]}
                            />
                        </div>

                        <h1 className="text-h1-mobile md:text-h1 text-type-primary mb-6">
                            {data.fullName}
                        </h1>

                        <p className="text-body-mobile md:text-body text-type-secondary mb-8 max-w-[720px]">
                            {data.description}
                        </p>

                        <Button
                            variant="primary"
                            onClick={scrollToContactForm}
                            className="w-full sm:w-fit"
                        >
                            Get a quote
                        </Button>
                    </div>

                    {/* Right Column - AI Card */}
                    {data.aiBadge && data.aiText && (
                        <div className="w-full lg:w-[350px] shrink-0">
                            <div
                                className="rounded-[12px] border border-[var(--Text-Dark-Secondary)] bg-background flex flex-col"
                                style={{ padding: "16px", gap: "16px" }}
                            >
                                {/* White badge */}
                                <div
                                    className="bg-white flex items-center w-fit"
                                    style={{
                                        height: "42px",
                                        borderRadius: "4px",
                                        border: "1px solid var(--White)",
                                        padding: "8px 12px",
                                        gap: "8px",
                                    }}
                                >
                                    <Image src="/images/magic.svg" alt="" width={20} height={20} className="shrink-0" />
                                    <span
                                        className="font-bold uppercase"
                                        style={{ color: "var(--Brand)", fontSize: "14px", letterSpacing: "0.08em" }}
                                    >
                                        {data.aiBadge}
                                    </span>
                                </div>

                                {/* Description */}
                                <p style={{ fontSize: "19px", lineHeight: "140%", fontWeight: 400, color: "var(--Text-Primary)" }}>
                                    {data.aiText}
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
