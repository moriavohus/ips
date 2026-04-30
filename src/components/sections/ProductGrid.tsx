import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { CornerCurve } from "@/components/ui/Icons";

const products = [
  {
    key: "cellularGlass",
    href: "/products/cellular-glass",
    image: "/images/Layout/400/cg.svg",
    icon: null,
  },
  {
    key: "mineralWool",
    href: "/products/mineral-wool",
    image: "/images/Layout/400/mw.svg",
    icon: null,
  },
  {
    key: "stainlessAccessories",
    href: "/products/stainless-accessories",
    image: "/images/Layout/400/Frame 427322564.svg",
    icon: null,
  },
  {
    key: "coatings",
    href: "/products/coatings",
    image: "/images/Layout/400/cj.svg",
    icon: null,
  },
] as const;

export default function ProductGrid() {
  const t = useTranslations("products");

  return (
    <SectionWrapper id="products" bg="white">
      <div className="outside-stroke-mobile-light bg-white border-0 lg:border-[20px] border-background rounded-[24px] lg:rounded-[44px] p-s lg:p-[20px]">
          <div className="mb-20">
            {t("eyebrow") && (
              <div className="text-caps-style text-type-primary mb-5">
                {t("eyebrow")}
              </div>
            )}
            <h2 className="heading-h2 text-type-primary mb-5">
              {t("title")}
            </h2>
            <p className="font-sans text-body font-normal leading-[1.4] text-type-secondary max-w-[800px]">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-12 gap-5">
        {products.map(({ key, href, icon, image }, index) => {
          const numberStr = `0${index + 1}`;
          return (
            <div key={key} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <Link href={href} className="block h-full group">
                <div className="bg-background rounded-[16px] h-full flex flex-col pt-s lg:pt-6 overflow-hidden transition-all duration-300">

                  {/* Top Indicators */}
                  <div className="flex justify-between items-start px-s lg:px-6 w-full mb-0">
                    <div className="w-[4px] h-[4px] bg-black mt-1.5"></div>
                    <div className="font-mono text-[12px] font-normal leading-[12px] tracking-normal text-black">{numberStr}</div>
                  </div>

                  {/* Icon/Image Area */}
                  <div className="flex-1 flex flex-col">
                    <div className="w-full flex justify-center items-center h-[200px] px-s lg:px-6">
                      {image ? (
                        <div className="relative w-full h-[170px] lg:h-[180px]">
                          <Image src={image} alt={t(`${key}.name`)} fill className="object-contain" />
                        </div>
                      ) : (
                        <div className="w-24 h-24 text-black group-hover:scale-110 transition-transform duration-500 ease-out opacity-40">
                          {icon}
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="px-s pt-s pb-s lg:px-10 lg:pt-5 lg:pb-[47px] flex-1 text-center">
                      <h3 className="font-sans text-h3-bold text-type-primary mb-3">
                        {t(`${key}.name`)}
                      </h3>
                      <p className="font-sans text-body font-normal leading-[1.4] tracking-normal text-type-secondary">
                        {t(`${key}.short`)}
                      </p>
                    </div>
                  </div>

                  {/* Footer Area */}
                  <div className="flex w-full h-[64px] border-t border-black/10 bg-transparent transition-colors group-hover:bg-glass">
                    <div className="w-[64px] min-w-[64px] flex items-center justify-center border-r border-transparent group-hover:border-black/10 transition-colors">
                      <CornerCurve className="w-5 h-5 lg:w-6 lg:h-6 text-type-third transition-colors group-hover:text-type-brand" />
                    </div>
                    <div className="relative flex-1 flex items-center justify-center font-sans text-[18px] font-medium leading-[1.1] uppercase overflow-hidden">
                      <span className="absolute inset-0 bg-type-brand translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      <span className="relative z-10 text-type-primary transition-colors duration-300 group-hover:text-white">VIEW</span>
                      <span className="relative z-10 ml-2 block h-6 w-6 -rotate-90">
                        <Image
                          src="/images/nav_Down.svg"
                          alt=""
                          fill
                          className="object-contain brightness-0 transition group-hover:brightness-100"
                        />
                      </span>
                    </div>
                    <div className="w-[64px] min-w-[64px] flex items-center justify-center border-l border-transparent group-hover:border-black/10 transition-colors">
                      <CornerCurve className="w-5 h-5 lg:w-6 lg:h-6 text-type-third transition-colors group-hover:text-type-brand" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
          </div>
      </div>
    </SectionWrapper>
  );
}
