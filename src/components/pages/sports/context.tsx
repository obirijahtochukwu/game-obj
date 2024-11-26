import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api_football } from "../../../lib/constants";
import { api_football_headers } from "./../../../lib/constants";

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
          `${api_football}fixtures?league=${leagueId}&season=2024`,
          {
            ...api_football_headers,
          }
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
              `${api_football}odds?fixture=${props.fixture.id}`,
              {
                ...api_football_headers,
              }
            );
            return {
              teams: props.teams,
              odd: odd.data.response[0].bookmakers[0].bets[0],
            };
          })
      );
      return odds;
    };

    if (match.fixtues.length > 1) {
      matchesWithOdds().then((odds) => setMatch({ ...match, odds }));
    }
  }, [match.fixtues.length]);

  console.log(match);

  return (
    <AppContext.Provider value={{ match }}>{children}</AppContext.Provider>
  );
};

// Custom hook for context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
