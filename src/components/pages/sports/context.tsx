import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../lib/constants";

// Define types for better type safety
interface Fixture {
  fixture: {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: number | null;
      second: number | null;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: number | null;
      extra: any;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
    standings: boolean;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
}

interface Odd {
  id: number;
  name: string;
  values: {
    value: string;
    odd: string | number;
  }[];
}

interface MergedData {
  fixture: Fixture["fixture"];
  league: Fixture["league"];
  teams: Fixture["teams"];
  goals: Fixture["goals"];
  score: Fixture["score"];
  odd: Odd | null;
}

interface Context {
  matches: MergedData[];
  isLoadng?: boolean;
  setIsLoadng?: React.Dispatch<boolean>;
}

const AppContext = createContext<Context>({ matches: [] });

// Utility function to check if a league is a top league
const isTopLeague = (league: string, country: string): boolean => {
  const topLeagues = [
    { name: "Premier League", country: "england" },
    { name: "La Liga", country: "spain" },
    { name: "Bundesliga", country: "germany" },
    { name: "Serie A", country: "italy" },
    { name: "Ligue 1", country: "france" },
    { name: "Primeira Liga", country: "portugal" },
    { name: "UEFA Champions League", country: "World" },
    { name: "UEFA Europa League", country: "World" },
  ];

  return topLeagues.some(
    (top) => top.name.toLowerCase() === league.toLowerCase() && top.country.toLowerCase() === country.toLowerCase(),
  );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [matches, setMatches] = useState<MergedData[]>([]);
  const [isLoadng, setIsLoadng] = useState(false);

  useEffect(() => {
    setIsLoadng(true);
    const fetchMatches = async () => {
      try {
        // Fetch fixtures for today
        const fixturesResponse = await axios.get(`${api.football_url}fixtures?date=${new Date().toISOString().slice(0, 10)}`, {
          headers: api.football_headers,
        });

        console.log(fixturesResponse.data.response.filter((item: Fixture) => item.league.name.includes("UEFA")));
        console.log("hi");

        // Filter fixtures to include only top leagues
        const filteredFixtures = fixturesResponse.data.response.filter((item: Fixture) =>
          isTopLeague(item.league.name, item.league.country),
        );

        // Fetch odds for the filtered fixtures and merge data
        const mergedData = await Promise.all(
          filteredFixtures.map(async (fixture: Fixture) => {
            try {
              const oddsResponse = await axios.get(`${api.football_url}odds?fixture=${fixture.fixture.id}`, {
                headers: api.football_headers,
              });

              // Extract the first bet (e.g., "Match Winner")
              const odd = oddsResponse.data.response[0]?.bookmakers[0]?.bets[0] || null;

              return {
                fixture: fixture.fixture,
                league: fixture.league,
                teams: fixture.teams,
                goals: fixture.goals,
                score: fixture.score,
                odd,
              };
            } catch (error) {
              console.error(`Error fetching odds for fixture ${fixture.fixture.id}:`, error);
              toast.error(`Failed to fetch odds for fixture ${fixture.fixture.id}`);
              return {
                fixture: fixture.fixture,
                league: fixture.league,
                teams: fixture.teams,
                goals: fixture.goals,
                score: fixture.score,
                odd: null, // Set odd to null if fetching fails
              };
            }
          }),
        );

        // Update state with merged data
        setMatches(mergedData);
        setIsLoadng(false);
      } catch (error) {
        setIsLoadng(false);
        console.error("Error fetching fixtures:", error);
        toast.error("Failed to fetch fixtures");
      }
    };

    fetchMatches();
  }, []);

  return <AppContext.Provider value={{ matches, isLoadng, setIsLoadng }}>{children}</AppContext.Provider>;
};

// Custom hook for context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
