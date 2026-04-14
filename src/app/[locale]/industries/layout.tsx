import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { en: "Industries — IPS Middle East", ar: "القطاعات — IPS الشرق الأوسط", ru: "Отрасли — IPS Ближний Восток" };
  const desc: Record<string, string> = { en: "Industrial insulation solutions for oil & gas, petrochemical, power generation and marine industries.", ar: "حلول العزل الصناعي لقطاعات النفط والغاز والبتروكيماويات", ru: "Решения по промышленной изоляции для нефтегазовой, нефтехимической и энергетической отраслей" };
  return { title: titles[locale] || titles.en, description: desc[locale] || desc.en, openGraph: { title: titles[locale] || titles.en, description: desc[locale] || desc.en } };
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
