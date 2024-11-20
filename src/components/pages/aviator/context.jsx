import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // Game states
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(30); // Added betAmount state
  const [cashOutAt, setCashOutAt] = useState(2.5); // Added cashOutAt state

  // Gameplay states
  const [multiplier, setMultiplier] = useState(1.0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [userCashout, setUserCashout] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [crashPoint, setCrashPoint] = useState(0);

  // Game settings
  const [setting, setSetting] = useState(false);

  // Start the game
  const startGame = () => {
    if (betAmount > 0 && betAmount <= balance) {
      // Deduct bet from balance
      setBalance((prev) => prev - betAmount);

      // Initialize game state
      setIsRunning(true);
      setIsCrashed(false);
      setMultiplier(1.0);
      setGraphData([{ x: 0, y: 1.0 }]);
      setUserCashout(null);

      // Randomize crash point
      const crash = Math.random() * 4.5 + 0.5; // Random crash point between 1.5x and 5.0x
      setCrashPoint(crash);

      // Simulate crash timing
      setTimeout(() => {
        setIsCrashed(true);
      }, crash * 1000);
    } else {
      alert("Invalid bet amount.");
    }
  };

  // Cash out logic
  const cashOut = () => {
    if (!isCrashed && isRunning) {
      const winnings = parseFloat((betAmount * multiplier).toFixed(2));
      setBalance((prev) => prev + winnings); // Add winnings to balance
      setIsRunning(false);
      setUserCashout(multiplier); // Record cashout multiplier
    }
  };

  // Game loop
  useEffect(() => {
    let interval;

    if (isRunning && !isCrashed) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const newMultiplier = parseFloat((prev * 1.05).toFixed(2)); // Increment multiplier
          setGraphData((data) => [
            ...data,
            { x: data.length, y: newMultiplier },
          ]);

          // Auto cash-out logic
          if (newMultiplier >= cashOutAt && userCashout === null) {
            cashOut(); // Automatically cash out
          }

          return newMultiplier;
        });
      }, 100); // Update every 100ms
    }

    if (isCrashed) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isCrashed, userCashout, cashOutAt]);

  return (
    <AppContext.Provider
      value={{
        balance,
        betAmount,
        setBetAmount,
        cashOutAt,
        setCashOutAt,
        multiplier,
        graphData,
        startGame,
        cashOut,
        isRunning,
        isCrashed,
        userCashout,
        setting,
        setSetting,
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
