import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BlogIcon } from "@/components/ui/Icons";

export default function BlogPage() {
  const t = useTranslations("blog");

  return (
    <>
      <SectionWrapper bg="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="heading-hero mb-4">{t("title")}</h1>
          <p className="text-body-lg text-gray-300">{t("subtitle")}</p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center py-16">
          <BlogIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg text-gray-dark">{t("noPosts")}</p>
        </div>
      </SectionWrapper>
    </>
  );
}
