import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { en: "Documents — IPS Middle East", ar: "الوثائق — IPS الشرق الأوسط", ru: "Документы — IPS Ближний Восток" };
  const desc: Record<string, string> = { en: "Technical documents, certifications and datasheets for IPS industrial insulation products.", ar: "الوثائق الفنية والشهادات لمنتجات العزل الصناعي", ru: "Техническая документация, сертификаты и паспорта продукции" };
  return { title: titles[locale] || titles.en, description: desc[locale] || desc.en, openGraph: { title: titles[locale] || titles.en, description: desc[locale] || desc.en } };
}

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
