"use client";

import { useTranslations } from "next-intl";
import ServiceHero from "@/components/sections/ServiceHero";
import ServiceScope from "@/components/sections/ServiceScope";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServicesBlock from "@/components/sections/ServicesBlock";
import CertificationsBar from "@/components/sections/CertificationsBar";
import PerformanceMetrics from "@/components/sections/PerformanceMetrics";
import ContactFooterSequence from "@/components/sections/ContactFooterSequence";
import FooterTextSection from "@/components/sections/FooterTextSection";
import {
    CalcIcon, TempIcon, MoistureIcon, StructIcon, DocIcon, CheckIcon,
    TargetIcon, NetworkIcon, PersonIcon, SnowflakeIcon, GearIcon,
    CaretIcon, GridIcon, WrenchIcon, ArrowDiagIcon, MonitorIcon,
    ToolsIcon, ClipboardIcon, ChartIcon, PipesIcon,
} from "@/components/ui/Icons";
import { ComponentType, SVGProps } from "react";

export default function ServiceContent({ serviceKey, slug }: { serviceKey: string; slug: string }) {
    const t = useTranslations(`services.${serviceKey}`);

    const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
        calc: CalcIcon,
        temp: TempIcon,
        moisture: MoistureIcon,
        struct: StructIcon,
        doc: DocIcon,
        done: CheckIcon,
        target: TargetIcon,
        network: NetworkIcon,
        person: PersonIcon,
        snowflake: SnowflakeIcon,
        gear: GearIcon,
        caret: CaretIcon,
        grid: GridIcon,
        wrench: WrenchIcon,
        arrow: ArrowDiagIcon,
        monitor: MonitorIcon,
        tools: ToolsIcon,
        clipboard: ClipboardIcon,
        chart: ChartIcon,
        pipes: PipesIcon,
    };

    const showAiCard = slug === "design-calculation";

    const heroData = {
        fullName: t("fullName"),
        description: t("description"),
        heroImage: t("heroImage"),
        aiBadge: showAiCard ? t("aiBadge") : "",
        aiText: showAiCard ? t("aiText") : "",
    };

    const scopeData = {
        title: t("scope.title"),
        description: t("scope.description"),
        items: t.raw("scope.items")
    };

    const processData = {
        title: t("process.title"),
        items: t.raw("process.items")
    };

    const deliverablesData = {
        title: t("deliverables.title"),
        items: t.raw("deliverables.items")
    };

    const deliverablesMetrics = deliverablesData.items.map((item: { title: string; icon: string }) => ({
        title: item.title,
        Icon: iconMap[item.icon] || DocIcon,
    }));

    return (
        <main className="bg-white">
            <ServiceHero data={heroData} />

            <ServiceScope data={scopeData} className="pb-0" />

            <ServiceProcess data={processData} className="pt-0" />

            <PerformanceMetrics
                customEyebrow="RESULTS"
                customTitle={deliverablesData.title}
                customItems={deliverablesMetrics}
            />

            <CertificationsBar />

            <ServicesBlock />

            <PerformanceMetrics />

            <ContactFooterSequence />

            <FooterTextSection
                text="Your trusted partner in insulation manufacturing and engineering — delivering certified performance, precision, and reliability across the GCC."
                variant="dark"
            />
        </main>
    );
}
