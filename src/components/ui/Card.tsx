import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className, hover = true }: Props) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-100 p-6",
        hover && "transition-shadow duration-200 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
