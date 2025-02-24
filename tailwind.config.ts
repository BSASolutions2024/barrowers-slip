import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#fac60c",
          foreground: "#1c1917",
        },
        secondary: {
          DEFAULT: "#d1d5db",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "#256900",
          foreground: "#ffffff",
        },
        error: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "1rem",
      base: "1.25rem",
      xl: "1.563rem",
      "2xl": "1.953rem",
      "3xl": "2.441rem",
      "4xl": "3.052rem",
      "5xl": "3.815rem",
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  //   daisyui: {
  //     themes: [
  //       {
  //         mytheme: {
  //           "primary": "#facc15",
  //           "secondary": "#facc15",
  //           "accent": "#ff4500",
  //           "neutral": "#090800",
  //           "base-100": "#ffff",
  //           "info": "#23a1ff",
  //           "success": "#256900",
  //           "warning": "#b91c1c",
  //           "error": "#e83960",
  //           },
  //         },
  //       ],
  //     }
};
export default config;
