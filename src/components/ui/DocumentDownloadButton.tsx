"use client";

import { DownloadIcon } from "@/components/ui/Icons";

type Props = {
  title: string;
  meta: string;
  url?: string;
};

export default function DocumentDownloadButton({ title, meta, url }: Props) {
  return (
    <a
      href={url || "#"}
      download={url && url !== "#" ? true : undefined}
      target={url && url !== "#" ? "_blank" : undefined}
      rel={url && url !== "#" ? "noopener noreferrer" : undefined}
      className="group flex self-stretch flex-col items-start justify-center gap-[20px] rounded-[8px] bg-white p-[14px] transition-all md:flex-row md:items-center md:justify-between md:p-[28px]"
      style={{ backdropFilter: "blur(5.15px)" }}
    >
      <span className="text-h3-mobile md:text-h3-bold text-type-primary group-hover:text-type-brand transition-colors">
        {title}
      </span>

      <div className="flex items-center justify-between self-stretch shrink-0 md:min-w-[200px] md:self-auto">
        <span className="font-sans text-[14px] font-bold text-type-primary uppercase leading-[1.1]">
          {meta.replace("MB", "МБ")}
        </span>
        <div className="w-10 h-10 rounded-[8px] bg-black-primary flex justify-center items-center transition-colors group-hover:bg-type-brand shrink-0 text-white">
          <DownloadIcon />
        </div>
      </div>
    </a>
  );
}
