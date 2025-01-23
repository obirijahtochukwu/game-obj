import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Router, RouterProvider, Routes } from "react-router-dom";
import { router } from "./lib/routes";
import axios from "axios";
// import Login from "./components/pages/login/page";
import Home from "./components/pages/home/page";
import { useGlobalContext } from "./lib/global-context";
import Navigation from "./components/layout/navigation";
import AdminNavigation from "./components/layout/navigation";
import { admin_router } from "./lib/admin-routes";
import Login from "./components/admin/auth/login";
// import { Login } from './components/admin/auth/login';

function App() {
  const { user, admin } = useGlobalContext();

  return (
    <article className="font-primary">
      <div
        className={`${
          user.loggedIn == "pending" && admin.loggedIn == "pending" ? "h-1/2" : "h-0"
        } fixed top-0 z-50 w-screen bg-background duration-500`}
      ></div>
      <div
        className={`${
          user.loggedIn == "pending" && admin.loggedIn == "pending" ? "h-1/2" : "h-0"
        } fixed bottom-0 z-50 w-screen bg-background duration-500`}
      ></div>
      {user.loggedIn == "true" ? (
        <RouterProvider router={router} />
      ) : admin.loggedIn == "admin" ? (
        <RouterProvider router={admin_router} />
      ) : user.loggedIn == "false" ? (
        <BrowserRouter>
          <>
            {/* <Navigate to="/login" /> */}
            <Routes>
              <Route
                path="/"
                element={
                  <Navigation>
                    <Home />
                  </Navigation>
                }
              />
              <Route path="/admin/login" element={<Login />} />
            </Routes>
          </>
        </BrowserRouter>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center text-3xl text-primary">
          <div className="bars"></div>
        </div>
      )}
    </article>
  );
}

export default App;
