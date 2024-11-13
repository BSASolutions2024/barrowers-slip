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
    fontSize: {
      sm: '1rem',      // Default small size (1rem)
      base: '1.25rem', // 1.25 times the sm size
      xl: '1.563rem',  // 1.25 times the base size
      '2xl': '1.953rem', // 1.25 times the xl size
      '3xl': '2.441rem', // 1.25 times the 2xl size
      '4xl': '3.052rem', // 1.25 times the 3xl size
      '5xl': '3.815rem'
    }
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
          "success": "#256900",
          "warning": "#b91c1c",
          "error": "#e83960",
          },
        },
      ],
    }
};
export default config;
