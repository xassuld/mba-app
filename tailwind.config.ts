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
          bg: "#0A0A0A",
          surface: "#111111",
          surfaceHover: "#1A1A1A",
          border: "#2A2A2A",
          red: "#C8102E",
          gold: "#F5A623",
          text: "#FFFFFF",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(200,16,46,0.15) 0%, rgba(10,10,10,1) 50%, rgba(245,166,35,0.08) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
