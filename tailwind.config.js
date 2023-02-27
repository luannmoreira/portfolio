/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": {
          "50": "#434343",
          "100": "#0f172a",
          "200": "#0f172a",
          "300": "#252525",
          "400": "#1b1b1b",
          "500": "#0A0D11",
          "600": "#070707",
          "700": "#000000",
          "800": "#000000",
          "900": "#000000",
        },
        "white": "#ffffff",
        "blue": "#14B8A6"
      },
    },
  },
  plugins: [],
}