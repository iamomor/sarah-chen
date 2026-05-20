import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a2744", // navy — buttons, headings, markers
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#c9a96e", // gold — icons, highlights, underlines
          foreground: "#1a2744",
        },
        background: "#f9f6f0", // warm white — page bg
        surface: "#ffffff", // white — cards, sidebar
        text: "#1a1a1a", // near-black — all body
        muted: {
          DEFAULT: "#f9f6f0",
          foreground: "#6b7280", // gray — labels, secondary
        },
        border: "rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        xs: "2px",
        sm: "4px",
        md: "4px",
        lg: "4px",
        xl: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
