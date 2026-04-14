"use client";

import { useTranslations } from "next-intl";
import Modal from "@/components/ui/Modal";
import QuoteForm from "@/components/ui/QuoteForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: Props) {
  const tq = useTranslations("quote");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-black mb-2">{tq("title")}</h2>
      <p className="text-gray-dark mb-6">{tq("subtitle")}</p>
      <QuoteForm />
    </Modal>
  );
}
