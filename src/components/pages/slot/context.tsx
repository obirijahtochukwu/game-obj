import React, { createContext, Dispatch, FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SMSoundService } from "../../../lib/hooks/useSoundProvider";
import { coin, slotCoin } from "../../../lib/types";
import axios from "axios";
import { useGlobalContext } from "../../../lib/global-context";
import { submitGame } from "../../../lib/utils/submit-game";
import gameSoundEffect from "../../../lib/utils/game-sound-effect";
import { userExist } from "../../../lib/utils";

interface context {
  gamble?: {
    betAmount: null | number;
    payout: null | number;
  };
  setGamble?: Dispatch<{
    betAmount: null | number;
    payout: null | number;
  }>;
  startGame?: (e: FormEvent) => void;
  setting?: boolean;
  setSetting?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCoins?: slotCoin[] | coin[] | any;
  setSelectedCoins?: React.Dispatch<slotCoin[] | coin[]>;
  setIsGameActive?: React.Dispatch<boolean>;
  isGameActive?: boolean;
  gameState?: {
    label: string;
    value: string;
  };
  risklevel?: {
    current: {
      tag: number;
      label: string;
      multiplier: number;
    };
    list: {
      tag: number;
      label: string;
      multiplier: number;
    }[];
  };
  setRiskLevel?: Dispatch<{
    current: {
      tag: number;
      label: string;
      multiplier: number;
    };
    list: {
      tag: number;
      label: string;
      multiplier: number;
    }[];
  }>;
  introTip?: number;
  setIntroTip?: Dispatch<number>;
}

const AppContext = createContext<context>({});

const AppProvider = ({ children }) => {
  const { user, getGamesHishtory, setIsLogin, setIsBetLoading } = useGlobalContext();
  const getHistory = (result: string, amount: number) => getGamesHishtory(result, amount, user.info);

  const [introTip, setIntroTip] = useState(1);
  const [risklevel, setRiskLevel] = useState({
    current: { tag: 2, label: "Basic", multiplier: 2.5 },
    list: [
      { tag: 2, label: "Basic", multiplier: 2.5 },
      { tag: 3, label: "Medium", multiplier: 3.5 },
      { tag: 4, label: "Hard", multiplier: 4.5 },
    ],
  });
  const [gamble, setGamble] = useState({ betAmount: null, payout: null });
  const [setting, setSetting] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameState, setGameState] = useState({ label: "", value: "" });

  // click to start game
  const startGame = (e: FormEvent) => {
    e.preventDefault();
    setSetting(false);
    if (userExist) {
      setIsGameActive(true);
      setSelectedCoins([]);
      SMSoundService.coin();
    } else {
      setIsLogin(true);
    }
  };

  // Ring bell during gameplay
  useEffect(() => {
    const timer = setInterval(() => {
      if (isGameActive) {
        SMSoundService.blip();
      }
    }, 100);
    return () => clearInterval(timer);
  }, [isGameActive]);

  // Check for win or loss on coin selection changes
  useEffect(() => {
    if (selectedCoins.length > 3) {
      setIsGameActive(false);

      const groupedCoins = selectedCoins.reduce((acc, coin) => {
        const existingGroup = acc.find((group) => group.some((c) => c.id === coin.id));
        if (existingGroup) {
          existingGroup.push(coin);
        } else {
          acc.push([coin]);
        }
        return acc;
      }, []);

      const winningGroup = groupedCoins.find((group) => group.length == risklevel.current.tag);
      if (winningGroup) {
        setGameState({ label: "win", value: winningGroup[0].coin }); // Set winning details
      } else {
        setGameState({ value: "", label: "loss" }); // Set loss state
      }
    }
  }, [selectedCoins]);

  // Play win or loss sound based on game state
  useEffect(() => {
    if (gameState.label) {
      setIsBetLoading(true);
      const refresh = () => {
        setSelectedCoins([]);
        setGamble({ betAmount: 0, payout: 0 });
        setGameState({ label: "", value: "" });
      };
      submitGame(
        {
          userId: user.info._id,
          username: user.info.name,
          game: "Slot",
          result: gameState.label,
          betAmount: gamble.betAmount,
          multiplier: risklevel.current.multiplier,
          payout: gameState.label == "win" ? gamble.payout : 0,
        },
        getHistory,
        refresh,
      );
    }
    gameSoundEffect(gameState.label);
  }, [gameState]);

  return (
    <AppContext.Provider
      value={{
        startGame,
        setting,
        setSetting,
        gameState,
        selectedCoins,
        setSelectedCoins,
        setIsGameActive,
        isGameActive,
        risklevel,
        setRiskLevel,
        gamble,
        setGamble,
        introTip,
        setIntroTip,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useSlotContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
