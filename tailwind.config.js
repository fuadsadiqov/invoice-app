/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1e2139',
        'dark-bg': '#141624',
        'light-bg': '#f9f9fb'
      }
    },
  },
  plugins: [],
});
