import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: "var(--color-blush)",
          bright: "var(--color-blush-bright)",
          soft: "var(--color-blush-soft)",
        },
        "rose-gold": {
          DEFAULT: "var(--color-rose-gold)",
          soft: "var(--color-rose-gold-soft)",
        },
        gold: {
          DEFAULT: "var(--color-gold)",
          soft: "var(--color-gold-soft)",
        },
        emerald: "var(--color-emerald)",
        violet: {
          DEFAULT: "var(--color-violet)",
          soft: "var(--color-violet-soft)",
        },
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        "surface-3": "var(--color-surface-3)",
        "surface-4": "var(--color-surface-4)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        "muted-soft": "var(--color-muted-soft)",
        border: "var(--color-border)",
        "border-soft": "var(--color-border-soft)",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(251, 113, 133, 0.18)",
        card: "0 20px 60px rgba(0, 0, 0, 0.5)",
        glow: "0 24px 80px rgba(240, 171, 252, 0.25)",
        "glow-sm": "0 12px 40px rgba(240, 171, 252, 0.15)",
        "2xl": "0 32px 80px rgba(0, 0, 0, 0.6)",
        "3xl": "0 48px 100px rgba(0, 0, 0, 0.7)",
        "inner-glow": "inset 0 0 30px rgba(240, 171, 252, 0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "ping-slow": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      backdropBlur: {
        "xs": "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;