/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'mq-peach': '#FFE1D7',
        'mq-blue-light': '#84AFFB',
        'mq-primary': '#0259DD', // Primary Colour
        'mq-orange': '#FF6648',
      },
    },
  },
  plugins: [],
}