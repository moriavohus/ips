import { useTranslations } from "next-intl";
import { FlagUAE, FlagSaudiArabia, FlagQatar, FlagKuwait, FlagOman, FlagBahrain } from "@/components/ui/Icons";

const flagComponents = [FlagUAE, FlagSaudiArabia, FlagQatar, FlagKuwait, FlagOman, FlagBahrain];

export default function RegionalPresence() {
    const t = useTranslations("contact.regional");

    const countries = t.raw("countries") as { name: string; flag: string }[];

    return (
        <section className="overflow-hidden bg-white">
            <div className="flex w-full flex-col items-center gap-10 px-5 py-5 lg:px-10 lg:py-10">
            <div className="w-full">
                <span className="font-sans text-[16px] font-medium text-type-primary leading-[1.1] uppercase mb-4 block">
                    {t("eyebrow")}
                </span>
                <h2 className="font-sans text-[48px] font-normal leading-[48px] tracking-[-1px] text-type-primary max-w-4xl mb-6">
                    {t("title")}
                </h2>
                <p className="font-sans text-[19px] font-normal leading-[1.4] text-type-secondary max-w-[800px]">
                    {t("text")}
                </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-[6px] sm:grid-cols-3 lg:grid-cols-6">
                {countries.map((country, idx) => {
                    const FlagIcon = flagComponents[idx];
                    return (
                        <div key={idx} className="bg-background rounded-[8px] p-6 flex flex-col items-start justify-start">
                            {FlagIcon && <FlagIcon width={45} height={28} className="mb-3 rounded-[3px]" />}
                            <span className="font-sans text-[32px] font-normal leading-[1.2] tracking-[-0.01em] text-type-primary">
                                {country.name}
                            </span>
                        </div>
                    );
                })}
            </div>
            </div>
        </section>
    );
}
