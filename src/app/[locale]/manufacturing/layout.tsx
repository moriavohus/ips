import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { en: "Manufacturing — IPS Middle East", ar: "التصنيع — IPS الشرق الأوسط", ru: "Производство — IPS Ближний Восток" };
  const desc: Record<string, string> = { en: "State-of-the-art manufacturing facility in UAE producing industrial insulation materials.", ar: "مصنع حديث في الإمارات لإنتاج مواد العزل الصناعي", ru: "Современное производство промышленных изоляционных материалов в ОАЭ" };
  return { title: titles[locale] || titles.en, description: desc[locale] || desc.en, openGraph: { title: titles[locale] || titles.en, description: desc[locale] || desc.en } };
}

export default function ManufacturingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
