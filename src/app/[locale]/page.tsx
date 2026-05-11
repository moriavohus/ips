import { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import ServicesBlock from "@/components/sections/ServicesBlock";
import IndustriesMap from "@/components/sections/IndustriesMap";
import PerformanceMetrics from "@/components/sections/PerformanceMetrics";
import CertificationsBar from "@/components/sections/CertificationsBar";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ContactFooterSequence from "@/components/sections/ContactFooterSequence";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: localizedAlternates(locale, "/"),
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <ServicesBlock />
      <IndustriesMap />
      <CertificationsBar />
      <WhyChooseUs />
      <PerformanceMetrics />
      <ContactFooterSequence />
    </>
  );
}
