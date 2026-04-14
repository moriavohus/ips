import { Metadata } from "next";

const serviceMeta: Record<string, Record<string, { title: string; desc: string }>> = {
  "design-calculation": {
    en: { title: "Design & Calculation — IPS Middle East", desc: "Professional thermal insulation design and calculation services for industrial projects." },
    ar: { title: "التصميم والحساب — IPS الشرق الأوسط", desc: "خدمات تصميم وحساب العزل الحراري الاحترافية" },
    ru: { title: "Проектирование и расчёт — IPS Ближний Восток", desc: "Профессиональные услуги проектирования и расчёта теплоизоляции" },
  },
  "thermal-insulation": {
    en: { title: "Thermal Insulation — IPS Middle East", desc: "Complete thermal insulation solutions for oil & gas, petrochemical and industrial facilities." },
    ar: { title: "العزل الحراري — IPS الشرق الأوسط", desc: "حلول العزل الحراري الشاملة للمنشآت الصناعية" },
    ru: { title: "Теплоизоляция — IPS Ближний Восток", desc: "Комплексные решения теплоизоляции для промышленных объектов" },
  },
  "installation-supervision": {
    en: { title: "Installation Supervision — IPS Middle East", desc: "Expert supervision of industrial insulation installation projects." },
    ar: { title: "الإشراف على التركيب — IPS الشرق الأوسط", desc: "إشراف متخصص على مشاريع تركيب العزل" },
    ru: { title: "Авторский надзор — IPS Ближний Восток", desc: "Экспертный надзор за монтажом промышленной изоляции" },
  },
  "maintenance": {
    en: { title: "Maintenance — IPS Middle East", desc: "Industrial insulation maintenance and repair services." },
    ar: { title: "الصيانة — IPS الشرق الأوسط", desc: "خدمات صيانة وإصلاح العزل الصناعي" },
    ru: { title: "Обслуживание — IPS Ближний Восток", desc: "Услуги обслуживания и ремонта промышленной изоляции" },
  },
  "corrosion-protection": {
    en: { title: "Corrosion Protection — IPS Middle East", desc: "Advanced corrosion protection solutions for industrial insulation systems." },
    ar: { title: "الحماية من التآكل — IPS الشرق الأوسط", desc: "حلول متقدمة للحماية من التآكل" },
    ru: { title: "Защита от коррозии — IPS Ближний Восток", desc: "Передовые решения для защиты от коррозии" },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = serviceMeta[slug]?.[locale] || serviceMeta[slug]?.en || { title: "Services — IPS Middle East", desc: "Industrial insulation services" };
  return { title: meta.title, description: meta.desc, openGraph: { title: meta.title, description: meta.desc } };
}

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
