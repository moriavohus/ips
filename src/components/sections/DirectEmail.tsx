import { useTranslations } from "next-intl";

export default function DirectEmail() {
    const t = useTranslations("directEmail");

    const items = ["temp", "medium", "env", "project"] as const;

    return (
        <section id="direct-email" className="bg-background overflow-hidden">
            <div className="container mx-auto flex w-full max-w-[1920px] flex-col items-start gap-12 px-5 py-[80px] lg:flex-row lg:gap-[160px] lg:px-[40px] lg:py-[80px]">

                {/* Left Side */}
                <div className="flex w-full flex-1 flex-col items-start">
                    <h2 className="heading-h3-bold w-full max-w-none break-words text-type-primary">
                        {t("title")}{" "}
                        {t("emailLabel")}{" "}
                        <a
                            href={`mailto:${t("email")}`}
                            className="hover:text-type-brand transition-colors"
                        >
                            {t("email")}
                        </a>
                    </h2>
                </div>

                {/* Right Side */}
                <div className="flex w-full flex-1 flex-col justify-center">
                    <div className="heading-h4 text-type-primary mb-4">
                        {t("includeText")}
                    </div>
                    <ul className="list-disc pl-5 space-y-1 md:space-y-2 heading-h4 text-type-primary marker:text-type-primary">
                        {items.map((key) => (
                            <li key={key} className="pl-2">
                                {t(`items.${key}`)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
