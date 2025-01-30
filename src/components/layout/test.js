import { createContext, useContext, useEffect, useReducer } from "react";
const Base_Url = "http://localhost:60001";

const authContext = createContext();

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  accounts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "accounts/loaded":
      return { ...state, isLoading: false, accounts: action.payload };

    case "user/logged/in":
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };
    // const { input, password } = action.payload;
    // const user = state.accounts.find(
    //   (user) =>
    //     (user.email === input || user.number === input) &&
    //     user.password === password
    // );
    // if (user) {
    //   return {
    //     ...state,
    //     currentUser: action.payload,
    //     isAuthenticated: true,
    //   };
    // }
    // return { ...state };

    case "newUser/signUp":
      // const { input, password } = action.payload;
      // const userExist = state.accounts.some(
      //   (user) => user.email === input || user.number === input
      // );

      // if (userExist) {
      //   return { ...state };
      // }

      // const newUser = /\@/.test(input)
      //   ? { email: input, password }
      //   : { phone: input, password };

      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        currentUser: action.payload,
        isAuthenticated: true,
      };

    case "user/logout":
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };

    // case "rejected":
    //   return { ...state };

    default:
      throw new Error("UNKNOWN ACTION");
  }
}

function AuthProvider({ children }) {
  const [{ currentUser, accounts, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchAccounts() {
      try {
        const req = await fetch(${Base_Url}/users);
        const data = await req.json();
        // dispatch({ type: "users/loaded", payload: data });
        console.log(data);
      } catch {
        throw new Error("there is error in fetching data");
      }
    }
    fetchAccounts();
  }, []);

  async function login(input, password) {
    try {
      const req = await fetch(${Base_Url}/users);
      const data = await req.json();
      const user = data.find(
        (user) =>
          (user.email === input || user.number === input) &&
          user.password === password
      );
console.log(user);

      dispatch({ type: "user/logged/in", payload: user });
    } catch {
      throw new Error("there is error in logging accout with data");
    }
  }

  async function CreateAccount(newAccount) {
    try {
      const res = await fetch(${Base_Url}/users/, {
        method: "POST",
        body: JSON.stringify(newAccount),
        headers: {
          "Cotent-Type": "Application/JSON",
        },
      });
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "newUser/signUp", payload: data });
    } catch {
      throw new Error("there is error in creating accout with data");
    }
  }

  return (
    <authContext.Provider
      value={{
        currentUser,
        accounts,

        isAuthenticated,
        login,
        CreateAccount,
      }}>
      {children}
    </authContext.Provider>
  );
}