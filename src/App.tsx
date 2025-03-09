import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Router, RouterProvider, Routes } from "react-router-dom";
import { router } from "./lib/routes";
import { useGlobalContext } from "./lib/global-context";
import { admin_router } from "./lib/admin-routes";
import Login from "./components/admin/auth/login";
import Signup from "./components/admin/auth/signup";

function App() {
  const { user, admin, setIsLogin } = useGlobalContext();

  return (
    <article className="font-primary">
      <aside
        style={{
          // background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url("./media/Background.png")`,
          backgroundColor: "transparent",
        }}
        className="!fixed bottom-0 top-0 -z-10 w-screen bg-opacity-10 bg-cover bg-fixed bg-center bg-no-repeat"
      />
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

      {admin.loggedIn == "admin" ? (
        <RouterProvider router={admin_router} />
      ) : user.loggedIn == "false" || user.loggedIn == "true" ? (
        <>
          <BrowserRouter>
            <>
              <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/signup" element={<Signup />} />
              </Routes>
            </>
          </BrowserRouter>

          <RouterProvider router={router} />
        </>
      ) : null}
    </article>
  );
}

export default App;
