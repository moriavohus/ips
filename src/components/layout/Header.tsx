"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { MenuIcon } from "@/components/ui/Icons";
import { scrollToContactForm } from "@/lib/utils";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const ts = useTranslations("services");
  const ti = useTranslations("industries");
  const tp = useTranslations("products");

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  // Lock/unlock body scroll & animate open/close
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setMobileVisible(true));
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileVisible(false);
    setTimeout(() => {
      setMobileOpen(false);
      setMobileDropdown(null);
    }, 300);
  };

  const links = [
    {
      href: "/about",
      label: t("about"),
      hasDropdown: true,
      id: "about",
      items: [
        { label: "MISSION & VISION", href: "/about#mission" },
        { label: "VALUES", href: "/about#values" },
        { label: "GLOBAL NETWORK", href: "/about#network" },
      ],
    },
    {
      href: "/products",
      label: t("products"),
      hasDropdown: true,
      id: "products",
      items: [
        { label: tp("cellularGlass.name"), href: "/products/cellular-glass" },
        { label: tp("mineralWool.name"), href: "/products/mineral-wool" },
        { label: tp("stainlessAccessories.name"), href: "/products/stainless-accessories" },
        { label: tp("coatings.name"), href: "/products/coatings" },
      ],
    },
    {
      href: "/services",
      label: t("services"),
      hasDropdown: true,
      id: "services",
      items: [
        { label: ts("designCalc.name"), href: "/services/design-calculation" },
        { label: ts("materialSelection.name"), href: "/services/material-selection" },
        { label: ts("specAssistance.name"), href: "/services/specification-assistance" },
        { label: ts("epcSupport.name"), href: "/services/epc-project-support" },
        { label: ts("techConsultation.name"), href: "/services/technical-consultation" },
      ],
    },
    {
      href: "/manufacturing",
      label: t("manufacturing"),
      hasDropdown: false,
      id: "manufacturing",
    },
    {
      href: "/industries",
      label: t("industries"),
      hasDropdown: true,
      id: "industries",
      items: [
        { label: ti("oilGas.name"), href: "/industries/oil-gas" },
        { label: ti("industrial.name"), href: "/industries/industrial-construction" },
        { label: ti("lng.name"), href: "/industries/lng-cryogenic" },
        { label: ti("power.name"), href: "/industries/power-generation" },
      ],
    },
    {
      href: "/documents",
      label: t("documents"),
      hasDropdown: true,
      id: "documents",
      items: [
        { label: "TECHNICAL DATASHEETS", href: "/documents#datasheets" },
        { label: "PRODUCT BROCHURES", href: "/documents#brochures" },
        { label: "INSTALLATION GUIDELINES", href: "/documents#guidelines" },
        { label: "COMPANY PRESENTATION", href: "/documents#presentation" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="w-full px-0 pt-0 pb-0 xl:container xl:mx-auto xl:pt-4 xl:pb-2 xl:px-4">
        <div
          className="rounded-none xl:rounded-[14px] flex items-center justify-between h-[78px] p-[8px] xl:p-1 gap-2 transition-all"
          style={{ backgroundColor: "var(--MenuGlass)", backdropFilter: "blur(20px)" }}
        >
          {/* Logo + Mobile CTA */}
          <div className="flex items-center h-full gap-2 xl:gap-0">
            <Link href="/" className="flex items-center h-full shrink-0">
              <div className="w-[133px] h-full bg-white rounded-[10px] flex items-center justify-center">
                <div className="relative w-[80px] xl:w-[90px] h-[36px] xl:h-[40px]">
                  <Image
                    src="/images/Navbar/5/Frame-2085664158.svg"
                    alt="IPS Middle East Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </Link>
            {/* Mobile: GET A QUOTE button */}
            <button
              type="button"
              onClick={scrollToContactForm}
              className="xl:hidden h-full mobile-cta bg-black-primary text-white rounded-[10px] font-sans text-[16px] font-medium uppercase tracking-[0.02em] transition-colors flex items-center justify-center whitespace-nowrap px-5"
            >
                GET A QUOTE
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center justify-center gap-4 xl:gap-6 h-full desktop-nav">
            {links.map((link) => {
              const isOpen = link.hasDropdown && dropdownOpen === link.id;
              const isActive = pathname.startsWith(link.href);
              const arrowFilter = isOpen
                ? undefined
                : isActive
                  ? "brightness(0) saturate(100%) invert(17%) sepia(74%) saturate(2818%) hue-rotate(338deg) brightness(95%) contrast(96%)"
                  : "invert(1)";

              return (
                <div
                  key={link.href}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => link.hasDropdown && setDropdownOpen(link.id)}
                  onMouseLeave={() => link.hasDropdown && setDropdownOpen(null)}
                >
                  <Link
                    href={link.href}
                    className={`
                      font-sans text-nav-link font-normal flex items-center gap-1.5 px-4 h-full rounded-[10px] transition-all group
                      ${isOpen
                        ? 'bg-black-primary text-white'
                        : isActive
                          ? 'text-primary font-medium'
                          : 'text-black hover:text-primary'}
                    `}
                  >
                    <span className="uppercase">{link.label}</span>
                    {link.hasDropdown && (
                      <div className="relative w-6 h-6 rotate-90">
                        <Image
                          src="/images/nav_Down.svg"
                          alt="dropdown arrow"
                          fill
                          className="object-contain"
                          style={{ filter: arrowFilter }}
                        />
                      </div>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.hasDropdown && (
                    <div className={`
                      absolute top-full left-0 mt-2 w-[340px] bg-black-primary rounded-[14px] p-1 transition-all duration-300 z-50
                      ${dropdownOpen === link.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}
                    `}>
                      <div className="flex flex-col gap-2">
                        {link.items?.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="flex h-[52px] w-full items-center justify-between p-[14px] rounded-[12px] border border-transparent hover:border-black-secondary transition-all duration-300"
                            onClick={() => setDropdownOpen(null)}
                          >
                            <span className="font-sans text-nav-link font-normal text-white uppercase transition-colors duration-300">
                              {item.label}
                            </span>
                            <div className="relative w-6 h-6 -rotate-90">
                              <Image
                                src="/images/naw_top.svg"
                                alt="arrow"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center justify-end h-full gap-2">
            <LanguageSwitcher className="hidden xl:flex h-[54px]" />

            {/* Desktop: Contact button */}
            <Link
              href="/contact"
              className="hidden xl:block h-full desktop-contact w-[211px] bg-black-primary hover:bg-surface-darker text-white rounded-[10px] font-sans text-nav-link font-normal transition-colors"
            >
              <span className="w-[211px] h-[70px] flex items-center justify-center">
                {t("contact")}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden px-2 text-type-primary h-full flex items-center justify-center mobile-burger"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <MenuIcon className="w-[24px] h-[24px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          className={`xl:hidden mobile-overlay fixed inset-0 z-50 bg-menu-glass backdrop-blur-[40px] overflow-y-auto transition-opacity duration-300 ${
            mobileVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between px-5 pt-5">
            <Link href="/" onClick={closeMobileMenu}>
              <div className="relative w-[90px] h-[52px]">
                <Image
                  src="/images/Navbar/5/Frame-2085664158.svg"
                  alt="IPS Middle East Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitcher onChange={closeMobileMenu} />
              <button
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center text-type-secondary"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 5L5 15M5 5l10 10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu items */}
          <nav className="flex flex-col items-center pt-10 px-5">
            <div className="flex flex-col items-center w-full gap-[40px]">
              {links.map((link) => (
                <div key={link.href} className="flex flex-col items-center w-full">
                  {link.hasDropdown ? (
                    <button
                      className={`flex items-center gap-2 font-sans text-button-mobile uppercase transition-colors ${
                        pathname.startsWith(link.href) ? 'text-primary' : 'text-black'
                      }`}
                      onClick={() => setMobileDropdown(mobileDropdown === link.id ? null : link.id)}
                    >
                      <span>{link.label}</span>
                      <div className="relative h-6 w-6 shrink-0 rotate-90">
                        <Image
                          src="/images/nav_Down.svg"
                          alt=""
                          fill
                          className="object-contain"
                          style={{ filter: "brightness(0) saturate(100%)" }}
                        />
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`font-sans text-button-mobile uppercase transition-colors ${
                        pathname.startsWith(link.href) ? 'text-primary' : 'text-black'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Expandable dropdown */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      mobileDropdown === link.id ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col items-center gap-4 pb-1">
                        {link.items?.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="font-sans text-button-mobile text-black-secondary hover:text-primary uppercase transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="w-full mt-10 flex flex-col items-center gap-4 pb-10">
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="bg-black-primary text-white w-full h-[56px] rounded-[10px] font-sans text-button-mobile uppercase"
              >
                <span className="flex h-full w-full items-center justify-center">
                  {t("contact")}
                </span>
              </Link>
              <a
                href="/docs/technical-data-sheet.pdf"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-3 font-sans text-button-mobile text-type-primary uppercase py-3"
              >
                <span>Download Tech Datasheets</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
