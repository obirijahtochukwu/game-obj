import React, { createContext, Dispatch, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { submitGame } from "../../../lib/utils/submit-game";
import { useGlobalContext } from "../../../lib/global-context";
import { calculateHandValue, combinations } from "./utils";

export interface Card {
  suit?: string;
  rank?: string;
}

interface GameState {
  deck?: Card[];
  playerHand?: Card[];
  dealerHand?: Card[];
  playerScore?: number;
  dealerScore?: number;
  isGameOver?: boolean;
  winner?: "player" | "dealer" | "tie" | null;
  bankroll?: number;
  betAmount?: number;
  isSetting?: boolean;
  setIsSetting?: Dispatch<boolean>;
  setBetAmount?: Dispatch<number>;
  setPlayerHand?: Dispatch<Card[]>;
  setDealerHand?: Dispatch<Card[]>;
  gameOver?: boolean;
  setGameOver?: Dispatch<boolean>;
  result?: any;
  setResult?: any;
  newGame?: boolean;
  setNewGame?: Dispatch<boolean>;
  score?: any;
  setScore?: any;
  dealerValue?: any;
  playerValue?: any;
  getRandomCardFromDeck?: () => void;
  resetGame?: () => void;
  playerStand?: () => void;
  dealCardToPlayer?: () => void;
  handleGameOver?: (e: any) => void;
}

const AppContext = createContext<GameState>({});

const AppProvider = ({ children }) => {
  // const { user, getGamesHishtory ,setIsLogin} = useGlobalContext();
  // const getHistory = () => getGamesHishtory(user.info._id, user.info);

  const [isSetting, setIsSetting] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [multiplier, setMultiplier] = useState(1);

  const [gameDeck, setGameDeck] = useState(combinations);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState({ type: "", message: "" });
  const [newGame, setNewGame] = useState(false);
  const [score, setScore] = useState({ player: 0, dealer: 0 });
  const [bankroll, setBankroll] = useState(1000);
  const [betAmount, setBetAmount] = useState(10);

  // TODO: Get random card from deck
  const getRandomCardFromDeck = () => {
    const randomIndex = Math.floor(Math.random() * gameDeck.length);
    const card = gameDeck[randomIndex];
    const newDeck = gameDeck.filter((_, index) => index !== randomIndex);
    setGameDeck(newDeck);
    return card;
  };
  // TODO: Deal card to player
  const dealCardToPlayer = () => {
    const newHand = [...playerHand, getRandomCardFromDeck()];
    setPlayerHand(newHand);
    const playerValue = calculateHandValue(newHand);

    if (playerValue > 21) {
      handleGameOver({
        type: "dealer",
        message: "Player busts! Dealer wins!",
      });
    } else if (playerValue === 21) {
      handleGameOver({ type: "player", message: "Player wins!" });
      setScore({ ...score, player: score.player + 1 });
    }
  };
  // TODO: Player stand
  const playerStand = () => {
    setGameOver(true);
    const newHand = [...dealerHand, getRandomCardFromDeck()];
    setDealerHand(newHand);

    const dealerValue = calculateHandValue(newHand);

    if (dealerValue > 21) {
      handleGameOver({
        type: "player",
        message: "Dealer busts! Player wins!",
      });
      setScore({ ...score, player: score.player + 1 });
    }
  };
  // TODO: Reset game
  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameOver(false);
    setResult({ type: "", message: "" });
    setNewGame(false);
    setGameDeck(combinations);
  };
  // TODO: Handle game logic at Game start

  useEffect(() => {
    if (playerHand.length === 0 && dealerHand.length === 0) {
      setPlayerHand([getRandomCardFromDeck(), getRandomCardFromDeck()]);
      setDealerHand([getRandomCardFromDeck()]);
    }

    if (playerValue === 21) {
      handleGameOver({ type: "player", message: "Player wins!" });
    } else if (dealerValue === 21) {
      handleGameOver({ type: "dealer", message: "Dealer wins!" });
      setScore({ ...score, dealer: score.dealer + 1 });
    }

    if (gameOver && dealerHand.length <= 5) {
      switch (true) {
        case playerValue === 21:
          setResult({ type: "player", message: "Player wins!" });
          setScore({ ...score, player: score.player + 1 });
          break;
        case playerValue > 21:
          setResult({
            type: "dealer",
            message: "Player busts! Dealer wins!",
          });
          setScore({ ...score, dealer: score.dealer + 1 });
          break;
        case dealerValue < playerValue:
          playerStand();
          break;
        case dealerValue === playerValue && dealerHand.length <= 5:
          setResult({ type: "", message: "Draw!" });
          setNewGame(true);
          break;
        case dealerValue > playerValue && dealerValue <= 21:
          setResult({ type: "dealer", message: "Dealer wins!" });
          setScore({ ...score, dealer: score.dealer + 1 });
          setNewGame(true);
          break;
        default:
          break;
      }
    }
  }, [playerHand, dealerHand, gameOver]);

  const handleGameOver = (result) => {
    setGameOver(true);
    setResult(result);
    setNewGame(true);
  };

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  return (
    <AppContext.Provider
      value={{
        isSetting,
        setIsSetting,
        betAmount,
        setBetAmount,
        playerHand,
        setPlayerHand,
        dealerHand,
        setDealerHand,
        gameOver,
        setGameOver,
        result,
        setResult,
        newGame,
        setNewGame,
        score,
        setScore,
        getRandomCardFromDeck,
        resetGame,
        dealCardToPlayer,
        playerStand,
        handleGameOver,
        dealerValue,
        playerValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useBlackJackContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
