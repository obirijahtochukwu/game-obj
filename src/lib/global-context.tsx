import axios from "axios";
import React, { createContext, Dispatch, useContext, useEffect, useState } from "react";
import { AdminData, userData } from "./types";
import { backend_api } from "./constants";
import { getStore, setStore } from "./utils/store";

interface context {
  admin?: AdminData;
  setAdmin?: Dispatch<AdminData>;
  user?: userData;
  setUser?: React.Dispatch<userData>;
  logout?: () => void;
  getGamesHishtory?: (id: string, userInfo: userData) => void;
  refresh?: boolean;
  setRefresh?: Dispatch<boolean>;
}

const AppContext = createContext<context>({});

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState({
    loggedIn: "pending",
    info: {},
    gameHistory: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [admin, setAdmin] = useState<AdminData>({
    loggedIn: "pending",
  });

  const logout = () => {
    localStorage.removeItem("token");
    axios.post(backend_api + "/logout", {}, { withCredentials: true }).then(() => {
      window.location.href = "/";
    });
  };

  // fetch user data
  console.log(typeof `${getStore("token")}`);

  useEffect(() => {
    axios
      .get(backend_api + "/user/" + getStore("token"), {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.token == "admin") {
          setAdmin({ ...res.data, loggedIn: "admin" });
          console.log(res.data);
        } else if (!res.data.token && res.data.email) {
          setUser({ ...user, info: res.data, loggedIn: "true" });
          getGamesHishtory(res.data._id, res.data);
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
  const getGamesHishtory = (id: string, userInfo: userData) => {
    axios
      .get(backend_api + `/game-history`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser({ info: userInfo, loggedIn: "true", gameHistory: res.data });
      })
      .catch((err) => {});
  };

  return (
    <AppContext.Provider value={{ user, setUser, logout, getGamesHishtory, admin, setAdmin, setRefresh }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
