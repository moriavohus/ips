"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { scrollToContactForm } from "@/lib/utils";

export default function DocumentsHero() {
    const t = useTranslations("documents");
    const breadcrumbParts = t("breadcrumb").split(">").map((part) => part.trim()).filter(Boolean);

    return (
            <section className="bg-white pt-[10px] pb-[32.5px] lg:pb-[40px] min-h-[70vh] flex items-center">
                <div className="container mx-auto">
                    {/* Grey Frame around Hero */}
                    <div className="bg-white border-[10px] lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] relative min-h-[calc(70vh-16px)] overflow-visible flex flex-col lg:grid lg:grid-cols-12">

                        {/* Left Content Column */}
                        <div className="lg:col-span-6 p-[20px] flex flex-col relative z-10 w-full rounded-t-[24px] lg:rounded-l-[24px] lg:rounded-tr-none bg-white">
                            <div className="mb-6">
                                <Breadcrumbs
                                    items={breadcrumbParts.map((label, index) => ({
                                        label,
                                        href: index === 0 ? "/" : undefined,
                                    }))}
                                />
                            </div>

                            <div className="flex-1">
                                <h1 className="font-sans text-[36px] md:text-[46px] xl:text-[58px] font-normal leading-[1] tracking-[-0.02em] text-type-primary max-w-[580px] mb-6 lg:mb-8">
                                    {t("title")}
                                </h1>
                            </div>

                            <div>
                                <Button
                                    variant="primary"
                                    onClick={scrollToContactForm}
                                    className="w-full sm:w-fit"
                                >
                                    {t("cta")}
                                </Button>
                            </div>
                        </div>

                        {/* Right Image Column */}
                        <div className="lg:col-span-6 relative h-[400px] lg:h-auto min-h-full">
                            <div className="absolute inset-[20px] overflow-hidden rounded-[14px]">
                                <Image
                                    src="/images/DOCUMENTS/Portfolio%20Header/12.png"
                                    alt="Technical blueprint"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
    );
}
