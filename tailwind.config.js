/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5F0',
        beige: '#E7DDCF',
        gold: '#C8A76A',
        'gold-dark': '#A8864A',
        charcoal: '#2E2E2E',
        brown: '#5B4636',
        'brown-light': '#7A6251',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        grain: 'grain 0.6s steps(1) infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'spin-reel': 'spin 3s linear infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, -1%)' },
          '30%': { transform: 'translate(-1%, 2%)' },
          '40%': { transform: 'translate(2%, -2%)' },
          '50%': { transform: 'translate(-3%, 1%)' },
          '60%': { transform: 'translate(1%, 3%)' },
          '70%': { transform: 'translate(-2%, -1%)' },
          '80%': { transform: 'translate(3%, 2%)' },
          '90%': { transform: 'translate(-1%, -3%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
