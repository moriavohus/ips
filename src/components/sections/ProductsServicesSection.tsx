import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "@/components/ui/Icons";

export default function ProductsServicesSection() {
    const t = useTranslations("about");

    let products: string[] = [];
    let services: string[] = [];
    try {
        const p = t.raw("productsServices.products");
        if (Array.isArray(p)) products = p as string[];
    } catch {
        products = [];
    }
    try {
        const s = t.raw("productsServices.services");
        if (Array.isArray(s)) services = s as string[];
    } catch {
        services = [];
    }

    const productLinks = [
        "/products/cellular-glass",
        "/products/mineral-wool",
        "/products/stainless-accessories",
        "/products/coatings",
    ];

    const serviceLinks = [
        "/services#design",
        "/services#material",
        "/services#specification",
        "/services#epc",
        "/services#consultation",
    ];

    return (
        <section className="bg-white py-[20px]">
            <div className="w-full px-5 lg:px-10">
                <div className="w-full">
                    <h2 className="font-sans text-[48px] font-normal leading-[48px] tracking-[-1px] text-type-primary mt-[80px] mb-[40px]">
                        {t("whyTrusted.title")}
                    </h2>

                    <div className="bg-background rounded-[16px] p-[4px] flex flex-col md:flex-row gap-[4px]">
                        {/* Products card */}
                        <div className="flex w-full flex-col rounded-[12px] bg-white p-[14px] md:w-1/2 md:p-l">
                            <h3 className="font-sans text-[48px] font-normal leading-[48px] tracking-[-1px] text-type-primary mb-4">
                                {t("productsServices.productsTitle")}
                            </h3>
                            <p className="text-body-mobile md:text-body text-type-secondary">
                                {t("productsServices.productsSubtitle")}
                            </p>
                            <div className="mt-auto flex flex-col gap-2 pt-10">
                                {products.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={productLinks[idx] || "/products"}
                                        className="flex w-full max-h-[56px] items-center justify-between rounded-[8px] bg-background p-[20px] text-button-style text-type-primary transition-colors hover:bg-border-subtle"
                                    >
                                        <span>{item}</span>
                                        <ChevronRight className="h-[10px] w-[6px] shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Services card */}
                        <div className="flex w-full flex-col rounded-[12px] bg-white p-[14px] md:w-1/2 md:p-l">
                            <h3 className="font-sans text-[48px] font-normal leading-[48px] tracking-[-1px] text-type-primary mb-4">
                                {t("productsServices.servicesTitle")}
                            </h3>
                            <p className="text-body-mobile md:text-body text-type-secondary">
                                {t("productsServices.servicesSubtitle")}
                            </p>
                            <div className="mt-auto flex flex-col gap-2 pt-10">
                                {services.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={serviceLinks[idx] || "/services"}
                                        className="flex w-full max-h-[56px] items-center justify-between rounded-[8px] bg-background p-[20px] text-button-style text-type-primary transition-colors hover:bg-border-subtle"
                                    >
                                        <span>{item}</span>
                                        <ChevronRight className="h-[10px] w-[6px] shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
