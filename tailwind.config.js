/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0A2540',
        'yellow': '#FFD700',
        'card-bg': '#212936',
      },
      borderRadius: {
        'lg': '24px',
      },
    },
  },
  plugins: [],
}

