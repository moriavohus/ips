import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import { routing, Locale } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// import SmoothScroll from "@/components/layout/SmoothScroll";
import MobileFooterText from "@/components/sections/MobileFooterText";
import Analytics from "@/components/layout/Analytics";
import "@/styles/globals.css";
// import "lenis/dist/lenis.css";
import "@fontsource/roboto-mono";

const inter = localFont({
  src: [
    { path: "../../../fonts/ttf/InterDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../../fonts/ttf/InterDisplay-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../../fonts/ttf/InterDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../../fonts/ttf/InterDisplay-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../../../fonts/ttf/InterDisplay-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../../fonts/ttf/InterDisplay-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../../../fonts/ttf/InterDisplay-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../../fonts/ttf/InterDisplay-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../../../fonts/ttf/InterDisplay-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../../fonts/ttf/InterDisplay-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "../../../fonts/ttf/InterDisplay-Black.ttf", weight: "900", style: "normal" },
    { path: "../../../fonts/ttf/InterDisplay-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "IPS Middle East — Industrial Insulation Manufacturer in UAE",
    ar: "IPS الشرق الأوسط — مُصنّع العزل الصناعي في الإمارات",
    ru: "IPS Middle East — Производитель промышленной изоляции в ОАЭ",
  };
  const descriptions: Record<string, string> = {
    en: "Leading manufacturer of cellular glass, mineral wool, and industrial insulation materials in the UAE and GCC region.",
    ar: "شركة رائدة في تصنيع الزجاج الخلوي والصوف المعدني ومواد العزل الصناعي في الإمارات ومنطقة الخليج.",
    ru: "Ведущий производитель пеностекла, минеральной ваты и материалов промышленной изоляции в ОАЭ и регионе Персидского залива.",
  };

  return {
    title: {
      default: titles[locale] || titles.en,
      template: `%s | IPS Middle East`,
    },
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      locale,
      type: "website",
    },
  };
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased text-black">
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          {/* <SmoothScroll /> */}
          <Header />
          <main>{children}</main>
          <MobileFooterText />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
