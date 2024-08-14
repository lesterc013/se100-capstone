/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        eggshell: '#fffaf0',
      },
    },
  },
  plugins: [],
}
