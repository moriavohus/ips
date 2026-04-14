import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--Background)",
        "black-primary": "var(--Black-Primary)",
        "black-secondary": "var(--Black-Secondary)",
        "black-third": "var(--Black-Third)",
        "menu-glass": "var(--MenuGlass)",
        white: "var(--White)",
        black: "var(--Black-Primary)",
        type: {
          primary: "var(--Type-Primary)",
          secondary: "var(--Type-Secondary)",
          third: "var(--Type-Third)",
          brand: "var(--Type-Brand)",
          white: "var(--Type-White)",
        },
        text: {
          primary: "var(--Text-Primary)",
          secondary: "var(--Text-Secondary)",
          third: "var(--Text-Third)",
          brand: "var(--Text-Brand)",
          "dark-primary": "var(--Text-Dark-Primary)",
          "dark-secondary": "var(--Text-Dark-Secondary)",
        },
        surface: {
          dark: "var(--Black-Primary)",
          darker: "var(--Brand-Dark)",
          input: "var(--Black-Secondary)",
        },
        "border-subtle": "var(--Black-Third)",
        primary: "var(--Brand)",
        "gray-dark": "var(--Black-Secondary)",
        "gray-medium": "var(--Black-Third)",
        "gray-light": "var(--Background)",
      },
      spacing: {
        xxs: "var(--space-xxs)",
        xs: "var(--space-xs)",
        s: "var(--space-s)",
        m: "var(--space-m)",
        l: "var(--space-l)",
        xl: "var(--space-xl)",
        xxl: "var(--space-xxl)",
        xxxl: "var(--space-xxxl)",
      },
      fontFamily: {
        sans: ['"Inter Display"', "var(--font-inter)", "Inter", "sans-serif"],
        display: ['"Inter Display"', "var(--font-inter)", "Inter", "sans-serif"],
        mono: ['"Roboto Mono"', "monospace"],
      },
      fontSize: {
        // Desktop (from Figma specs)
        h1: ["58px", { lineHeight: "1", fontWeight: "400", letterSpacing: "-0.02em" }],
        h2: ["48px", { lineHeight: "48px", fontWeight: "400", letterSpacing: "-1px" }],
        "h2-bold": ["48px", { lineHeight: "48px", fontWeight: "600", letterSpacing: "-1px" }],
        h3: ["32px", { lineHeight: "1.2", fontWeight: "400", letterSpacing: "-1%" }],
        "h3-bold": ["32px", { lineHeight: "36px", fontWeight: "600", letterSpacing: "-1px" }],
        h4: ["22px", { lineHeight: "1.4", fontWeight: "400" }],
        "h4-bold": ["22px", { lineHeight: "26px", fontWeight: "700" }],
        body: ["19px", { lineHeight: "1.4", fontWeight: "400" }],
        "body-bold": ["19px", { lineHeight: "1.5", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "nav-link": ["16px", { lineHeight: "1.1", fontWeight: "500", letterSpacing: "0.02em" }],
        caps: ["16px", { lineHeight: "1.1", fontWeight: "500" }],
        "caps-bold": ["16px", { lineHeight: "1.1", fontWeight: "700" }],
        button: ["16px", { lineHeight: "1.1", fontWeight: "500", letterSpacing: "0.02em" }],

        // Legacy alias
        "body-lg": ["19px", { lineHeight: "1.4", fontWeight: "400" }],

        // Mobile (from Figma Constants/Typography)
        "h1-mobile": ["48px", { lineHeight: "1", fontWeight: "400", letterSpacing: "-0.02em" }],
        "h2-mobile": ["32px", { lineHeight: "1.1", fontWeight: "400", letterSpacing: "-1px" }],
        "h2-bold-mobile": ["32px", { lineHeight: "1.1", fontWeight: "600", letterSpacing: "-1px" }],
        "h3-mobile": ["22px", { lineHeight: "1.2", fontWeight: "400", letterSpacing: "-0.01em" }],
        "h3-bold-mobile": ["22px", { lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.01em" }],
        "h4-mobile": ["18px", { lineHeight: "22px", fontWeight: "400" }],
        "h4-bold-mobile": ["18px", { lineHeight: "22px", fontWeight: "600" }],
        "body-mobile": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-bold-mobile": ["15px", { lineHeight: "1.5", fontWeight: "600" }],
        "body-sm-mobile": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        "caps-mobile": ["12px", { lineHeight: "1.1", fontWeight: "500" }],
        "caps-bold-mobile": ["12px", { lineHeight: "1.1", fontWeight: "700" }],
        "button-mobile": ["15px", { lineHeight: "1.1", fontWeight: "500" }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          sm: "20px",
          md: "20px",
          lg: "40px",
          xl: "40px",
          "2xl": "40px",
        },
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
          "2xl": "1920px",
        },
      },
    },
  },
  plugins: [],
};
export default config;
