"use client";

import DocumentDownloadButton from "@/components/ui/DocumentDownloadButton";

type DocItem = {
  title: string;
  meta: string;
  url?: string;
};

type Props = {
  items: DocItem[];
};

export default function DocumentDownloadList({ items }: Props) {
  return (
    <div className="bg-background rounded-[12px] p-[4px] flex flex-col items-start gap-[4px] self-stretch">
      {items.map((item, i) => (
        <DocumentDownloadButton
          key={i}
          title={item.title}
          meta={item.meta}
          url={item.url}
        />
      ))}
    </div>
  );
}
