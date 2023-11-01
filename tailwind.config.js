/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#111313",
        background: "#eceeee",
        primary: "#158484",
        secondary: "#d1cdcc",
        accent: "#1c1d1b",
      },
    },
  },
  plugins: [],
};
