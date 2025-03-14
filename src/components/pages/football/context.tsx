import { createContext, Dispatch, useContext, useEffect, useState } from "react";
import { topLeagues } from "./mock-data";
import { footballFixture, footballMergedData, footballSelectedLeagues } from "../../../lib/types";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../lib/constants";
import usePagination from "../../../lib/hooks/usePagination";

interface GameState {
  introTip?: number;
  setIntroTip?: Dispatch<number>;
  matches?: footballMergedData[];
  isLoadng?: boolean;
  fixtures?: footballFixture[];
  selectedLeagues?: footballSelectedLeagues[];
  setSelectedLeagues?: Dispatch<footballSelectedLeagues[]>;
  searchResult?: () => footballFixture[];
  searchInput?: string;
  setSearchInput?: Dispatch<string>;
  PaginationWithDots?: () => JSX.Element;
}

const AppContext = createContext<GameState>({});

const AppProvider = ({ children }) => {
  const [introTip, setIntroTip] = useState(1);
  const [matches, setMatches] = useState<footballMergedData[]>([]);
  const [fixtures, setFixtures] = useState<footballFixture[]>([]);
  const [selectedLeagues, setSelectedLeagues] = useState(topLeagues);
  const [filteredFixtures, setFilteredFixtures] = useState([]);
  const [isLoadng, setIsLoadng] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 6;
  const { PaginationWithDots, visisbleData, currentPage } = usePagination({
    totalPages: Math.ceil(filteredFixtures.length / itemsPerPage),
    data: filteredFixtures,
    itemsPerPage,
  });

  const removeDuplicates = (leagues: footballFixture[]) => {
    const seen = new Set();
    return leagues.filter((league) => {
      const key = `${league.league.name}-${league.league.country}`;
      if (!seen.has(key)) {
        seen.add(key);
        return true;
      }
      return false;
    });
  };

  const searchResult = () => {
    const keywords = searchInput.toLowerCase().split(" ");

    const filtered = fixtures.filter((item) => {
      const leagueName = item.league.name.toLowerCase();
      const leagueCountry = item.league.country.toLowerCase();

      // Check if all keywords are present in either league name or country
      return keywords.every((keyword) => leagueName.includes(keyword) || leagueCountry.includes(keyword));
    });
    const uniqueLeagues = removeDuplicates(filtered);
    return uniqueLeagues;
    // setFilteredFixtures(uniqueLeagues);
  };

  const isSelectedLeague = (league: string, country: string): boolean =>
    selectedLeagues?.some(
      (top) => top.name.toLowerCase() === league.toLowerCase() && top.country.toLowerCase() === country.toLowerCase(),
    );

  useEffect(() => {
    setIsLoadng(true);
    const fetchFixtures = async () => {
      try {
        // Fetch fixtures for today
        const fixturesResponse = await axios.get(`${api.football_url}fixtures?date=${new Date().toISOString().slice(0, 10)}`, {
          headers: api.football_headers,
        });

        setFixtures(fixturesResponse.data.response);
        const filteredFixtures = fixturesResponse.data.response.filter((item: footballFixture) =>
          isSelectedLeague(item.league.name, item.league.country),
        );

        setFilteredFixtures(filteredFixtures);
      } catch (error) {
        console.error("Error fetching fixtures:", error);
        toast.error("Failed to fetch fixtures");
      }
    };

    fetchFixtures();
  }, [selectedLeagues]);

  useEffect(() => {
    setIsLoadng(true);
    const fetchMatches = async () => {
      try {
        // Fetch odds for the filtered fixtures and merge data
        const mergedData = await Promise.all(
          visisbleData.map(async (fixture: footballFixture) => {
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
        console.log(error);
        setIsLoadng(false);
      }
    };
    fetchMatches();
  }, [filteredFixtures, currentPage]);

  return (
    <AppContext.Provider
      value={{
        introTip,
        setIntroTip,
        matches,
        isLoadng,
        fixtures,
        searchResult,
        selectedLeagues,
        setSelectedLeagues,
        searchInput,
        setSearchInput,
        PaginationWithDots,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useFootballContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
