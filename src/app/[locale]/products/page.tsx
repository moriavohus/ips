import { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { en: "Products — IPS Middle East", ar: "المنتجات — IPS الشرق الأوسط", ru: "Продукция — IPS Ближний Восток" };
  const desc: Record<string, string> = { en: "Cellular glass, mineral wool, coatings and stainless accessories for industrial insulation.", ar: "الزجاج الخلوي والصوف المعدني والطلاءات للعزل الصناعي", ru: "Ячеистое стекло, минеральная вата, покрытия для промышленной изоляции" };
  return { title: titles[locale] || titles.en, description: desc[locale] || desc.en, alternates: localizedAlternates(locale, "/products"), openGraph: { title: titles[locale] || titles.en, description: desc[locale] || desc.en } };
}

import ProductsPageContent from "@/components/sections/ProductsPageContent";

export default function ProductsPage() {
  return <ProductsPageContent />;
}
