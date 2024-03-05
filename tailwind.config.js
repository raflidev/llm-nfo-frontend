/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#393C4A",
        "secondary-bg": "#191A21",
        "blue-primary": "#0A59F8"
      },
      fontFamily: {
        "inter": "Inter, sans-serif"
      }
    },
  },
  plugins: [],
}