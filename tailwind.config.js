/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#353535",
      },
      backgroundColor: {
        primary: "#353535",
      },
      height: {
        15: "60px",
      },
      margin: {
        15: "60px",
      },
    },
  },
  plugins: [],
};
