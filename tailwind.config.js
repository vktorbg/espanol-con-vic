// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors, // <-- Esto agrega todos los colores por defecto de Tailwind
        primary: "#D97706", // Orange personalizado
        primary_hover: "#b56005", // Darker orange
        secondary: "#F3F4F6", // Light gray background
        accent: "#4C51BF",
        accent_hover: "#434190",
      },
    },
  },
  plugins: [],
};
