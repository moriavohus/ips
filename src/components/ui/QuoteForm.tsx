"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "./Button";
import { validateContactForm, ContactFormData } from "@/lib/utils";

type Props = {
  showProductField?: boolean;
};

export default function QuoteForm({ showProductField = true }: Props) {
  const t = useTranslations("quote");
  const tc = useTranslations("contact");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    product: "",
    quantity: "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", phone: "", message: "", product: "", quantity: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="text-primary text-5xl mb-4">&#10003;</div>
        <p className="text-lg">{tc("form.success")}</p>
      </div>
    );
  }

  const products = [
    "cellularGlass",
    "mineralWool",
    "stainlessAccessories",
    "coatings",
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder={tc("form.name")}
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{tc(`validation.${errors.name}`)}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder={tc("form.email")}
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{tc(`validation.${errors.email}`)}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="company"
            placeholder={tc("form.company")}
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{tc(`validation.${errors.company}`)}</p>
          )}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder={tc("form.phone")}
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{tc(`validation.${errors.phone}`)}</p>
          )}
        </div>
      </div>

      {showProductField && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="">{t("selectProduct")}</option>
            {products.map((key) => (
              <option key={key} value={key}>
                {tc(`form.name`) === tc(`form.name`) ? key.replace(/([A-Z])/g, " $1").trim() : key}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="quantity"
            placeholder={t("quantity")}
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      )}

      <textarea
        name="message"
        placeholder={tc("form.message")}
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
      />
      {errors.message && (
        <p className="text-red-500 text-sm mt-1">{tc(`validation.${errors.message}`)}</p>
      )}

      {status === "error" && (
        <p className="text-red-500 text-sm">{tc("form.error")}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? tc("form.sending") : t("submit")}
      </Button>
    </form>
  );
}
