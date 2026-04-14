"use client";

import { useTranslations } from "next-intl";
import IndustryHero from "@/components/sections/IndustryHero";
import IndustryFeatures from "@/components/sections/IndustryFeatures";
import IndustryApplications from "@/components/sections/IndustryApplications";
import IndustriesMap from "@/components/sections/IndustriesMap";
import IndustriesIntro from "@/components/sections/IndustriesIntro";
import CertificationsBar from "@/components/sections/CertificationsBar";
import IndustryOutcomes from "@/components/sections/IndustryOutcomes";
import ContactFooterSequence from "@/components/sections/ContactFooterSequence";
import ProductGrid from "@/components/sections/ProductGrid";

export default function IndustryContent({ industryKey }: { industryKey: string }) {
    const t = useTranslations(`industries.${industryKey}`);

    const heroData = {
        fullName: t("fullName"),
        heroText: t("heroText"),
        heroImage: t("heroImage"),
        tags: t.raw("tags"),
    };

    const featuresData = {
        title: t("offers.title"),
        items: t.raw("offers.items")
    };

    const appsData = {
        title: t("applications.title"),
        items: t.raw("applications.items"),
        footerNote: t("footerNote")
    };

    return (
        <main className="bg-white">
            <IndustryHero data={heroData} />

            <IndustryFeatures data={featuresData} />

            <IndustryApplications data={appsData} />

            <ProductGrid />

            <IndustriesMap />

            <IndustriesIntro />

            <CertificationsBar />

            <IndustryOutcomes />

            <ContactFooterSequence ctaVariant="industry" />
        </main>
    );
}
