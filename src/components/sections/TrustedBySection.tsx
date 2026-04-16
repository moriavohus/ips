import Image from "next/image";

const logos = [
  { src: "/images/velesstroy-logo 1.png", alt: "Velesstroy" },
  { src: "/images/senimdi-kurylys-logo 1.png", alt: "Senimdi Kurylys" },
  { src: "/images/zamanquantor-logo 1.png", alt: "Zamanquantor" },
  { src: "/images/isker-logo 1.png", alt: "Isker" },
  { src: "/images/denholm-zholdas-logo 1.png", alt: "Denholm Zholdas" },
  { src: "/images/sicim-logo 1.png", alt: "Sicim" },
  { src: "/images/Frame 2131328954.png", alt: "KTR People & Technologies" },
  { src: "/images/kss-logo 1.png", alt: "KSS" },
  { src: "/images/ktc-logo 1.png", alt: "Caspian Pipeline Consortium" },
  { src: "/images/Frame 2131328953.png", alt: "NCOC" },
  { src: "/images/IMAGE 2026-04-16 14_57_23 1.png", alt: "AXIS Therm" },
] as const;

export default function TrustedBySection() {
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="w-full overflow-x-hidden bg-white">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-start gap-m py-l">
        <div className="flex w-full items-center gap-[10px] self-stretch px-[60px]">
          <h2 className="text-caps-style text-type-primary">
            Trusted by
          </h2>
        </div>

        <div className="w-full self-stretch overflow-hidden">
          <div className="trusted-by-marquee-track flex w-max items-center self-stretch">
            {marqueeLogos.map((logo, index) => {
              const isClone = index >= logos.length;

              return (
                <div
                  key={`${logo.src}-${index}`}
                  aria-hidden={isClone}
                  className="mr-m flex h-[50px] w-[154px] shrink-0 items-center justify-center md:h-[84px] md:w-[260px] lg:h-[96px] lg:w-[300px]"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={logo.src}
                      alt={isClone ? "" : logo.alt}
                      fill
                      sizes="300px"
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
