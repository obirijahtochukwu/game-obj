import { createContext, Dispatch, useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../lib/constants";
import usePagination from "../../../lib/hooks/usePagination";
import { Country, GameData, League, Team } from "./types";
import { defaulLeague } from "./mock-data";

interface GameState {
  introTip?: number;
  setIntroTip?: Dispatch<number>;
  games?: GameData[];
  setGames?: Dispatch<GameData[]>;
  searchInput?: string;
  setSearchInput?: Dispatch<string>;
  searchResult?: () => GameData[];
  selectedLeagues?: { league: League; country: Country }[];
  setSelectedLeagues?: Dispatch<{ league: League; country: Country }[]>;
  isLoading?: boolean;
  selectedLeagueFilter?: { league: League; country: Country }[];
  setSelectedLeagueFilter?: Dispatch<{ league: League; country: Country }[]>;
}

const AppContext = createContext<GameState>({});

const AppProvider = ({ children }) => {
  const [introTip, setIntroTip] = useState(1);
  const [games, setGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoadng] = useState(false);
  const [isTeams, setIsTeams] = useState(false);
  const [fixtures, setFixtures] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState<{ league: League; country: Country }[]>(defaulLeague);
  const [selectedLeagueFilter, setSelectedLeagueFilter] = useState(defaulLeague);
  const [data, setData] = useState([]);
  const getGames = (games: GameData[]) => {
    setIsLoadng(true);
    axios
      .get(
        `https://api-basketball.p.rapidapi.com/odds?league=${selectedLeagues[selectedLeagues.length - 1]?.league.id}&season=2024-2025`,
        {
          headers: {
            "X-RapidAPI-Key": "78a6a88fbbmshd7bde481c943003p15b9e4jsn41794c7c126c",
            "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
          },
        },
      )
      .then((res) => {
        setIsLoadng(false);
        setData([...data, ...res.data.response]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadng(false);
      });
  };

  useEffect(() => {
    if (data.length) {
      // Function to find matching odds for a fixture
      const updatedFixtures = fixtures?.map((item) => {
        const matchingOdds = data?.find(({ game, league }) => game?.id == `${item?.id}` && league?.id == `${item?.league.id}`);

        const threeWayResultBet = matchingOdds?.bookmakers.find(
          ({ bets }) => bets.find(({ name }) => name == "3Way Result")?.name,
        );

        return {
          ...item,
          odds: item.odds.length
            ? item.odds
            : threeWayResultBet?.bets[0]?.values.length
              ? threeWayResultBet?.bets[0]?.values
              : [],
        };
      });

      // Filter out fixtures without valid odds
      const validFixtures = updatedFixtures.filter(({ odds }) => odds.length);
      setGames(validFixtures);
    }
  }, [data.length]);

  useEffect(() => {
    if (isTeams) {
      getGames(fixtures);
    }
  }, [isTeams, selectedLeagues.length]);

  useEffect(() => {
    setIsLoadng(true);
    if (!isTeams) {
      axios
        .get(`https://api-basketball.p.rapidapi.com/games?date=${new Date().toISOString().slice(0, 10)}`, {
          headers: {
            "X-RapidAPI-Key": "78a6a88fbbmshd7bde481c943003p15b9e4jsn41794c7c126c", // Replace with your RapidAPI key
            "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
          },
        })
        .then((res) => {
          setFixtures(res.data.response.map((prop) => ({ ...prop, odds: [] })));
          setIsTeams(true);
        })
        .catch((res) => {
          console.log(res);
          setIsLoadng(false);
        });
    }
  }, []);

  const removeDuplicates = (games: GameData[]) => {
    const seen = new Set();
    return games.filter((item) => {
      const key = `${item.league.name}`;
      if (!seen.has(key)) {
        seen.add(key);
        return true;
      }
      return false;
    });
  };
  // console.log(games);

  const searchResult = () => {
    const keywords = searchInput.toLowerCase().split(" ");
    // console.log(fixtures);

    const filtered = fixtures.filter((item: GameData) => {
      const leagueName = item.league.name.toLowerCase();
      const leagueCountry = item.country.name.toLowerCase();

      // Check if all keywords are present in either league name or country
      return keywords.every((keyword) => leagueName.includes(keyword) || leagueCountry.includes(keyword));
    });
    const uniqueLeagues = removeDuplicates(filtered);
    return uniqueLeagues;
    // setFilteredFixtures(uniqueLeagues);
  };

  return (
    <AppContext.Provider
      value={{
        introTip,
        setIntroTip,
        games,
        setGames,
        searchInput,
        setSearchInput,
        searchResult,
        selectedLeagues,
        setSelectedLeagues,
        isLoading,
        selectedLeagueFilter,
        setSelectedLeagueFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useBasketballContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
