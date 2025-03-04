/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-custom": "linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
        md: "linear-gradient(128.49deg, #CB3CFF50 19.86%, #7F25FB20 68.34%)",
        image: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url('/public//media/Background.png')",
        line: "linear-gradient(to right, #ffffff20, #ffffff)",
        sm: "linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('/public//media/Background.png')",
      },
      colors: {
        error: "#F07B7B",
        pink: "#CB3CFF",
        shinnyBlue: "#7F25FB",
        dark: "#0A1330",
        primary: "#FFFFFF",
        secondary: "#EB5E28",
        danger: "#b91c1c",
        muted: "#0B1739",
        grey: "#AEB9E1",
        gray: "#343B4F",
        advance: "#0B1739",
        success: "#22c55e",
        background: "#081028",
      },
      fontFamily: {
        primary: "Poppins",
        poppins: "Poppins",
        secondary: "Bitter",
        advance: "Quicksand",
      },
      boxShadow: {
        smError: "inset -11px -11px 23px #c11313,inset 11px 11px 23px #ff1919",
        smDark: "inset -11px -11px 23px #c85022, inset 11px 11px 23px #ff6c2e",
        md: "0px 0px 12px #ffffff30",
        xl: "0px -0.5px 5px #ffffff20",
        lg: "1px 1px 2px #ffffff60",
      },
      zIndex: {
        1: "1",
      },
    },
  },
  plugins: [],
};
