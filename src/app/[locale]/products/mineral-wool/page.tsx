import { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";
import ProductsPageContent from "@/components/sections/ProductsPageContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: localizedAlternates(locale, "/products/mineral-wool"),
  };
}

export default function MineralWoolPage() {
  return <ProductsPageContent initialProduct="mineralWool" />;
}
