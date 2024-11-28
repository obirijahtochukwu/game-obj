export const api_key = "63360b5a3amsh4e0bc66f94f70c0p17ceaajsn0e6df622a18c";

export const api = {
  football_url: "https://api-football-v1.p.rapidapi.com/v3/",
  football_headers: {
    "X-RapidAPI-Key": api_key,
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
  sports_url: "https://pinnacle-odds.p.rapidapi.com/kit/v1/",
  sports_headers: {
    "X-RapidAPI-Key": api_key,
    "X-RapidAPI-Host": "pinnacle-odds.p.rapidapi.com",
  },
};

export const toPercentage = (decimal: number) =>
  `${(decimal * 10).toFixed(0)}%`;
