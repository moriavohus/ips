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
      className="group flex items-center justify-between self-stretch rounded-[8px] bg-white p-7 gap-5 transition-all"
      style={{ backdropFilter: "blur(5.15px)" }}
    >
      <span className="font-sans text-[24px] md:text-[32px] font-semibold text-type-primary leading-[36px] tracking-[-1px] group-hover:text-type-brand transition-colors">
        {title}
      </span>

      <div className="flex items-center gap-4 shrink-0">
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
