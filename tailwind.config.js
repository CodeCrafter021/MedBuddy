/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#F7F7F8',
        'sidebar-active': '#EBECEE',
      }
    },
  },
  plugins: [],
}