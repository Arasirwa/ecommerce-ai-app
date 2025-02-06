/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          100: "#f5f5f7", // Soft off-white background
          200: "#eaeaeb",
          300: "#d6d6d8",  // Light gray for sections
        },
        text: {
          900: "#1a1a1a", // Dark primary text
          600: "#4a4a4a", // Softer secondary text
        },
        primary: {
          500: "#ff6b35", // Bold accent (warm & inviting)
          600: "#e65b2a", // Darker hover state
        },
        secondary: {
          500: "#ff3b3b", // RED BADGE COLOR
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
