"use client";

import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CloseIcon } from "@/components/ui/Icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export default function Modal({ isOpen, onClose, children, className }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black-primary/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-8 max-h-[90vh] overflow-y-auto",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 text-gray-400 hover:text-black transition-colors"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
