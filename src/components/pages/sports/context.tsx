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

  useEffect(() => {
    // Premier League
    const leagueId = 39;
    const fetchMatches = async () => {
      try {
        const fixturesResponse = await axios.get(
          `${api.football_url}fixtures?league=${leagueId}&season=2024`,
          { headers: api.football_headers }
        );
        setMatch({
          ...match,
          fixtues: fixturesResponse.data.response.filter(
            (prop) => new Date(prop.fixture.date) > new Date()
          ),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    const matchesWithOdds = async () => {
      const odds = await Promise.all(
        match.fixtues
          .filter((item, index) => index < 10)
          .map(async (props, idx) => {
            const odd = await axios.get(
              `${api.football_url}odds?fixture=${props.fixture.id}`,
              { headers: api.football_headers }
            );
            return {
              teams: props.teams,
              odd: odd.data.response[0].bookmakers[0].bets[0],
              league: props.league,
            };
          })
      );
      return odds;
    };

    if (match.fixtues.length > 1) {
      matchesWithOdds().then((odds) => setMatch({ ...match, odds }));
    }
  }, [match.fixtues.length]);

  return (
    <AppContext.Provider value={{ match }}>{children}</AppContext.Provider>
  );
};

// Custom hook for context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
