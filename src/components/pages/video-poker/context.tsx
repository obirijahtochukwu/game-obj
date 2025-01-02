import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { submitGame } from "../../../lib/utils/submit-game";
import { useGlobalContext } from "../../../lib/global-context";
import { gamble } from "../../../lib/types";

export interface Card {
  suit?: string;
  rank?: string;
}

interface GameState {
  isSetting?: boolean;
  setIsSetting?: Dispatch<boolean>;
  gamble?: gamble;
  setGamble?: React.Dispatch<gamble | any>;
}

const AppContext = createContext<GameState>({});

const AppProvider = ({ children }) => {
  // const { user, getGamesHishtory } = useGlobalContext();
  // const getHistory = () => getGamesHishtory(user.info._id, user.info);

  const [isSetting, setIsSetting] = useState(false);
  const [gamble, setGamble] = useState({
    outcomes: [],
    betAmount: null,
    payout: null,
    multiplier: null,
  });

  return (
    <AppContext.Provider
      value={{
        isSetting,
        setIsSetting,
        gamble,
        setGamble,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useVideoPokerContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
