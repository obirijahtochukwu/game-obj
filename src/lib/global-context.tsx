import axios from "axios";
import React, { createContext, Dispatch, useContext, useEffect, useState } from "react";
import { AdminData, userData } from "./types";
import { backend_api } from "./constants";
import { getStore, setStore } from "./utils/store";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

interface betResult {
  loss: boolean;
  won: boolean;
  amount: number;
}
interface context {
  admin?: AdminData;
  setAdmin?: Dispatch<AdminData>;
  user?: userData;
  setUser?: React.Dispatch<userData>;
  logout?: () => void;
  getGamesHishtory?: (result: string, amount: number, userInfo: userData) => void;
  refresh?: boolean;
  setRefresh?: Dispatch<boolean>;
  showPopup?: (result: string, amount: any) => void;
  betResult?: betResult;
  setBetResult?: Dispatch<betResult>;
  isLogin?: boolean;
  setIsLogin?: Dispatch<boolean>;
  isSignup?: boolean;
  setIsSignup?: Dispatch<boolean>;
  isBetLoading?: boolean;
  setIsBetLoading?: Dispatch<boolean>;
}

const AppContext = createContext<context>({});

const AppProvider = ({ children }: { children: JSX.Element }) => {
  // const pathname = useLocation().pathname;
  const [user, setUser] = useState({
    loggedIn: "pending",
    info: {},
    gameHistory: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [admin, setAdmin] = useState<AdminData>({
    loggedIn: "pending",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isBetLoading, setIsBetLoading] = useState(false);

  const [betResult, setBetResult] = useState({ loss: false, won: false, amount: 0 });

  const logout = () => {
    localStorage.removeItem("token");
    axios.post(backend_api + "/logout", {}, { withCredentials: true }).then(() => {
      window.location.href = "/";
    });
  };

  // fetch user data
  useEffect(() => {
    axios
      .get(backend_api + "/user/" + getStore("token"), {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.token == "admin") {
          setAdmin({ ...res.data, loggedIn: "admin" });
        } else if (!res.data.token && res.data.email) {
          setUser({ ...user, info: res.data, loggedIn: "true" });
          getGamesHishtory(null, null, res.data);
        } else {
          setUser({ ...user, loggedIn: "false" });
        }
      })
      .catch((err) => {
        setUser({ ...user, loggedIn: "false" });
      })
      .finally(() => setRefresh(false));
  }, [refresh]);

  // fetch game history
  const getGamesHishtory = (result?: string, amount?: number, userInfo?: userData) => {
    if (amount) {
      setIsBetLoading(false);
      showPopup(result, amount);
    }
    axios
      .get(backend_api + `/game-history`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser({ info: userInfo, loggedIn: "true", gameHistory: res.data });
      })
      .catch((err) => {});
  };

  // trigger bet result popup
  const showPopup = (result: string, amount: number) => {
    if (result == "win") {
      setBetResult({ ...betResult, won: true, amount });
    } else {
      setBetResult({ ...betResult, loss: true, amount });
    }
  };

  // count page viewers
  useEffect(() => {
    axios
      .put(backend_api + "/add_page_view")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        logout,
        getGamesHishtory,
        admin,
        setAdmin,
        setRefresh,
        showPopup,
        betResult,
        setBetResult,
        isSignup,
        setIsSignup,
        isLogin,
        setIsLogin,
        isBetLoading,
        setIsBetLoading,
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
