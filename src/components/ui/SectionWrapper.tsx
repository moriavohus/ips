import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  bg?: "white" | "light" | "dark";
  id?: string;
};

const bgStyles = {
  white: "bg-white",
  light: "bg-gray-light",
  dark: "bg-black text-white",
};

export default function SectionWrapper({
  children,
  className,
  bg = "white",
  id,
}: Props) {
  return (
    <section id={id} className={cn("section-padding overflow-hidden", bgStyles[bg], className)}>
      <div className="container mx-auto w-full max-w-[1920px]">{children}</div>
    </section>
  );
}
