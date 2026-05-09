import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ChevronRight } from "@/components/ui/Icons";

const services = [
  { key: "designCalc", href: "/services/design-calculation" },
  { key: "materialSelection", href: "/services/material-selection" },
  { key: "specAssistance", href: "/services/specification-assistance" },
  { key: "epcSupport", href: "/services/epc-project-support" },
  { key: "techConsultation", href: "/services/technical-consultation" },
] as const;

export default function ServicesBlock() {
  const t = useTranslations("services");
  const buttons = useTranslations("buttons");

  return (
    <SectionWrapper id="services" bg="white">
      <div className="outside-stroke-mobile-light bg-white border-0 lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] p-s lg:p-[20px] relative flex flex-col">
          {t("eyebrow") && (
            <div className="text-caps-style text-type-primary mb-4">
              {t("eyebrow")}
            </div>
          )}
          <h2 className="heading-h2 text-type-primary mb-5 max-w-[900px]">
            {t("title")}
          </h2>
          <p className="font-sans text-body font-normal leading-[1.4] text-type-secondary mb-8 md:mb-12 max-w-[800px]">
            {t("subtitle")}
          </p>

          <div className="flex flex-col w-full border-t border-type-secondary">
            {services.map(({ key, href }, index) => {
              const numberStr = `0${index + 1}`;
              return (
                <Link
                  key={key}
                  href={href}
                  className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center w-full py-7 border-b border-type-secondary group"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-[14px] md:flex-[1_0_0] min-w-0">
                    <span className="font-sans text-[18px] md:text-[20px] font-normal leading-[22px] md:leading-[1] tracking-normal text-type-brand md:text-type-secondary md:group-hover:text-type-brand transition-colors md:shrink-0">
                      {numberStr}
                    </span>
                    <h3 className="font-sans text-[28px] md:text-[46.5px] font-semibold leading-[1.1] md:leading-[48px] tracking-[-0.02em] md:tracking-[-1.44px] text-type-brand md:text-type-secondary md:group-hover:text-type-brand transition-colors min-w-0">
                      {t(`${key}.name`)}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-type-brand md:shrink-0">
                    <span className="font-sans text-caps-bold tracking-[0.05em] uppercase">{buttons("explore")}</span>
                    <ChevronRight />
                  </div>
                </Link>
              );
            })}
          </div>
      </div>
    </SectionWrapper>
  );
}
