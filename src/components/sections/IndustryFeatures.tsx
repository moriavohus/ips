import PerformanceMetrics from "@/components/sections/PerformanceMetrics";

interface Feature {
    title: string;
    icon: string;
}

interface IndustryFeaturesProps {
    data: {
        title: string;
        items: Feature[];
    };
}

const IconMap: Record<string, string> = {
    drop: "/images/resistance.svg",
    shield: "/images/protection.svg",
    fire: "/images/non-combustibility.svg",
    clock: "/images/long-service.svg",
    lock: "/images/water_lock.svg",
    ruler: "/images/ruler.svg",
    rule: "/images/rule.svg",
    snowflake: "/images/snowg.svg",
    whatshot: "/images/whatshot.svg",
};

export default function IndustryFeatures({ data }: IndustryFeaturesProps) {
    return (
        <PerformanceMetrics
            customTitle={data.title}
            customItems={data.items.map((item) => ({
                title: item.title,
                icon: IconMap[item.icon] || IconMap.drop,
            }))}
        />
    );
}
