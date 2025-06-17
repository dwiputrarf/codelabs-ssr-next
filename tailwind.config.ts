import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--color-bg))",
        fg: "hsl(var(--color-fg))",
        primary: "hsl(var(--color-primary))",
        accent: "hsl(var(--color-accent))",
        "accent-fg": "hsl(var(--color-accent-fg))",
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
      },
    },
  },
  plugins: [],
};

export default config;