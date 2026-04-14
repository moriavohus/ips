interface FooterTextSectionProps {
    text: string;
    variant?: "light" | "dark";
    className?: string;
}

export default function FooterTextSection({ text, variant = "light", className = "" }: FooterTextSectionProps) {
    const isDark = variant === "dark";
    return (
        <section className={`${isDark ? "bg-black-primary" : "bg-background"} ${className}`}>
            <div className="container mx-auto">
                <div className="flex flex-col items-start self-stretch p-5 gap-20 md:p-10 md:gap-0">
                    <h2 className={`text-h2-mobile md:text-h2 ${isDark ? "text-white" : "text-type-primary"} text-left`}>
                        {text}
                    </h2>
                </div>
            </div>
        </section>
    );
}
