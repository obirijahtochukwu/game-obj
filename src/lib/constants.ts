export const api_key = "63360b5a3amsh4e0bc66f94f70c0p17ceaajsn0e6df622a18c";

export const api = {
  backend_url: "/",
  football_url: process.env.REACT_APP_FOOTBALL_API,
  football_headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_FOOTBALL_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_FOOTBALL_API_HOST,
  },
  sports_url: "https://pinnacle-odds.p.rapidapi.com/kit/v1/",
  sports_headers: {
    "X-RapidAPI-Key": api_key,
    "X-RapidAPI-Host": "pinnacle-odds.p.rapidapi.com",
  },
};

export const toPercentage = (decimal: number) => `${(decimal * 10).toFixed(0)}%`;

export const backend_api = 10 - 1 ? "http://localhost:5000" : "https://webnet-backend-5kmt.vercel.app";

const disableMouse = () => (document.body.style.pointerEvents = "none");

const enableMouse = () => (document.body.style.pointerEvents = "auto");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export { disableMouse, enableMouse, months };

// || "https://webnet-backend-5kmt.vercel.app";
