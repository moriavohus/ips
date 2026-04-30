"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const industries = [
  { key: "oilGas", image: "/images/image 68.png", link: "/industries/oil-gas" },
  { key: "industrial", image: "/images/image 69.png", link: "/industries/industrial-construction" },
  { key: "lng", image: "/images/image 70.png", link: "/industries/lng-cryogenic" },
  { key: "power", image: "/images/image 71.png", link: "/industries/power-generation" },
] as const;

interface IndustriesMapProps {
  variant?: "default" | "navigation";
}

export default function IndustriesMap({ variant = "default" }: IndustriesMapProps) {
  const t = useTranslations("industries");

  const sectionId = variant === "navigation" ? "industries-nav" : "industries";
  const wrapperClasses = variant === "navigation"
    ? "bg-background rounded-[12px] p-s lg:p-[20px]"
    : "bg-background rounded-[12px] p-[4px]";
  const gridGap = variant === "navigation" ? "gap-5" : "gap-[4px]";

  // Get bullet points from the translation
  const getBullets = (key: string): string[] => {
    try {
      const raw = t.raw(`${key}.applications`) as { items?: string[] };
      if (raw && raw.items) return raw.items.slice(0, 3);
      return [];
    } catch {
      return [];
    }
  };

  return (
    <section id={sectionId} className="section-padding overflow-hidden bg-white">
      <div className="w-full px-5 lg:px-10">
        <div className="flex flex-col w-full">
          <div className="mb-[48px] lg:mb-[60px]">
            {t("eyebrow") && (
              <div className="text-caps-style text-type-secondary mb-5">
                {t("eyebrow")}
              </div>
            )}
            <h2 className="font-sans text-[36px] md:text-[46px] xl:text-[56px] font-normal leading-[1.05] tracking-[-0.02em] text-type-primary">
              {t("title")}
            </h2>
          </div>

          <div className={wrapperClasses}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${gridGap}`}>
            {industries.map(({ key, image, link }, index) => {
              const numberStr = `0${index + 1}`;
              const bullets = getBullets(key);
              return (
                <Link
                  key={key}
                  href={link}
                  className="group flex flex-col bg-white rounded-[8px] overflow-hidden"
                >
                  {/* Image with number */}
                  <div className="relative h-[180px] w-full overflow-hidden rounded-[8px]">
                    <div className="absolute top-4 left-4 z-10 font-mono text-body-sm font-normal text-white">
                      {numberStr}
                    </div>
                    <Image
                      src={image}
                      alt={t(`${key}.name`)}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-s pt-s lg:p-5 lg:pt-4">
                    <h3 className="font-sans text-h3-bold-mobile md:text-h3-bold text-type-primary mb-3">
                      {t(`${key}.name`)}
                    </h3>

                    {bullets.length > 0 && (
                      <ul className="flex flex-col gap-1.5 mb-6 flex-1">
                        {bullets.map((item, idx) => (
                          <li key={idx} className="font-sans text-[14px] font-normal leading-[1.5] text-type-secondary">
                            · {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="w-[109px] h-[56px] flex items-center justify-center gap-2 mt-auto rounded-[8px] bg-background group-hover:bg-border-subtle transition-colors">
                      <span className="font-sans text-[15px] font-medium leading-[1.1] uppercase text-black-primary">VIEW</span>
                      <div className="relative h-6 w-6 -rotate-90">
                        <Image
                          src="/images/nav_Down.svg"
                          alt=""
                          fill
                          className="object-contain brightness-0"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            </div>
          </div>
        </div>        
      </div>
    </section>
  );
}
