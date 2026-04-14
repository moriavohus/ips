"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseFieldClassName =
  "self-stretch rounded-[4px] bg-[rgba(245,245,245,0.20)] px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white";

type CTAInputProps = InputHTMLAttributes<HTMLInputElement>;
type CTATextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function CTAInput({ className, ...props }: CTAInputProps) {
  return (
    <input
      className={cn(
        baseFieldClassName,
        "flex items-start justify-between",
        className
      )}
      {...props}
    />
  );
}

export function CTATextarea({ className, ...props }: CTATextareaProps) {
  return (
    <textarea
      className={cn(
        baseFieldClassName,
        "min-h-[120px] resize-none placeholder-type-third md:min-h-[150px]",
        className
      )}
      {...props}
    />
  );
}
