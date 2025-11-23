/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ub-blue': '#0b5aa6',
        'ub-dark': '#083b6b',
        'ub-gold': '#d3a24a',
        'ub-accent': '#1f7ed0',
        'ub-light': '#eaf4ff',
      },
    },
  },
  plugins: [],
}
