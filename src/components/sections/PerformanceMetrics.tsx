import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { LightningIcon, UserStarIcon, PinIcon, ThermoIcon } from "@/components/ui/Icons";
import Image from "next/image";

const metrics = [
  { key: "response", valueKey: "responseValue", Icon: LightningIcon },
  { key: "experience", valueKey: "experienceValue", Icon: UserStarIcon },
  { key: "countries", valueKey: "countriesValue", Icon: PinIcon },
  { key: "range", valueKey: "rangeValue", Icon: ThermoIcon },
] as const;

type MetricItem = {
  title: string;
  icon?: string;
  Icon?: React.ComponentType;
};

interface PerformanceMetricsProps {
  hideHeader?: boolean;
  customTitle?: string;
  customItems?: MetricItem[];
}

export default function PerformanceMetrics({
  hideHeader = false,
  customTitle,
  customItems,
}: PerformanceMetricsProps) {
  const t = useTranslations("metrics");

  const resolvedItems = customItems ?? metrics.map(({ key, valueKey, Icon }) => ({
    title: `${t(valueKey)}|||${t(key)}`,
    icon: undefined,
    Icon,
  }));

  const GridContent = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[4px]">
      {resolvedItems.map((item, index) => {
        const [valueText, labelText] = customItems
          ? ["", item.title]
          : item.title.split("|||");

        return (
        <div key={`${item.title}-${index}`} className="bg-background rounded-[8px] flex flex-col min-h-[160px] md:min-h-[180px] p-6 lg:p-8 justify-between">
          <div className="text-type-brand">
            {item.icon ? (
              <div className="relative h-8 w-8">
                <Image src={item.icon} alt="" fill className="object-contain" />
              </div>
            ) : item.Icon ? (
              <item.Icon />
            ) : null}
          </div>
          <div className="flex flex-col gap-2 md:gap-3">
            {valueText ? (
              <>
                <div className="font-sans text-h3 text-type-brand">
                  {valueText}
                </div>
                <div className="font-sans text-caps text-type-brand uppercase">
                  {labelText}
                </div>
              </>
            ) : (
              <div className="font-sans text-h4-bold-mobile md:text-h4-bold text-type-brand">
                {labelText}
              </div>
            )}
          </div>
        </div>
      )})}
    </div>
  );

  // Если вызвано на странице About — отдаем без серой обертки и без заголовка
  if (hideHeader) {
    return (
      <section className="bg-white py-[20px]">
        <div className="container mx-auto relative">
          {GridContent}
        </div>
      </section>
    );
  }

  // Дефолтное поведение (Главная страница) — с серой оберткой и заголовком
  return (
    <SectionWrapper id="metrics" bg="white">
      <div className="bg-white border-[10px] lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] p-[20px] flex flex-col">
          <div className="flex flex-col mb-16 md:mb-[80px]">
            {t("eyebrow") && (
              <div className="font-sans text-[16px] font-medium text-type-secondary leading-[1.1] uppercase mb-4">
                {t("eyebrow")}
              </div>
            )}
            <h2 className="font-sans text-[32px] md:text-[48px] font-normal leading-[1] tracking-[-1px] text-type-primary mb-4">
              {customTitle ?? t("title")}
            </h2>
            {!customItems && (
              <div className="font-sans text-[18px] md:text-[22px] font-normal leading-[1.5] tracking-normal text-type-secondary">
                {t("subtitle")}
              </div>
            )}
          </div>

          {GridContent}

      </div>
    </SectionWrapper>
  );
}
