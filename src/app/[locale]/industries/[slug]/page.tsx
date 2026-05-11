import { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import IndustryContent from "./IndustryContent";

const SLUG_TO_KEY: Record<string, string> = {
    "oil-gas": "oilGas",
    "industrial-construction": "industrial",
    "lng-cryogenic": "lng",
    "power-generation": "power",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;

    return {
        alternates: localizedAlternates(locale, `/industries/${slug}`),
    };
}

interface Props {
    params: {
        locale: string;
        slug: string;
    };
}

export default function IndustryPage({ params }: Props) {
    const industryKey = SLUG_TO_KEY[params.slug];

    if (!industryKey) return <div>Industry not found</div>;

    return (
        <IndustryContent industryKey={industryKey} />
    );
}
