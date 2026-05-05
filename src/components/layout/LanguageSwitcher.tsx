"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  ar: "AR",
};

type LanguageSwitcherProps = {
  onChange?: () => void;
  className?: string;
};

export default function LanguageSwitcher({ onChange, className = "" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
    onChange?.();
  };

  return (
    <div
      className={`flex items-center gap-1 rounded-[10px] bg-white/70 p-1 ${className}`}
      aria-label="Language switcher"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`h-9 min-w-10 rounded-[8px] px-3 font-sans text-[13px] font-medium uppercase transition-colors ${
            locale === loc
              ? "bg-black-primary text-white"
              : "text-type-secondary hover:bg-white hover:text-primary"
          }`}
          aria-pressed={locale === loc}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
