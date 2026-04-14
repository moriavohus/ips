import { useTranslations } from "next-intl";
import DocumentsHero from "@/components/sections/DocumentsHero";
import DocumentList from "@/components/sections/DocumentList";
import FooterTextSection from "@/components/sections/FooterTextSection";
import ContactFooterSequence from "@/components/sections/ContactFooterSequence";

export default function DocumentsPage() {
  const t = useTranslations("contact");

  return (
    <main className="bg-white">
      <DocumentsHero />

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
