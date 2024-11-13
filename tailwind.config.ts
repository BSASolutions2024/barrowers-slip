import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#facc15",
          "secondary": "#facc15",        
          "accent": "#ff4500",       
          "neutral": "#090800",
          "base-100": "#ffff",
          "info": "#23a1ff",
          "success": "#33ff00",
          "warning": "#bf2100",
          "error": "#e83960",
          },
        },
      ],
    }
};
export default config;
