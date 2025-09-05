/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rose': {
          100: '#E8D5D1',
          200: '#DCC4BF',
          300: '#D0B3AD',
          400: '#C4A29B',
          500: '#B89189',
        },
        'cream': '#FFF8F6',
        'charcoal': '#2C2C2C',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};