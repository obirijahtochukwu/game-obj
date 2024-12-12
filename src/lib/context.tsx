import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface context {
  userLoggedIn?: string;
  setUserLoggedIn?: React.Dispatch<string>;
  logout?: () => void;
}

const AppContext = createContext<context>({});

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [userLoggedIn, setUserLoggedIn] = useState("pending");

  const logout = () => {
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => {
        console.log("");
        window.location.href = "/";
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.email) {
          setUserLoggedIn("true");
        } else {
          setUserLoggedIn("false");
        }
      })
      .catch((err) => setUserLoggedIn("false"));
  }, []);

  return (
    <AppContext.Provider value={{ userLoggedIn, setUserLoggedIn, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
