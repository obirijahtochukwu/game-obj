export const api_football = "https://api-football-v1.p.rapidapi.com/v3/";
export const api_football_key =
  "63360b5a3amsh4e0bc66f94f70c0p17ceaajsn0e6df622a18c";

export const api_football_headers = {
  headers: {
    "X-RapidAPI-Key": api_football_key,
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

export const toPercentage = (decimal: number) =>
  `${(decimal * 10).toFixed(0)}%`;
