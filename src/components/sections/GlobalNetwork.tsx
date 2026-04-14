import Image from "next/image";
import { useTranslations } from "next-intl";

type Location = {
    flag: string;
    name: string;
    role: string;
};

export default function GlobalNetwork() {
    const t = useTranslations("about");

    let locations: Location[] = [];
    try {
        const val = t.raw("globalNetwork.locations");
        if (Array.isArray(val)) locations = val as Location[];
    } catch {
        locations = [];
    }

    const flagSvgs = [
        "/images/Header/98/united-kingdom.svg",
        "/images/Header/98/united-arab-emirates.svg",
        "/images/Header/98/india.svg",
        "/images/Header/98/kazakhstan.svg",
    ];

    return (
        <section className="bg-white pt-[80px] pb-[40px] lg:pb-[100px]">
            <div className="container mx-auto lg:px-10">
                <div className="mb-8">
                    <h2 className="font-sans text-h2 text-type-primary mb-4">
                        {t("globalNetwork.title")}
                    </h2>
                    <p className="hidden lg:block font-sans text-body text-type-secondary max-w-[640px]">
                        {t("globalNetwork.subtitle")}
                    </p>
                </div>

                {/* Location cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] md:gap-2 mb-10">
                    {locations.map((loc, idx) => (
                        <div
                            key={idx}
                            className="bg-background rounded-[6px] p-s lg:p-5"
                        >
                            <Image src={flagSvgs[idx] || flagSvgs[0]} alt={loc.name} width={45} height={28} className="mb-3" />
                            <div className="font-sans text-h3 text-type-primary mb-1">{loc.name}</div>
                            <div className="font-sans text-body text-type-secondary">{loc.role}</div>
                        </div>
                    ))}
                </div>

                {/* Map */}
                <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px]">
                    <Image src="/images/Header/98/Group 494.svg" alt="Global Network Map" fill className="object-contain" />
                </div>
            </div>
        </section>
    );
}
