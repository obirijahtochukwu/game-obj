import { createContext, Dispatch, useContext, useState } from "react";

interface GameState {
  introTip?: number;
  setIntroTip?: Dispatch<number>;
}

const AppContext = createContext<GameState>({});

const AppProvider = ({ children }) => {
  const [introTip, setIntroTip] = useState(1);

  return (
    <AppContext.Provider
      value={{
        introTip,
        setIntroTip,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const usePlinkoContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
