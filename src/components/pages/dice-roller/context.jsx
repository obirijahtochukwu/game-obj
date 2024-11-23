import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [setting, setSetting] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [betAmount, setBetAmount] = useState(10); // Bet amount in USD
  const [multiplier, setMultiplier] = useState(2); // User-defined multiplier
  const [isRolling, setIsRolling] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  // Calculate win chance and profit dynamically
  const winChance = ((1 / multiplier) * 100).toFixed(2); // Win chance as a percentage
  const profitOnWin = (betAmount * (multiplier - 1)).toFixed(2); // Profit = (Bet * Multiplier) - Bet

  const rollDice = () => {
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
        const winCondition = finalResult > winningTarget;

        if (winCondition) {
          toast.success(`🎉 You win! Your profit is $${profitOnWin}.`);
        } else {
          toast.error("😢 You lose! Better luck next time.");
        }
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
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
