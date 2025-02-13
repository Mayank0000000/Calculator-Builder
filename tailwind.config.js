/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Ensure dark mode is enabled using the class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
