"use client";

import {
    CalcIcon, TempIcon, MoistureIcon, StructIcon, DocIcon, CheckIcon,
    TargetIcon, NetworkIcon, PersonIcon, SnowflakeIcon, GearIcon,
    CaretIcon, GridIcon, WrenchIcon, ArrowDiagIcon, MonitorIcon,
    ToolsIcon, ClipboardIcon, ChartIcon, PipesIcon,
} from "@/components/ui/Icons";
import { SVGProps } from "react";

interface DeliverableItem {
    title: string;
    icon: string;
}

interface ServiceDeliverablesProps {
    data: {
        title: string;
        items: DeliverableItem[];
    };
}

const IconMap: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
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

export default function ServiceDeliverables({ data }: ServiceDeliverablesProps) {
    const cols = data.items.length <= 5 ? data.items.length : 3;
    const lgBasis = `calc(${100 / cols}% - ${(6 * (cols - 1)) / cols}px)`;

    return (
        <div className="container mx-auto px-m py-8 mb-20 lg:mb-32 lg:px-xl">
            <div className="outside-stroke-mobile-light bg-white border-0 lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] p-s lg:p-[20px]">
                <div className="mb-20">
                    <span className="text-caps-mobile md:text-caps text-type-secondary uppercase mb-4 block">RESULTS</span>
                    <h2 className="text-h2-mobile md:text-h2 text-type-primary">
                        {data.title}
                    </h2>
                </div>

                <div className="flex flex-wrap gap-[6px]">
                    {data.items.map((item, idx) => {
                        const Icon = IconMap[item.icon] || IconMap.doc;
                        return (
                            <div
                                key={idx}
                                className="bg-background rounded-[16px] p-s pt-s pb-10 lg:p-6 lg:pt-6 flex flex-col items-start gap-8 min-h-[200px] basis-full md:basis-[calc(33.333%-4px)] lg:basis-[var(--lg-basis)] grow"
                                style={{ ["--lg-basis" as string]: lgBasis }}
                            >
                                <div className="text-type-brand">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <span className="text-h3-mobile md:text-h3 text-type-brand">
                                    {item.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
