"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "dark" | "white";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  href?: string;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-type-brand shadow-sm",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  dark: "bg-black text-white hover:bg-gray-dark",
  white:
    "bg-white text-black hover:bg-gray-light",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-6 py-3 text-sm leading-[1.1] gap-2",
  md: "px-10 py-4 text-[18px] leading-[1.1] gap-2 min-h-[56px]",
  lg: "px-12 py-6 text-xl leading-[1.1] gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  ...props
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium uppercase tracking-normal rounded-[16px] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
