/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#181818",
        primary: "#FFFFFF",
        secondary: "#EB5E28",
        muted: "#313131",
        gray: "#B4B4B4",
        advance: "#444444",
      },
      fontFamily: {
        primary: "DM Sans",
        secondary: "Bitter",
      },
      boxShadow: {
        smError: "inset -11px -11px 23px #c11313,inset 11px 11px 23px #ff1919",
        smDark: "inset -11px -11px 23px #c85022, inset 11px 11px 23px #ff6c2e",
      },
    },
  },
  plugins: [],
};
