/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          100: '#fdfdfe',
          200: '#fafbfd',
          300: '#f8fafb',
          400: '#f5f8fa',
          500: '#f3f6f9',
          600: '#c2c5c7',
          700: '#929495',
          800: '#616264',
          900: '#313132',
        },
      },
    },
  },

  plugins: [],
};
