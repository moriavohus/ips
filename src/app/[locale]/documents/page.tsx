import { useTranslations } from "next-intl";
import DocumentList from "@/components/sections/DocumentList";
import FooterTextSection from "@/components/sections/FooterTextSection";
import ContactFooterSequence from "@/components/sections/ContactFooterSequence";
import SplitHero from "@/components/sections/SplitHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function DocumentsPage() {
  const td = useTranslations("documents");
  const t = useTranslations("contact");
  const breadcrumbParts = td("breadcrumb").split(">").map((part) => part.trim()).filter(Boolean);

  return (
    <main className="bg-white">
      <SplitHero
        breadcrumb={
          <Breadcrumbs
            items={breadcrumbParts.map((label, index) => ({
              label,
              href: index === 0 ? "/" : undefined,
            }))}
          />
        }
        title={td("title")}
        titleClassName="heading-h3 text-type-primary mb-6 lg:mb-8"
        ctaText={td("cta")}
        ctaHref="/contact"
        imageSrc="/images/DOCUMENTS/Portfolio%20Header/12.png"
        imageAlt="Technical blueprint"
        imageFit="cover"
        imageWrapperClassName="relative h-full w-full overflow-hidden rounded-[8px] lg:absolute lg:inset-[20px] lg:h-auto lg:w-auto"
      />

      <DocumentList />

      {/* Reusable sections as per screenshot */}
      <FooterTextSection
        text={t("documentsText")}
        variant="dark"
      />

      <ContactFooterSequence />
    </main>
  );
}
