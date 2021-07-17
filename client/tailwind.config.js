const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
    gridTemplateColumns: {
      "auto-fit": "repeat(auto-fit, minmax(13rem, 1fr))",
    },
    minWidth: {
      32: "8rem",
    },
    minHeight: {
      32: "8rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
