import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("products"),
      links: [
        { href: "/products/cellular-glass", label: t("links.products.cellularGlass") },
        { href: "/products/mineral-wool", label: t("links.products.mineralWool") },
        { href: "/products/stainless-accessories", label: t("links.products.stainlessAccessories") },
        { href: "/products/coatings", label: t("links.products.coatings") },
      ],
    },
    {
      title: t("services"),
      links: [
        { href: "/services#design", label: t("links.services.design") },
        { href: "/services#material", label: t("links.services.material") },
        { href: "/services#specification", label: t("links.services.specification") },
        { href: "/services#epc", label: t("links.services.epc") },
        { href: "/services#consultation", label: t("links.services.consultation") },
      ],
    },
    {
      title: t("manufacturing"),
      links: [
        { href: "/manufacturing#process", label: t("links.manufacturing.process") },
        { href: "/manufacturing#safety", label: t("links.manufacturing.safety") },
      ],
    },
    {
      title: t("industries"),
      links: [
        { href: "/industries/oil-gas", label: t("links.industries.oilGas") },
        { href: "/industries/industrial", label: t("links.industries.industrial") },
        { href: "/industries/lng", label: t("links.industries.lng") },
        { href: "/industries/power", label: t("links.industries.power") },
      ],
    },
    {
      title: t("about"),
      links: [
        { href: "/about#mission", label: t("links.about.mission") },
        { href: "/about#values", label: t("links.about.values") },
        { href: "/about#network", label: t("links.about.network") },
      ],
    },
    {
      title: t("documents"),
      links: [
        { href: "/documents#datasheets", label: t("links.documents.datasheets") },
        { href: "/documents#brochures", label: t("links.documents.brochures") },
        { href: "/documents#guidelines", label: t("links.documents.guidelines") },
        { href: "/documents#presentation", label: t("links.documents.presentation") },
      ],
    },
  ];

  return (
    <footer className="flex w-full flex-col items-start bg-black-primary pt-6 text-white md:pt-12 lg:pt-20">
      <div className="container mx-auto flex w-full max-w-[1920px] flex-col items-start bg-black-primary px-5 lg:px-10">
        <div className="mb-20 flex w-full flex-col gap-12 lg:mb-[120px] lg:gap-20">
        <div>
          <Link href="/">
            <div className="w-[120px] h-[72px] bg-white rounded-xl flex items-center justify-center">
              <div className="relative w-[90px] h-[45px]">
                <Image
                  src="/images/Navbar/5/Frame-2085664158.svg"
                  alt="IPS Middle East Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-12">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-caps-mobile md:text-caps font-medium tracking-[0.05em] uppercase text-white mb-6 md:mb-8">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {col.links.map((link, lidx) => (
                  <li key={lidx}>
                    <Link href={link.href} className="text-body-mobile md:text-body text-[var(--Text-Dark-Secondary)] hover:text-white transition-colors leading-[1.4]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-4 py-8 text-caps uppercase text-[var(--Text-Dark-Secondary)] sm:flex-row sm:items-center">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            {t("privacyPolicy")}
          </Link>
          <div>
            {t("copyright", { year })}
          </div>
        </div>
      </div>
    </footer>
  );
}
