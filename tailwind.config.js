/** @type {import('tailwindcss').Config} */
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {}
  }
}
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%': { opacity: 0, transform: 'translateX(-50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%': { opacity: 0, transform: 'translateX(50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out forwards',
        fadeLeft: 'fadeLeft 0.7s ease-out forwards',
        fadeRight: 'fadeRight 0.7s ease-out forwards',
      },
    },
  plugins: [],
}
