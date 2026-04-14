import { useTranslations } from "next-intl";
import Image from "next/image";

interface CertificationsBarProps {
  title?: string;
  subtitle?: string;
}

export default function CertificationsBar({ title, subtitle }: CertificationsBarProps) {
  const t = useTranslations("certifications");

  const displayTitle = title ?? t("title");

  return (
    <section id="standards" className="bg-background py-[40px]">
      <div className="container mx-auto lg:px-10">
        <div className="flex flex-col">
          <div className="mb-[48px] lg:mb-[60px]">
            {t("eyebrow") && (
              <div className="font-sans text-[16px] font-medium text-type-primary leading-[1.1] uppercase mb-4 md:mb-5">
                {t("eyebrow")}
              </div>
            )}
            <h2 className="font-sans text-[32px] md:text-[48px] font-normal leading-[1] tracking-[-1px] text-type-primary max-w-[800px]">
              {displayTitle}
            </h2>
            {subtitle && (
              <p className="font-sans text-[16px] font-normal leading-[1.45] text-type-secondary max-w-[700px] mt-4">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-16 lg:gap-20 max-w-[940px]">
            {/* ISO Image */}
            <div className="relative w-[220px] h-[100px] md:w-[300px] md:h-[150px] lg:w-[360px] lg:h-[173px] shrink-0">
              <Image
                src="/images/iso.png"
                alt="ISO - International Organization for Standardization"
                fill
                className="object-contain object-left"
              />
            </div>

            {/* ASTM Image */}
            <div className="relative w-[120px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[173px] lg:h-[173px] shrink-0">
              <Image
                src="/images/astm.png"
                alt="ASTM International - Standards Worldwide"
                fill
                className="object-contain"
              />
            </div>

            {/* EN Image */}
            <div className="relative w-[180px] h-[100px] md:w-[300px] md:h-[150px] lg:w-[360px] lg:h-[173px] shrink-0">
              <Image
                src="/images/vn.png"
                alt="European Norm EN"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
