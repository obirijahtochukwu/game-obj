/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
      },
      colors: {
        pink: "#CB3CFF",
        dark: "#0A1330",
        primary: "#FFFFFF",
        secondary: "#EB5E28",
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
      },
    },
  },
  plugins: [],
};
