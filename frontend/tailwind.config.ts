/** @type {import('tailwindcss').Config()} */ export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#dce3fc",
          500: "#8487c7",
          600: "#4d4bd4",
        },
      },
    },
  },
  plugins: [],
};
