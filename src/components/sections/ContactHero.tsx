"use client";

import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ContactHero() {
    const t = useTranslations("contact");
    const tc = useTranslations("cta");
    const breadcrumbParts = t("breadcrumb").split(">").map((part) => part.trim()).filter(Boolean);

    return (
        <SectionWrapper id="contact-hero" bg="white" className="pt-4 pb-2">
            <div className="bg-surface-dark border-[12px] lg:border-[20px] border-background rounded-[14px] lg:rounded-[44px] relative min-h-[500px] flex flex-col lg:grid lg:grid-cols-12 overflow-hidden">

                    {/* Left Side */}
                    <div className="lg:col-span-5 px-[20px] py-[40px] lg:px-[40px] lg:py-[80px] flex flex-col justify-center bg-surface-dark">
                        <div className="mb-8 lg:mb-12">
                            <Breadcrumbs
                                items={breadcrumbParts.map((label, index) => ({
                                    label,
                                    href: index === 0 ? "/" : undefined,
                                }))}
                                variant="inverse"
                                className="text-[12px] tracking-[0.05em]"
                            />
                        </div>

                        <h1 className="font-sans text-[40px] md:text-[56px] font-normal leading-[1] tracking-[-0.02em] text-white mb-6">
                            {tc("title")}
                        </h1>

                        <p className="font-sans text-[16px] xl:text-[20px] font-normal leading-[1.5] text-type-third max-w-[400px]">
                            {tc("subtitle")}
                        </p>
                    </div>

                    {/* Right Side - Form */}
                    <div className="lg:col-span-7 bg-surface-darker rounded-b-[14px] lg:rounded-b-none lg:rounded-r-[24px] p-[20px] flex items-center">
                        <form
                            className="w-full flex flex-col gap-[20px]"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[22px] font-bold leading-[26px] text-white flex justify-between">
                                        {tc("fields.name")}
                                        <span className="text-type-brand">*</span>
                                    </label>
                                    <input type="text" className="bg-white/20 min-h-[52px] rounded-[4px] px-4 text-white font-sans text-[19px] leading-[1.4] focus:outline-none focus:bg-white/30 transition-colors" required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[22px] font-bold leading-[26px] text-white flex justify-between">
                                        {tc("fields.company")}
                                        <span className="text-type-brand">*</span>
                                    </label>
                                    <input type="text" className="bg-white/20 min-h-[52px] rounded-[4px] px-4 text-white font-sans text-[19px] leading-[1.4] focus:outline-none focus:bg-white/30 transition-colors" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[22px] font-bold leading-[26px] text-white flex justify-between">
                                        {tc("fields.email")}
                                        <span className="text-type-brand">*</span>
                                    </label>
                                    <input type="email" className="bg-white/20 min-h-[52px] rounded-[4px] px-4 text-white font-sans text-[19px] leading-[1.4] focus:outline-none focus:bg-white/30 transition-colors" required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[22px] font-bold leading-[26px] text-white flex justify-between">
                                        {tc("fields.phone")}
                                        <span className="text-type-brand">*</span>
                                    </label>
                                    <input type="tel" className="bg-white/20 min-h-[52px] rounded-[4px] px-4 text-white font-sans text-[19px] leading-[1.4] focus:outline-none focus:bg-white/30 transition-colors" required />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-sans text-[22px] font-bold leading-[26px] text-white flex justify-between">
                                    {tc("fields.message")}
                                    <span className="text-type-brand">*</span>
                                </label>
                                <textarea
                                    placeholder="Tell us about your project..."
                                    className="bg-white/20 rounded-[4px] p-4 text-white font-sans text-[19px] leading-[1.4] h-[81px] resize-none focus:outline-none focus:bg-white/30 transition-colors placeholder:text-white"
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="terms-contact" className="w-4 h-4 rounded border-surface-input bg-surface-darker text-type-brand" required />
                                <label htmlFor="terms-contact" className="text-white font-sans text-[14px] leading-[1.4]">
                                    {tc("fields.terms")}
                                </label>
                            </div>
                            <div>
                                <button type="submit" className="bg-white hover:bg-gray-200 text-black font-bold py-4 px-10 rounded-[8px] uppercase text-[14px] transition-colors">
                                    {tc("button")}
                                </button>
                            </div>
                        </form>
                    </div>
            </div>
        </SectionWrapper>
    );
}
