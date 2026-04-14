import CTASection from "./CTASection";
import DirectEmail from "./DirectEmail";
import ContactUsBlock from "./ContactUsBlock";

interface Props {
  ctaVariant?: "default" | "industry";
  contactVariant?: "light" | "dark";
}

export default function ContactFooterSequence({ ctaVariant = "default", contactVariant = "light" }: Props) {
  return (
    <>
      <CTASection variant={ctaVariant} />
      <DirectEmail />
      <ContactUsBlock variant={contactVariant} />
    </>
  );
}
