import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        chaos: {
          primary: "#e31c25",
          secondary: "#ffd700",
          bg: "#0a0a0a",
          card: "#1a0a0a",
        }
      }
    },
  },
  plugins: [],
};
export default config;
