import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../lib/constants";

interface context {
  match?: any;
  fixtues?: any[];
  odds?: any[];
}

const AppContext = createContext<context>({});

const AppProvider = ({ children }) => {
  const [match, setMatch] = useState({ fixtues: [], odds: [] });

  function League(league: string, country: string) {
    const item = (name: string, nation: string) =>
      league.toLowerCase() == name.toLowerCase() && country.toLowerCase() == nation.toLowerCase() ? true : false;

    const top_league =
      item("Premier League", "england") ||
      item("La Liga", "spain") ||
      item("Bundesliga ", "germany") ||
      item("Serie A", "italy") ||
      item("Ligue 1", "france") ||
      item("Primeira Liga", "portugal");

    return top_league;
  }

  useEffect(() => {
    // Premier League
    const leagueId = 39;
    const fetchMatches = async () => {
      try {
        const fixturesResponse = await axios.get(`${api.football_url}fixtures?date=${new Date().toISOString().slice(0, 10)}`, {
          headers: api.football_headers,
        });

        setMatch({
          ...match,
          fixtues: fixturesResponse.data.response.filter((item) => League(item.league.name, item.league.country)),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    // const oddh = axios.get(
    //   `${api.football_url}odds?date=${new Date().toISOString().slice(0, 10)}`,
    //   { headers: api.football_headers }
    // );
    // console.log(oddh);
    const matchesWithOdds = async () => {
      const odds = await Promise.all(
        match.fixtues
          .filter((item, index) => index < 100)
          .map(async (props, idx) => {
            const odd = await axios.get(`${api.football_url}odds?fixture=${props.fixture.id}`, { headers: api.football_headers });
            return {
              ...props,
              odd: odd.data.response[0]?.bookmakers[0].bets[0],
            };
          }),
      );
      return odds;
    };

    if (match.fixtues.length > 1) {
      matchesWithOdds().then((odds) => setMatch({ fixtues: [], odds: odds.filter(({ odd }) => odd?.id) }));
    }
  }, [match.fixtues.length]);

  return <AppContext.Provider value={{ match }}>{children}</AppContext.Provider>;
};

// Custom hook for context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
