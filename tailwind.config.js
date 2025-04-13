// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D97706", // Orange
        secondary: "#F3F4F6", // Light gray background
        accent: {
          600: '#4C51BF', // Replace with your desired color
          800: '#272dec', // Replace with your desired color
        },
        // You can add other shades as needed
      },
    },
  },
  plugins: [],
};
