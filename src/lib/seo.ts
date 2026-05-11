import { Metadata } from "next";

export const siteUrl = "https://ipsme.ae";

const locales = ["en", "ar", "ru"] as const;
type Locale = (typeof locales)[number];

function localizedPath(locale: Locale, path: string) {
  const normalizedPath = path === "/" ? "" : path;
  return locale === "en" ? normalizedPath || "/" : `/${locale}${normalizedPath}`;
}

export function localizedAlternates(locale: string, path: string): Metadata["alternates"] {
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";

  return {
    canonical: localizedPath(safeLocale, path),
    languages: {
      en: localizedPath("en", path),
      ar: localizedPath("ar", path),
      ru: localizedPath("ru", path),
      "x-default": localizedPath("en", path),
    },
  };
}
