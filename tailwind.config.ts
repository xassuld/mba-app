import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mba: {
          bg: "rgb(var(--mba-bg) / <alpha-value>)",
          surface: "rgb(var(--mba-surface) / <alpha-value>)",
          surfaceHover: "rgb(var(--mba-surface-hover) / <alpha-value>)",
          border: "rgb(var(--mba-border) / <alpha-value>)",
          text: "rgb(var(--mba-text) / <alpha-value>)",
          muted: "rgb(var(--mba-muted) / <alpha-value>)",
          red: "#C8102E",
          gold: "#F5A623",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "var(--hero-gradient)",
      },
    },
  },
  plugins: [],
};

export default config;
