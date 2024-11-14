/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sour Gummy"', "sans-serif"],
        serif: ['"Crimson Text"', "serif"],
        mono: ['"Syne Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
