import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message?: string;
  product?: string;
  quantity?: string;
};

export function validateContactForm(data: ContactFormData) {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name?.trim()) errors.name = "nameRequired";
  if (!data.company?.trim()) errors.company = "companyRequired";
  if (!data.email?.trim()) errors.email = "emailRequired";
  else if (!validateEmail(data.email)) errors.email = "emailInvalid";
  if (!data.phone?.trim()) errors.phone = "phoneRequired";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function scrollToContactForm() {
  if (typeof window === "undefined") return;

  const contactSection = document.getElementById("contact");

  if (!contactSection) {
    window.location.hash = "contact";
    return;
  }

  const headerOffset = 120;
  const targetTop =
    contactSection.getBoundingClientRect().top + window.scrollY - headerOffset;

  if (window.__lenis) {
    window.__lenis.scrollTo(Math.max(targetTop, 0), {
      duration: 1.1,
    });
    return;
  }

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth",
  });
}
