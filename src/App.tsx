import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { router } from "./lib/routes";
import axios from "axios";
import Login from "./components/pages/login/page";
import Home from "./components/pages/home/page";
import { useGlobalContext } from "./lib/global-context";
import Navigation from "./components/layout/navigation";

function App() {
  const { user } = useGlobalContext();

  return (
    <article className=" font-primary">
      <div
        className={`${
          user.loggedIn != "pending" ? " h-0" : " h-1/2"
        } fixed top-0 w-screen bg-black z-50 duration-500`}
      ></div>
      <div
        className={`${
          user.loggedIn != "pending" ? " h-0" : " h-1/2"
        } fixed bottom-0 w-screen bg-black z-50 duration-500`}
      ></div>
      {user.loggedIn == "true" ? (
        <RouterProvider router={router} />
      ) : user.loggedIn == "false" ? (
        <BrowserRouter>
          <Navigation>
            <>
              <Navigate to="/login" />
              <Routes>
                <Route path="/login" element={<Home />} />
              </Routes>
            </>
          </Navigation>
        </BrowserRouter>
      ) : (
        <div className="h-screen w-screen flex items-center justify-center text-3xl text-primary">
          <div className="bars"></div>
        </div>
      )}
    </article>
  );
}

export default App;
