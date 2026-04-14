import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "inverse";
}

const separatorFilters = {
  default:
    "brightness(0) saturate(100%) invert(43%) sepia(8%) saturate(617%) hue-rotate(191deg) brightness(90%) contrast(88%)",
  inverse: "brightness(0) saturate(100%) invert(100%)",
};

export default function Breadcrumbs({
  items,
  className,
  variant = "default",
}: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-2 uppercase",
        variant === "default"
          ? "text-caps-mobile md:text-caps text-type-primary"
          : "text-[16px] font-bold leading-[1.1] text-white",
        className
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const content =
          item.href && !isLast ? (
            <Link
              href={item.href}
              className={cn(
                "transition-colors",
                variant === "default"
                  ? "hover:text-primary"
                  : "text-white/60 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={cn(
                isLast &&
                  (variant === "default"
                    ? "text-caps-bold-mobile md:text-caps-bold"
                    : "text-white"),
                !isLast && variant === "inverse" && "text-white/60"
              )}
            >
              {item.label}
            </span>
          );

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {content}
            {!isLast && (
              <Image
                src="/images/naw_top.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="-rotate-90 shrink-0"
                style={{ filter: separatorFilters[variant] }}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
