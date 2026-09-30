/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: { 50: '#effcfa', 100: '#c8f5ee', 500: '#0d9488', 600: '#0f766e', 700: '#115e59' } },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
