import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { submitGame } from "../../../lib/utils/submit-game";
import { useGlobalContext } from "../../../lib/global-context";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { user, getGamesHishtory } = useGlobalContext();
  const getHistory = () => getGamesHishtory(user.info._id, user.info);

  const [setting, setSetting] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [betAmount, setBetAmount] = useState(null); // Bet amount in USD
  const [multiplier, setMultiplier] = useState(1); // User-defined multiplier
  const [isRolling, setIsRolling] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  // Calculate win chance and profit dynamically
  const winChance = ((1 / multiplier) * 100).toFixed(2); // Win chance as a percentage
  const profitOnWin = (betAmount * multiplier).toFixed(2); // Profit = (Bet * Multiplier) - Bet

  const rollDice = (e: FormEvent) => {
    e.preventDefault();
    setIsRolling(true);
    setResultMessage("");
    setSetting(false);
    let counter = 0;
    const interval = setInterval(() => {
      const randomDice = Math.floor(Math.random() * 6) + 1;
      setDiceResult(randomDice); // Set a random dice face to simulate rolling
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        const finalResult = Math.floor(Math.random() * 6) + 1; // Final roll
        setDiceResult(finalResult);
        setIsRolling(false);

        // Calculate win condition
        const winningTarget = Math.floor(6 - 6 / multiplier); // Target dice number
        const winCondition = finalResult > winningTarget ? "win" : "loss";
        submitGame(
          {
            userId: user.info._id,
            username: user.info.name,
            game: "Dice Roll",
            result: winCondition,
            betAmount: betAmount,
            multiplier: multiplier,
            payout: +profitOnWin,
          },
          getHistory
        );
      }
    }, 100); // Every 100ms, the dice will change
  };

  return (
    <AppContext.Provider
      value={{
        setting,
        setSetting,
        diceResult,
        setDiceResult,
        betAmount,
        setBetAmount,
        multiplier,
        setMultiplier,
        isRolling,
        setIsRolling,
        resultMessage,
        setResultMessage,
        winChance,
        profitOnWin,
        rollDice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useDiceRollerContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
