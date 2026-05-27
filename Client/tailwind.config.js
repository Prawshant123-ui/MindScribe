/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe6ff",
          200: "#bdd1ff",
          300: "#90b1ff",
          400: "#5e87ff",
          500: "#3a62ff",
          600: "#2641f5",
          700: "#1f31d8",
          800: "#1d2bae",
          900: "#1d2a8a",
        },
        ink: {
          900: "#0b1020",
          800: "#111733",
          700: "#1a224a",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(58,98,255,0.45)",
      },
    },
  },
  plugins: [],
};
