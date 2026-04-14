import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = { en: "Services — IPS Middle East", ar: "الخدمات — IPS الشرق الأوسط", ru: "Услуги — IPS Ближний Восток" };
  const desc: Record<string, string> = { en: "Design calculation, thermal insulation, installation supervision, maintenance and corrosion protection.", ar: "حساب التصميم والعزل الحراري والإشراف على التركيب", ru: "Проектный расчёт, теплоизоляция, авторский надзор, обслуживание" };
  return { title: titles[locale] || titles.en, description: desc[locale] || desc.en, openGraph: { title: titles[locale] || titles.en, description: desc[locale] || desc.en } };
}

import { redirect } from "next/navigation";

export default function ServicesPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/services/design-calculation`);
}
