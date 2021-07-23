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
    minWidth: {
      32: "8rem",
      64: "16rem",
    },
    minHeight: {
      32: "8rem",
      64: "16rem",
    },
    maxWidth: {
      32: "8rem",
      52: "13rem",
      64: "16rem",
    },
    maxHeight: {
      32: "8rem",
      52: "13rem",
      64: "16rem",
    },
  },
  variants: {
    extend: {
      borderWidth: ["last"],
      brightness: ["hover"],
      backgroundImage: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
