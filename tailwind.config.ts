import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F14",
        panel: "#11161D",
        steel: "#1B232E",
        line: "#243040",
        blue: "#2D7FF9",
        cyan: "#38BDF8",
        heat: "#F43F5E",
        ink: "#E8EDF4",
        muted: "#8A97A8",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
