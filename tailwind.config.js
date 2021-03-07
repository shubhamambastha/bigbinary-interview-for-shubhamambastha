const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: false,
  variants: {},
  theme: {
    extend: {
      textColor: {
        primary: "#1F2937",
        secondary: "#4B5563",
        warning: "#981B1C",
        success: "#03543F",
        pending: "#92400F",
      },
      backgroundColor: {
        primary: "#F4F5F7",
        secondary: "#E4E4E7",
        warning: "#FDE2E1",
        success: "#DEF7EC",
        pending: "#FEF3C7",
      },
      borderColor: {
        primary: "#E4E4E7",
      },
      maxWidth: {
        240: "60rem",
      },
      spacing: {
        13: "3.25rem",
      },
    },
    plugins: [],
  },
};
