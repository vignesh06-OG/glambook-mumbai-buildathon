import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: "var(--color-blush)",
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
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
      },
      boxShadow: {
        soft: "0 12px 30px rgba(251, 113, 133, 0.14)",
        card: "0 10px 24px rgba(15, 23, 42, 0.06)",
        glow: "0 18px 55px rgba(232, 121, 249, 0.18)",
        "2xl": "0 24px 64px rgba(0, 0, 0, 0.5)",
        "3xl": "0 32px 80px rgba(0, 0, 0, 0.6)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;