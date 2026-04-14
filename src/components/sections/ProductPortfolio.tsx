"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useMessages } from "next-intl";
import { usePathname } from "next/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";

const productSlugs: Record<string, string> = {
    cellularGlass: "cellular-glass",
    mineralWool: "mineral-wool",
    stainlessAccessories: "stainless-accessories",
    coatings: "coatings",
};

type ProductKey = "cellularGlass" | "mineralWool" | "stainlessAccessories" | "coatings";

type PropertyRow = { prop: string; method?: string; value: string };
type SubProduct = { image: string; eyebrow: string; title: string; textHtml: string };
type ProductTypeItem = { title: string; desc: string };
type DownloadItem = { title: string; meta: string; url: string };
type ComplianceItem = { title: string; desc: string };
type PropertyTableHeader = { property: string; testMethod?: string; availability?: string; value?: string };


const productKeys: ProductKey[] = [
    "cellularGlass",
    "mineralWool",
    "stainlessAccessories",
    "coatings",
];

export default function ProductPortfolio({ initialProduct = "cellularGlass" }: { initialProduct?: ProductKey } = {}) {
    const t = useTranslations("productPortfolio");
    const messages = useMessages() as Record<string, unknown>;
    const pathname = usePathname();
    const [activeProduct, setActiveProduct] = useState<ProductKey>(initialProduct);
    const [isVisible, setIsVisible] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleProductChange = (key: ProductKey) => {
        if (key === activeProduct) return;
        setIsVisible(false);
        setTimeout(() => {
            setActiveProduct(key);
            setIsVisible(true);
        }, 250);
        const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
        const locale = localeMatch ? localeMatch[1] : "en";
        const slug = productSlugs[key];
        if (slug) {
            window.history.replaceState(null, "", `/${locale}/products/${slug}`);
        }
    };

    // Navigate nested object by dot-separated path
    const getNestedValue = (path: string): unknown => {
        const parts = path.split(".");
        let current: unknown = (messages as Record<string, unknown>)["productPortfolio"];
        for (const part of parts) {
            if (current && typeof current === "object" && !Array.isArray(current)) {
                current = (current as Record<string, unknown>)[part];
            } else {
                return undefined;
            }
        }
        return current;
    };

    // Helpers to safely get raw content - check existence first to avoid console errors
    const safeRawStr = (key: string): string | undefined => {
        const val = getNestedValue(key);
        if (typeof val === "string") return val;
        return undefined;
    };

    const safeRawArr = (key: string): unknown[] | undefined => {
        const val = getNestedValue(key);
        if (Array.isArray(val)) return val;
        return undefined;
    };

    const safeRawObj = (key: string): Record<string, unknown> | undefined => {
        const val = getNestedValue(key);
        if (val && typeof val === "object" && !Array.isArray(val)) return val as Record<string, unknown>;
        return undefined;
    };

    const pData = {
        name: t(`products.${activeProduct}.name`),
        image: safeRawStr(`products.${activeProduct}.image`),
        overviewText: safeRawStr(`products.${activeProduct}.overviewText`),
    };

    const applicationsLabel = safeRawStr(`products.${activeProduct}.applicationsLabel`) || safeRawStr("applications");
    const applicationsList = safeRawArr(`products.${activeProduct}.applicationsList`) as string[] | undefined;
    const applicationsText = safeRawStr(`products.${activeProduct}.applicationsText`) as string | undefined;

    const properties = safeRawArr(`products.${activeProduct}.properties`) as PropertyRow[] | undefined;
    const properties2 = safeRawArr(`products.${activeProduct}.properties2`) as PropertyRow[] | undefined;
    const propertyTable2 = safeRawObj(`products.${activeProduct}.propertyTable2`) as PropertyTableHeader | undefined;
    const propertyTable = safeRawObj(`propertyTable`) as PropertyTableHeader | undefined;

    const supplyFormsList = safeRawArr(`products.${activeProduct}.supplyFormsList`) as string[] | undefined;
    const supplyFormsLabel = safeRawStr(`products.${activeProduct}.supplyFormsLabel`) || safeRawStr("supplyForms");
    const supplyFormsFootnote = safeRawStr(`products.${activeProduct}.supplyFormsFootnote`) as string | undefined;

    // Coating specific
    const productTypesList = safeRawArr(`products.${activeProduct}.productTypesList`) as ProductTypeItem[] | undefined;
    const productTypesLabel = safeRawStr(`products.${activeProduct}.productTypesLabel`) as string | undefined;

    const designGuidanceList = safeRawArr(`products.${activeProduct}.designGuidanceList`) as string[] | undefined;
    const installationNotesList = safeRawArr(`products.${activeProduct}.installationNotesList`) as string[] | undefined;
    const downloadsList = safeRawArr(`products.${activeProduct}.downloadsList`) as DownloadItem[] | undefined;

    // Stainless specific
    const subProducts = safeRawArr(`products.${activeProduct}.subProducts`) as SubProduct[] | undefined;
    const featuresList = safeRawArr(`products.${activeProduct}.featuresList`) as string[] | undefined;
    const featuresLabel = safeRawStr(`products.${activeProduct}.featuresLabel`) as string | undefined;
    const complianceLabel = safeRawStr(`products.${activeProduct}.complianceLabel`) as string | undefined;
    const complianceText1 = safeRawStr(`products.${activeProduct}.complianceText1`) as string | undefined;
    const complianceText2 = safeRawStr(`products.${activeProduct}.complianceText2`) as string | undefined;
    const complianceList = safeRawArr(`products.${activeProduct}.complianceList`) as ComplianceItem[] | undefined;
    const complianceImages = safeRawArr(`products.${activeProduct}.complianceImages`) as string[] | undefined;

    return (
        <SectionWrapper>
            <div className="relative left-1/2 flex w-screen max-w-[1920px] -translate-x-1/2 flex-col gap-[14px] px-5 lg:flex-row lg:gap-[86px] lg:px-10">
                {/* Mobile - Custom Dropdown */}
                <div className="lg:hidden w-full" ref={dropdownRef}>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full bg-background rounded-[12px] px-5 py-4 pr-12 font-sans text-[16px] font-medium text-type-primary uppercase tracking-[0.02em] text-left"
                        >
                            {t(`products.${activeProduct}.name`)}
                            <svg className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform text-type-primary ${dropdownOpen ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-[12px] shadow-lg z-10 overflow-hidden">
                                {productKeys.map((key) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => {
                                            handleProductChange(key);
                                            setDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-5 py-3 font-sans text-[14px] font-medium uppercase tracking-[0.02em] transition-colors ${activeProduct === key ? "bg-type-primary text-white" : "text-type-primary hover:bg-background"}`}
                                    >
                                        {t(`products.${key}.name`)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop - Product Types List */}
                <div className="hidden lg:block lg:w-auto shrink-0">
                    <h3 className="font-sans text-h4 font-semibold text-type-primary mb-4">{t("productTypes")}</h3>
                    <div className="flex flex-col items-start gap-3">
                        {productKeys.map((key) => {
                            const isActive = activeProduct === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleProductChange(key)}
                                    className={`flex items-center gap-3 text-left w-fit p-0 font-sans text-body-bold transition-colors ${isActive ? "text-type-primary" : "text-gray-dark hover:text-type-primary"
                                        }`}
                                >
                                    {isActive ? (
                                        <Image src="/images/Checkbox:active.svg" alt="Active" width={16} height={16} />
                                    ) : (
                                        <Image src="/images/Checkbox.svg" alt="Inactive" width={16} height={16} />
                                    )}
                                    {t(`products.${key}.name`)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className={`bg-background rounded-[20px] p-m transition-all duration-300 ease-in-out lg:flex-1 lg:p-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>

                    {/* STANDARD HEADER (Image + Overview) */}
                    {pData.image && pData.overviewText && (
                        <div className="flex flex-col md:flex-row gap-[28px] mb-[90px] items-start">
                            <div className="shrink-0 w-full md:w-auto">
                                <Image
                                    src={pData.image as string}
                                    alt={pData.name}
                                    width={250}
                                    height={150}
                                    className="object-contain object-left mix-blend-multiply"
                                />
                            </div>
                            <div>
                                <span className="font-sans text-caps-mobile lg:text-caps text-type-primary uppercase mb-3 block">
                                    {t("overview")}
                                </span>
                                <h2 className="font-sans text-h2-mobile md:text-h2 text-type-primary mb-4 whitespace-pre-line">{pData.name}</h2>
                                <p className="font-sans text-body text-type-secondary whitespace-pre-line">{pData.overviewText}</p>
                            </div>
                        </div>
                    )}

                    {/* SUB-PRODUCTS LIST (e.g. Stainless Accessories) */}
                    {subProducts && subProducts.length > 0 && (
                        <div className="flex flex-col gap-12 mb-12">
                            {subProducts.map((sub: SubProduct, idx: number) => (
                                <div key={idx} className="flex flex-col md:flex-row gap-[28px] items-start">
                                    <div className="shrink-0 w-full md:w-auto">
                                        <Image
                                            src={sub.image}
                                            alt={sub.title}
                                            width={250}
                                            height={150}
                                            className="object-contain object-left mix-blend-multiply"
                                        />
                                    </div>
                                    <div>
                                        <span className="font-sans text-caps-mobile lg:text-caps text-type-primary uppercase mb-3 block">
                                            {sub.eyebrow}
                                        </span>
                                        <h2 className="font-sans text-h2-mobile md:text-h2 text-type-primary mb-4">{sub.title}</h2>
                                        <p className="font-sans text-body text-type-secondary" dangerouslySetInnerHTML={{ __html: sub.textHtml }}></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PRODUCT TYPES LIST (e.g. Coatings) */}
                    {productTypesList && productTypesList.length > 0 && (
                        <div className="mb-[70px]">
                            <h3 className="font-sans text-h4-bold text-type-primary mb-[20px]">{productTypesLabel}</h3>
                            <ul className="flex flex-col gap-3">
                                {productTypesList.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 shrink-0">
                                            <Image src="/images/checkbox:list.svg" alt="Check" width={24} height={24} />
                                        </div>
                                        <span className="font-sans text-body text-type-primary">
                                            <span className="font-semibold">{item.title}</span> {item.desc}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* APPLICATIONS */}
                    {((applicationsList && applicationsList.length > 0) || applicationsText) && (
                        <div className="mb-[70px]">
                            <h3 className="font-sans text-h4-bold text-type-primary mb-4">{applicationsLabel}</h3>
                            {applicationsList && applicationsList.length > 0 && (
                                <ul className="flex flex-col gap-3">
                                    {applicationsList.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 shrink-0">
                                                <Image src="/images/checkbox:list.svg" alt="Check" width={24} height={24} />
                                            </div>
                                            <span className="font-sans text-body text-type-primary">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {applicationsText && (
                                <p className="font-sans text-body text-type-primary">{applicationsText}</p>
                            )}
                        </div>
                    )}

                    {/* FEATURES */}
                    {featuresList && featuresList.length > 0 && (
                        <div className="mb-[70px]">
                            <h3 className="font-sans text-h4-bold text-type-primary mb-[20px]">{featuresLabel}</h3>
                            <ul className="flex flex-col gap-3">
                                {featuresList.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 shrink-0">
                                            <Image src="/images/checkbox:list.svg" alt="Check" width={24} height={24} />
                                        </div>
                                        <span className="font-sans text-body text-type-primary">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* COMPLIANCE & STANDARDS */}
                    {(complianceLabel && complianceText1) && (
                        <div className="mb-[70px]">
                            <h3 className="font-sans text-h4-bold text-type-primary mb-[20px]">{complianceLabel}</h3>
                            <p className="font-sans text-body text-type-primary mb-4">{complianceText1}</p>

                            {complianceList && complianceList.length > 0 && (
                                <ul className="list-disc pl-5 font-sans text-body text-type-primary mb-4 marker:text-black">
                                    {complianceList.map((item, idx) => (
                                        <li key={idx} className="mb-2">
                                            <strong>{item.title}</strong> {item.desc}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {complianceText2 && (
                                <p className="font-sans text-body text-type-primary mb-8">{complianceText2}</p>
                            )}

                            {complianceImages && complianceImages.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {complianceImages.map((img, idx) => (
                                        <Image key={idx} src={img} alt="Compliance" width={400} height={300} className="w-full h-auto object-contain rounded-md border border-gray-200" />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Properties Table 1 (Cellular Glass Style - 3 cols) */}
                    {properties && properties.length > 0 && propertyTable && (
                        <div className="mb-10">
                            <div className="flex w-full max-w-[975px] flex-col items-start gap-1 rounded-[var(--space-xs)] bg-[#DDD] p-1">
                                <div className="grid w-full grid-cols-3 gap-1">
                                <div className="bg-background rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-bold-mobile lg:text-caps-bold text-type-primary uppercase">{propertyTable.property}</div>
                                <div className="bg-background rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-bold-mobile lg:text-caps-bold text-type-primary uppercase">{propertyTable.testMethod}</div>
                                <div className="bg-background rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-bold-mobile lg:text-caps-bold text-type-primary uppercase">{propertyTable.value}</div>
                                {properties.map((row, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="bg-white rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-mobile lg:text-caps text-type-primary uppercase">{row.prop}</div>
                                        <div className="bg-white rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-mobile lg:text-caps text-type-primary uppercase">{row.method || "—"}</div>
                                        <div className="bg-white rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-mobile lg:text-caps text-type-primary uppercase">{row.value}</div>
                                    </React.Fragment>
                                ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Properties Table 2 (Mineral Wool Style - 2 cols) */}
                    {properties2 && properties2.length > 0 && propertyTable2 && (
                        <div className="mb-10">
                            <div className="flex w-full max-w-[975px] flex-col items-start gap-1 rounded-[var(--space-xs)] bg-[#DDD] p-1">
                                <div className="grid w-full grid-cols-[2fr_1fr] gap-1">
                                <div className="bg-background rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-bold-mobile lg:text-caps-bold text-type-primary uppercase">{propertyTable2.property}</div>
                                <div className="bg-background rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-bold-mobile lg:text-caps-bold text-type-primary uppercase">{propertyTable2.availability}</div>
                                {properties2.map((row, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="bg-white rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-mobile lg:text-caps text-type-primary uppercase">{row.prop}</div>
                                        <div className="bg-white rounded-[4px] px-3 py-3 lg:px-6 min-h-[58px] flex items-center font-sans text-caps-mobile lg:text-caps text-type-primary uppercase">{row.value ? row.value : <Image src="/images/list:done.svg" alt="✓" width={23} height={22} />}</div>
                                    </React.Fragment>
                                ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Supply Forms */}
                    {supplyFormsList && supplyFormsList.length > 0 && (
                        <div className="mb-8 mt-[60px]">
                            <h3 className="font-sans text-h4-bold text-type-primary mb-[20px]">{supplyFormsLabel as string}</h3>
                            <ul className="list-disc pl-5 font-sans text-body text-type-primary flex flex-col gap-1.5 marker:text-black mb-3">
                                {supplyFormsList.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                            {supplyFormsFootnote && (
                                <p className="font-sans text-body text-type-primary">{supplyFormsFootnote}</p>
                            )}
                        </div>
                    )}

                    {/* Design Guidance */}
                    {designGuidanceList && designGuidanceList.length > 0 && (
                        <div className="mb-8 mt-[60px]">
                            <h3 className="font-sans text-h4-bold text-type-primary mb-[20px]">{t("designGuidance")}</h3>
                            <ul className="list-disc pl-5 font-sans text-body text-type-primary flex flex-col gap-1.5 marker:text-black">
                                {designGuidanceList.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Installation Notes */}
                    {installationNotesList && installationNotesList.length > 0 && (
                        <div className="mb-10 mt-[60px]">
                            <h3 className="font-sans text-h4-bold text-type-primary mb-[20px]">{t("installationNotes")}</h3>
                            <ul className="list-disc pl-5 font-sans text-body text-type-primary flex flex-col gap-1.5 marker:text-black">
                                {installationNotesList.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Downloads */}
                    {downloadsList && downloadsList.length > 0 && (
                        <div className="mb-4 mt-[60px]">
                            <h3 className="font-sans text-h4-bold text-type-primary mb-4">{t("downloads")}</h3>
                            <div className="flex flex-col gap-2">
                                {downloadsList.map((dl, idx) => (
                                    <a
                                        key={idx}
                                        href={dl.url}
                                        className="group flex items-center justify-between gap-3 bg-white hover:bg-type-brand rounded-[8px] px-5 py-3 transition-colors w-full lg:w-fit"
                                    >
                                        <span className="font-sans text-button-mobile lg:text-button text-type-primary group-hover:text-white uppercase transition-colors">{dl.title}</span>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="font-sans text-button-mobile lg:text-button text-type-secondary group-hover:text-white/80 uppercase transition-colors">{dl.meta}</span>
                                            <Image src="/images/download.svg" alt="Download" width={20} height={20} className="hidden lg:block transition group-hover:brightness-0 group-hover:invert" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SectionWrapper>
    );
}
