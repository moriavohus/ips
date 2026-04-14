import ServiceContent from "./ServiceContent";

const SLUG_TO_KEY: Record<string, string> = {
    "design-calculation": "designCalc",
    "material-selection": "materialSelection",
    "specification-assistance": "specAssistance",
    "epc-project-support": "epcSupport",
    "technical-consultation": "techConsultation",
};

interface Props {
    params: {
        locale: string;
        slug: string;
    };
}

export default function ServicePage({ params }: Props) {
    const serviceKey = SLUG_TO_KEY[params.slug];

    if (!serviceKey) return <div>Service not found</div>;

    return (
        <ServiceContent serviceKey={serviceKey} slug={params.slug} />
    );
}
