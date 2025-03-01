import React, { createContext, Dispatch, FormEvent, useContext, useEffect, useState } from "react";
import { submitGame } from "../../../lib/utils/submit-game";
import { useGlobalContext } from "../../../lib/global-context";
import { gamble, video_poker_deck } from "../../../lib/types";
import { evaluateHand, initializeDeck, payoutTable, ranks, shuffle, suits } from "./utils";
import gameSoundEffect from "../../../lib/utils/game-sound-effect";
import { userExist } from "../../../lib/utils";

export interface Card {
  suit?: string;
  rank?: string;
}

interface GameState {
  isSetting?: boolean;
  setIsSetting?: Dispatch<boolean>;
  gamble?: gamble;
  setGamble?: React.Dispatch<gamble | any>;
  toggleHold?: (index: number) => void;
  deal?: () => void;
  redraw?: () => void;
  draw?: (e: FormEvent) => void;
  deck?: video_poker_deck[];
  setDeck?: Dispatch<video_poker_deck[]>;
  hand?: video_poker_deck[];
  setHand?: Dispatch<video_poker_deck[]>;
  heldCards?: number[];
  setHeldCards?: Dispatch<number[]>;
  balance?: any;
  introTip?: number;
  setIntroTip?: Dispatch<number>;
}

const AppContext = createContext<GameState>({});

const AppProvider = ({ children }) => {
  const { user, getGamesHishtory, setIsLogin, setIsBetLoading } = useGlobalContext();
  const getHistory = (result: string, amount: number) => getGamesHishtory(result, amount, user.info);

  const [introTip, setIntroTip] = useState(1);
  const [balance, setBalance] = useState<any>(1000); // Player's balance

  const initialSate = {
    outcomes: [],
    betAmount: null,
    payout: null,
    multiplier: null,
  };

  const [isSetting, setIsSetting] = useState(false);
  const [deck, setDeck] = useState(initializeDeck());
  const [hand, setHand] = useState([]);
  const [message, setMessage] = useState("");
  const [heldCards, setHeldCards] = useState([]);
  const [gamble, setGamble] = useState<any>(initialSate);

  const toggleHold = (index: number) => {
    gameSoundEffect("active");
    setHeldCards((prevHeld) => (prevHeld.includes(index) ? prevHeld.filter((i) => i !== index) : [...prevHeld, index]));
  };

  const deal = () => {
    setIsSetting(false);
    gameSoundEffect("start");
    const newDeck = shuffle(deck.length < 5 ? initializeDeck() : deck);
    setDeck(newDeck.slice(5));
    setHand(newDeck.slice(0, 5));
    setHeldCards([]);
    setMessage("");
  };

  const redraw = () => {
    gameSoundEffect("start");
    const newHand = hand.map((card, index) => (heldCards.includes(index) ? card : deck.pop()));
    setIsSetting(false);

    const newDeck = deck.length < 5 ? shuffle(initializeDeck()) : deck;
    setDeck(newDeck.slice(5 - heldCards.length));
    setHand(newHand);
    console.log(newHand);
  };

  const draw = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const { result, multiplier } = evaluateHand(hand, gamble, setGamble);
    setIsSetting(false);
    if (userExist) {
      setIsBetLoading(true);
      const refresh = () => {
        setHeldCards([]);
        setHand([]);
        setGamble({ ...gamble, betMount: 0 });
      };
      submitGame(
        {
          userId: user.info._id,
          username: user.info.name,
          game: "Video Poker",
          result: result || "win",
          betAmount: gamble.betAmount,
          multiplier: multiplier,
          payout: result ? multiplier * gamble.betAmount : 0,
        },
        getHistory,
        refresh,
      );
    } else {
      setIsLogin(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isSetting,
        setIsSetting,
        gamble,
        setGamble,
        toggleHold,
        deal,
        redraw,
        deck,
        setDeck,
        hand,
        setHand,
        heldCards,
        setHeldCards,
        balance,
        draw,
        introTip,
        setIntroTip,
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
