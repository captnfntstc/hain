import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "'Quicksand'", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        app: "var(--bg-app)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-surface-elevated)",
        subtle: "var(--border-subtle)",
        strong: "var(--border-strong)",
        main: "var(--text-main)",
        muted: "var(--text-muted)",
        dim: "var(--text-subtle)",
        brand: {
          DEFAULT: "var(--brand-primary)",
          hover: "var(--brand-primary-hover)",
          subtle: "var(--brand-primary-subtle)",
          accent: "var(--brand-accent)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
