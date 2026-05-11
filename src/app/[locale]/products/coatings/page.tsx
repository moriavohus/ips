import { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import ProductsPageContent from "@/components/sections/ProductsPageContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: localizedAlternates(locale, "/products/coatings"),
  };
}

export default function CoatingsPage() {
  return <ProductsPageContent initialProduct="coatings" />;
}
