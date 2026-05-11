import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ipsme.ae";
  const locales = ["en", "ar", "ru"];
  const pages = [
    "",
    "/about",
    "/products",
    "/products/cellular-glass",
    "/products/mineral-wool",
    "/products/stainless-accessories",
    "/products/coatings",
    "/services",
    "/industries",
    "/documents",
    "/contact",
    "/blog",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const localePrefix = locale === "en" ? "" : `/${locale}`;

      entries.push({
        url: `${siteUrl}${localePrefix}${page || "/"}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
