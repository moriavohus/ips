"use client";

import { useTranslations } from "next-intl";
import { CTAInput, CTATextarea } from "@/components/ui/CTAInput";

export default function CTAForm() {
  const t = useTranslations("cta");

  return (
    <div className="flex w-full flex-[1_0_0] self-stretch flex-col items-start justify-center gap-20 rounded-[24px] border-0 bg-[#252525] p-5 [box-shadow:0_0_0_12px_#636363,0_25px_50px_-12px_rgb(0_0_0_/_0.25)] lg:rounded-[44px] lg:border-[20px] lg:border-[#636363] lg:p-5 lg:[box-shadow:0_25px_50px_-12px_rgb(0_0_0_/_0.25)]">
      <form className="flex w-full flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="flex justify-between font-sans text-[22px] font-bold leading-[26px] text-white">
              {t("fields.name")}
              <span className="text-type-brand">*</span>
            </label>
            <CTAInput
              type="text"
              className="min-h-[52px]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-between font-sans text-[22px] font-bold leading-[26px] text-white">
              {t("fields.company")}
              <span className="text-type-brand">*</span>
            </label>
            <CTAInput
              type="text"
              className="min-h-[52px]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-between font-sans text-[22px] font-bold leading-[26px] text-white">
              {t("fields.email")}
              <span className="text-type-brand">*</span>
            </label>
            <CTAInput
              type="text"
              className="min-h-[52px]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex justify-between font-sans text-[22px] font-bold leading-[26px] text-white">
              {t("fields.phone")}
              <span className="text-type-brand">*</span>
            </label>
            <CTAInput
              type="tel"
              className="min-h-[52px]"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex justify-between font-sans text-[22px] font-bold leading-[26px] text-white">
            {t("fields.message")}
            <span className="text-type-brand">*</span>
          </label>
          <CTATextarea
            placeholder={t("fields.messagePlaceholder")}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="terms"
            className="h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[4px] border-2 border-white bg-transparent checked:border-white checked:bg-white"
            required
          />
          <label htmlFor="terms" className="cursor-pointer font-sans text-[14px] font-normal leading-[1.5] text-white">
            I agree to the Privacy Policy *
          </label>
        </div>

        <button
          type="submit"
          className="w-fit rounded-[14px] bg-white px-[30px] py-[16px] font-sans text-body-sm font-medium uppercase leading-[1.1] tracking-[0.02em] text-type-primary transition-colors hover:bg-background md:px-[40px] md:py-[20px] md:text-caps"
        >
          {t("button")}
        </button>
      </form>
    </div>
  );
}
