const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: false,
  variants: {},
  theme: {
    extend: {
      textColor: {
        primary: "#1F2937",
        secondary: "#4B5563",
      },
      backgroundColor: {
        primary: "#F4F5F7",
        secondary: "#E4E4E7",
      },
      borderColor: {
        primary: "#E4E4E7",
      },
    },
    plugins: [],
  },
};
