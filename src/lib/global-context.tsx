import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { userData } from "./types";

interface context {
  user?: userData;
  setUser?: React.Dispatch<userData>;
  logout?: () => void;
  getGamesHishtory?: (id: string, userInfo: userData) => void;
}

const AppContext = createContext<context>({});

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState({
    loggedIn: "pending",
    info: {},
    gameHistory: [],
  });

  const logout = () => {
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => {
        console.log("");
        window.location.href = "/";
      });
  };

  // fetch user details
  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.email) {
          setUser({ ...user, info: res.data, loggedIn: "true" });
          getGamesHishtory(res.data._id, res.data);
        } else {
          setUser({ ...user, loggedIn: "false" });
        }
      })
      .catch((err) => setUser({ ...user, loggedIn: "false" }));
  }, []);

  // fetch game history
  const getGamesHishtory = (id: string, userInfo: userData) => {
    axios
      .get(`http://localhost:5000/game-history/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser({ info: userInfo, loggedIn: "true", gameHistory: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AppContext.Provider value={{ user, setUser, logout, getGamesHishtory }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
