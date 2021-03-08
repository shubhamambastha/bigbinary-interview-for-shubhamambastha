const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./pages/**/*.js"],
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
        136: "34rem",
        240: "60rem",
      },
      spacing: {
        13: "3.25rem",
        18: "4.5rem",
        41: "10.25rem",
      },
      fontSize: {
        xs: ["0.75rem", "0.75rem"],
        sm: ["0.875rem", "0.875rem"],
        base: ["1rem", "1rem"],
        lg: ["1.125rem", "1.125rem"],
      },
    },
    plugins: [],
  },
};
