/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        premium: '0 28px 90px rgba(15, 23, 42, 0.12)',
      },
      colors: {
        brand: {
          DEFAULT: '#111827',
          muted: '#94a3b8',
          highlight: '#f8fafc',
        },
      },
      backgroundImage: {
        'hero-light': 'radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(248,247,244,1))',
        'hero-dark': 'radial-gradient(circle at top, rgba(30,41,59,0.92), rgba(9,10,16,1))',
      },
    },
  },
  plugins: [],
}
