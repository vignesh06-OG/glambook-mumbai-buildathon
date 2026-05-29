import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff7f9",
          100: "#ffeaf0",
          200: "#ffd5e2",
          300: "#ffb3cb",
          400: "#ff86ad",
          500: "#fb5f93",
          600: "#e63f78",
          700: "#c82c5f",
          800: "#a6234e",
          900: "#8a2146",
        },
        roseGold: {
          50: "#fff7f4",
          100: "#ffe9e1",
          200: "#ffd0c0",
          300: "#ffb19a",
          400: "#ff886d",
          500: "#ff6b4f",
          600: "#f14d32",
          700: "#c93a25",
          800: "#a03021",
          900: "#822a1f",
        },
        pearl: {
          50: "#ffffff",
          100: "#fffdfc",
          200: "#fff9f7",
          300: "#fff3ef",
        },
      },
      boxShadow: {
        soft: "0 12px 30px rgba(251, 113, 133, 0.14)",
        card: "0 10px 24px rgba(15, 23, 42, 0.06)",
        glow: "0 18px 55px rgba(232, 121, 249, 0.18)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

