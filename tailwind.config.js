module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    gridTemplateColumns: {
      "auto-fit": "repeat(auto-fit, minmax(13rem, 1fr))",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
