interface FooterTextSectionProps {
    text: string;
    variant?: "light" | "dark";
    className?: string;
}

export default function FooterTextSection({ text, variant = "light", className = "" }: FooterTextSectionProps) {
    const isDark = variant === "dark";
    return (
        <section className={`${isDark ? "bg-black-primary" : "bg-background"} ${className}`}>
            <div className="w-full">
                <div className="flex flex-col items-start self-stretch px-[20px] py-[40px] md:p-10">
                    <h2 className={`w-full max-w-none text-h3-mobile md:text-h2 ${isDark ? "text-white" : "text-type-primary"} text-left break-words`}>
                        {text}
                    </h2>
                </div>
            </div>
        </section>
    );
}
