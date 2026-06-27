/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        premium: "0 28px 80px rgba(26, 26, 26, 0.08)",
      },
      colors: {
        brand: {
          bg: "#FAF9F6",
          charcoal: "#1A1A1A",
          beige: "#DCCDB8",
          gold: "#C8A96B",
          muted: "#7A6C58",
          border: "#E9E0D5",
        },
      },
      backgroundImage: {
        "brand-glow": "radial-gradient(circle at top, rgba(200, 169, 107, 0.18), transparent 46%)",
      },
    },
  },
  plugins: [],
}
