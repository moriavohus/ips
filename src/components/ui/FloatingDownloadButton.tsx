import Image from "next/image";

export default function FloatingDownloadButton() {
  return (
    <div className="hidden sm:block fixed bottom-[39px] right-6 bg-black-primary/50 backdrop-blur-[6px] cursor-pointer rounded-[8px] z-50 hover:bg-black-primary/60 transition-colors">
      <a href="/docs/technical-data-sheet.pdf" className="flex items-center gap-3 px-6 py-6">
        <span className="font-sans text-white font-medium text-[16px] leading-[1.1] tracking-[0.02em] uppercase">
          Download Technical<br />Data Sheet
        </span>
        <div className="w-5 h-5 xl:w-[22px] xl:h-[22px] relative shrink-0">
          <Image src="/images/download.svg" alt="Download icon" fill className="object-contain" />
        </div>
      </a>
    </div>
  );
}
