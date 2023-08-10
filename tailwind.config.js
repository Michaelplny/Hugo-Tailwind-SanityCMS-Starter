module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.md"],
  plugins: [],
  theme: {
    extend: {
      // You can make your own Tailwind color gradients here: https://www.tints.dev
      colors: {
        primary: {
          50: "#E7EAEE",
          100: "#CCD2DB",
          200: "#9CA8BA",
          300: "#687B97",
          400: "#455163",
          500: "#222831",
          600: "#1B2027",
          700: "#15191E",
          800: "#0F1115",
          900: "#060709",
          950: "#040506",
        },
      },
    },
  },
};
