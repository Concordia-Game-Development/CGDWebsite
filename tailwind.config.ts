import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      screens: {
        "2xl": "1400px",
        "3xl": "1783px",
        "4xl": "1928px",
      },
      colors: {
        "cgd-pink": "hsla(343, 61%, 52%, 0.8)",
        "cgd-pfull": "hsla(343, 61%, 52%, 1)",
        "light-pink": "hsla(343, 73%, 68%, 0.8)",
        "light-pfull": "hsla(343, 73%, 68%, 1)",
        pink: "hsl(343, 100%, 92%)",
        "dark-purple": "#4e2f51",
        wh: "#f1f1f1a6",
        "wh-full": "#f1f1f1",
        "bg-tl": "hsl(343 90% 85%)",
        "bg-br": "hsl(320 45% 95%)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      transitionProperty: {
        "height-fade": "height, opacity",
      },
      transitionDuration: {
        "300": "0.3s",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontFamily: {
      corbert: "Corbert, sans-serif",
      ls: "League Spartan, sans-serif",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
