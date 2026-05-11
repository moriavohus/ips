"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CTAInput, CTATextarea } from "@/components/ui/CTAInput";

type FieldName = "name" | "company" | "email" | "phone" | "terms";
type FieldErrors = Partial<Record<FieldName, string>>;

const errorFieldClassName = "ring-1 ring-red-400 focus:ring-red-400";

export default function CTAForm() {
  const t = useTranslations("cta");
  const buttons = useTranslations("buttons");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function clearError(field: FieldName) {
    setStatus("idle");
    setStatusMessage("");
    setErrors((current) => {
      if (!current[field]) return current;
      const updated = { ...current };
      delete updated[field];
      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const termsAccepted = (form.elements.namedItem("terms") as HTMLInputElement).checked;
    const nextErrors: FieldErrors = {};

    if (!data.name.trim()) nextErrors.name = t("validation.nameRequired");
    if (!data.company.trim()) nextErrors.company = t("validation.companyRequired");
    if (!data.email.trim()) nextErrors.email = t("validation.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) nextErrors.email = t("validation.emailInvalid");
    if (!data.phone.trim()) nextErrors.phone = t("validation.phoneRequired");
    if (!termsAccepted) nextErrors.terms = t("validation.termsRequired");

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage(t("status.validationError"));
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        setStatusMessage(t("status.success"));
        setErrors({});
        form.reset();
      } else {
        setStatus("error");
        setStatusMessage(t("status.error"));
      }
    } catch {
      setStatus("error");
      setStatusMessage(t("status.error"));
    }
  }

  return (
    <div className="flex w-full flex-[1_0_0] self-stretch flex-col items-start justify-center gap-20 rounded-[24px] border-0 bg-[#252525] p-5 [box-shadow:0_0_0_12px_#636363,0_25px_50px_-12px_rgb(0_0_0_/_0.25)] lg:rounded-[44px] lg:border-[20px] lg:border-[#636363] lg:p-5 lg:[box-shadow:0_25px_50px_-12px_rgb(0_0_0_/_0.25)]">
      <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="flex justify-between font-sans text-[22px] font-bold leading-[26px] text-white">
              {t("fields.name")}<span className="text-type-brand">*</span>
            </label>
            <CTAInput
              name="name"
              type="text"
              className={`min-h-[52px] ${errors.name ? errorFieldClassName : ""}`}
              aria-invalid={Boolean(errors.name)}
              onChange={() => clearError("name")}
            />
            {errors.name && <p className="font-sans text-[13px] text-red-300">{errors.name}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-between font-sans text-[22px] font-bold leading-[26px] text-white">
              {t("fields.company")}<span className="text-type-brand">*</span>
            </label>
            <CTAInput
              name="company"
              type="text"
              className={`min-h-[52px] ${errors.company ? errorFieldClassName : ""}`}
              aria-invalid={Boolean(errors.company)}
              onChange={() => clearError("company")}
            />
            {errors.company && <p className="font-sans text-[13px] text-red-300">{errors.company}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-between font-sans text-[22px] font-bold leading-[26px] text-white">
              {t("fields.email")}<span className="text-type-brand">*</span>
            </label>
            <CTAInput
              name="email"
              type="email"
              className={`min-h-[52px] ${errors.email ? errorFieldClassName : ""}`}
              aria-invalid={Boolean(errors.email)}
              onChange={() => clearError("email")}
            />
            {errors.email && <p className="font-sans text-[13px] text-red-300">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-between font-sans text-[22px] font-bold leading-[26px] text-white">
              {t("fields.phone")}<span className="text-type-brand">*</span>
            </label>
            <CTAInput
              name="phone"
              type="tel"
              className={`min-h-[52px] ${errors.phone ? errorFieldClassName : ""}`}
              aria-invalid={Boolean(errors.phone)}
              onChange={() => clearError("phone")}
            />
            {errors.phone && <p className="font-sans text-[13px] text-red-300">{errors.phone}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-sans text-[22px] font-bold leading-[26px] text-white">
            {t("fields.message")}
          </label>
          <CTATextarea name="message" placeholder={t("fields.messagePlaceholder")} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className={`h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[4px] border-2 bg-transparent checked:border-white checked:bg-white ${errors.terms ? "border-red-400" : "border-white"}`}
              aria-invalid={Boolean(errors.terms)}
              onChange={() => clearError("terms")}
            />
            <label htmlFor="terms" className="cursor-pointer font-sans text-[14px] font-normal leading-[1.5] text-white">
              {t("fields.terms")}
            </label>
          </div>
          {errors.terms && <p className="font-sans text-[13px] text-red-300">{errors.terms}</p>}
        </div>

        {status === "success" && (
          <p className="text-green-400 font-sans text-[16px]">{statusMessage}</p>
        )}
        {status === "error" && (
          <p className="text-red-400 font-sans text-[16px]">{statusMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-fit rounded-[14px] bg-white px-[30px] py-[16px] font-sans text-body-sm font-medium uppercase leading-[1.1] tracking-[0.02em] text-type-primary transition-colors hover:bg-background md:px-[40px] md:py-[20px] md:text-caps disabled:opacity-50"
        >
          {status === "loading" ? buttons("sending") : buttons("sendForm")}
        </button>
      </form>
    </div>
  );
}
