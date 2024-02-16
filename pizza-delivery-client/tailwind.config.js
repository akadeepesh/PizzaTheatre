// const withMT = require("@material-tailwind/react/utils/withMT");
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pizza: {
          50: "#fff5e6", // light crust
          100: "#ffe0b3", // crust
          200: "#ffcc80", // light cheese
          300: "#ffb74d", // cheese
          400: "#ffa726", // light sauce
          500: "#ff9800", // sauce
          600: "#f57c00", // light topping
          700: "#ef6c00", // topping
          800: "#e65100", // dark topping
          900: "#d84315", // burnt edge
        },
      },
    },
  },
  plugins: [],
};
