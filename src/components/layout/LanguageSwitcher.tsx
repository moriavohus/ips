"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
  ru: "RU",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
            locale === loc
              ? "bg-primary text-white"
              : "text-gray-dark hover:text-primary"
          }`}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
