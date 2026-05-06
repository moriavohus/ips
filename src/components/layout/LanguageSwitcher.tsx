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
  variant?: "inline" | "dropdown" | "mobile";
};

export default function LanguageSwitcher({
  onChange,
  className = "",
  variant = "inline",
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
    onChange?.();
  };

  if (variant === "dropdown") {
    const otherLocales = routing.locales.filter((loc) => loc !== locale);
    const cellClasses =
      "box-border w-full flex-col items-center justify-center gap-2 rounded-[10px] px-5 py-2 font-sans text-nav-link font-normal uppercase transition-colors";

    return (
      <div
        className={`group relative z-50 inline-flex h-full w-[79px] flex-col items-start ${className}`}
        aria-label="Language switcher"
      >
        <div className="absolute left-0 top-0 inline-flex h-full max-h-full w-full flex-col items-start gap-1 overflow-hidden rounded-[10px] transition-[background-color,backdrop-filter,max-height] duration-200 group-hover:h-auto group-hover:max-h-[218px] group-hover:bg-menu-glass group-hover:backdrop-blur-[20px] group-focus-within:h-auto group-focus-within:max-h-[218px] group-focus-within:bg-menu-glass group-focus-within:backdrop-blur-[20px]">
          <button
            type="button"
            className={`${cellClasses} flex h-full bg-white text-type-primary group-hover:h-[70px] group-focus-within:h-[70px]`}
            aria-haspopup="true"
            aria-expanded="false"
            aria-current="true"
          >
            {labels[locale]}
          </button>

          {otherLocales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => switchLocale(loc)}
              className={`${cellClasses} hidden h-[70px] text-type-primary hover:bg-white hover:text-type-brand group-hover:flex group-focus-within:flex`}
            >
              {labels[loc]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div
        className={`flex h-[78px] w-full items-center gap-1 rounded-[28px] bg-menu-glass p-1 backdrop-blur-[20px] ${className}`}
        aria-label="Language switcher"
      >
        {routing.locales.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            className={`flex h-full flex-1 items-center justify-center rounded-[24px] font-sans text-button-mobile font-normal uppercase transition-colors ${
              locale === loc
                ? "bg-white text-primary"
                : "text-type-primary hover:bg-white/70 hover:text-primary"
            }`}
            aria-pressed={locale === loc}
          >
            {labels[loc]}
          </button>
        ))}
      </div>
    );
  }

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
