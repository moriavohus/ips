import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { en: "Contact — IPS Middle East", ar: "اتصل بنا — IPS الشرق الأوسط", ru: "Контакты — IPS Ближний Восток" };
  const desc: Record<string, string> = { en: "Contact IPS Middle East for industrial insulation quotes and inquiries.", ar: "تواصل مع IPS للحصول على عروض أسعار العزل الصناعي", ru: "Свяжитесь с IPS для получения расчёта стоимости промышленной изоляции" };
  return { title: titles[locale] || titles.en, description: desc[locale] || desc.en, openGraph: { title: titles[locale] || titles.en, description: desc[locale] || desc.en } };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
