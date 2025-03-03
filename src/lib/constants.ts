export const api_key = "63360b5a3amsh4e0bc66f94f70c0p17ceaajsn0e6df622a18c";

export const api = {
  backend_url: "/",
  football_url: "https://api-football-v1.p.rapidapi.com/v3/",
  football_headers: {
    "X-RapidAPI-Key": "78a6a88fbbmshd7bde481c943003p15b9e4jsn41794c7c126c",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
  sports_url: "https://pinnacle-odds.p.rapidapi.com/kit/v1/",
  sports_headers: {
    "X-RapidAPI-Key": api_key,
    "X-RapidAPI-Host": "pinnacle-odds.p.rapidapi.com",
  },
};

export const toPercentage = (decimal: number) => `${(decimal * 10).toFixed(0)}%`;

export const backend_api = 1 - 1 ? "http://localhost:5000" : "https://webnet-backend-5kmt.vercel.app";

const disableMouse = () => (document.body.style.pointerEvents = "none");

const enableMouse = () => (document.body.style.pointerEvents = "auto");

export { disableMouse, enableMouse };

// || "https://webnet-backend-5kmt.vercel.app";
