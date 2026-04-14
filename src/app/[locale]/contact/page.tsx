"use client";

import { useTranslations } from "next-intl";
import CTASection from "@/components/sections/CTASection";
import DirectEmail from "@/components/sections/DirectEmail";
import RegionalPresence from "@/components/sections/RegionalPresence";
import FooterTextSection from "@/components/sections/FooterTextSection";
import ContactUsBlock from "@/components/sections/ContactUsBlock";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <main className="bg-white">
      {/* 1. Hero with Quote Form */}
      <CTASection />

      {/* 2. Direct Email Section */}
      <DirectEmail />

      {/* 3. Regional Presence Section (GCC flags) */}
      <RegionalPresence />

      {/* 4. Documents Text Section (Dark) */}
      <FooterTextSection
        text={t("documentsText")}
        variant="dark"
      />

      {/* 5. Contact Address & Map Section */}
      <ContactUsBlock variant="light" />
    </main>
  );
}
