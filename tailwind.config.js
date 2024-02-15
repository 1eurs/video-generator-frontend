/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepblue: "#01024E",
        darkpurple: "#543864",
        purplepink: "#8B4367",
        brightred: "#FF6464",
      },
    },
  },
  plugins: [],
};
