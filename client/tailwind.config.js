const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
      backdropBrightness: {
        115: "1.15",
      },
      width: {
        94: "23.5rem",
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
      xs: "20rem",
      sm: "24rem",
      "3xl": "48rem",
      "4xl": "56rem",
    },
  },
  variants: {
    extend: {
      borderWidth: ["last"],
      brightness: ["hover"],
      backgroundImage: ["hover", "focus"],
      backdropBrightness: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
