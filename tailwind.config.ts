import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        card: "434px",
      },
      colors: {
        primary: {
          "50": "#fdf4ff",
          "100": "#fbe8ff",
          "200": "#f5d0fe",
          "300": "#ecabfc",
          "400": "#e079f9",
          "500": "#ce46ef",
          "600": "#b126d3",
          "700": "#921caf",
          "800": "#78198f",
          "900": "#631a75",
          "950": "#40044e",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
