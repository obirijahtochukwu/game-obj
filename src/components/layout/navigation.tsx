import React, { useEffect, useState } from "react";
import { Icons } from "../ui/icons";
import { pages } from "./mock-data";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useClick } from "../../lib/hooks/useclick";
import { Sidebar } from "./sidebar";
import axios from "axios";
import Signup from "../../auth/signup";
import Leftbar from "./leftbar";
import { useGlobalContext } from "../../lib/global-context";
import Login from "../../auth/login";
import UserPopup from "../ui/user-popup";

export default function Navigation({ children }: { children: JSX.Element }) {
  const { logout, user } = useGlobalContext();
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { isOpen, setIsOpen, targetRef } = useClick.auto();
  const pathname = useLocation().pathname;

  const props = {
    isSignup,
    setIsSignup,
    targetRef,
    isOpen,
    setIsOpen,
    pathname,
    isLogin,
    setIsLogin,
  };

  return (
    <article className={`welcome-anime flex p-4 backdrop-blur-2xl md:p-7`}>
      <Signup {...props} />
      <Login {...props} />
      {user.loggedIn == "true" && <Leftbar {...props} />}
      <div className="w-full">
        <div className="grid grid-cols-1">
          <section
            className={`${isOpen ? "" : ""} ${
              user.loggedIn == "false" ? "!w-full" : "md:ml-7"
            } flex flex-col gap-7 text-primary duration-300`}
          >
            <nav className="flex h-14 items-center gap-7 py-0.5 max-md:justify-between">
              <Link to={"/"} className="text-lg font-semibold tracking-tighter text-primary md:mr-auto md:text-5xl">
                Webet
              </Link>
              <div className="flex h-11 w-80 items-center gap-2.5 rounded-md border border-muted bg-advance px-4 text-primary backdrop-blur-md max-lg:hidden">
                <Icons.search />
                <input
                  type="text"
                  className="h-full w-full bg-transparent font-advance text-lg font-normal tracking-tight focus:outline-none"
                  placeholder="Search..."
                />
              </div>
              {user.loggedIn == "true" ? (
                <aside onClick={logout} className="flex cursor-pointer items-center gap-3">
                  <Icons.signout className="h-5 w-fit text-primary" /> Sign out
                </aside>
              ) : (
                <>
                  <button
                    onClick={() => setIsLogin(true)}
                    className="flex h-full w-fit items-center justify-center gap-2 rounded-xl px-4 text-base font-semibold text-primary max-md:h-11 md:text-xl"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => setIsSignup(true)}
                    className="flex h-full w-fit items-center justify-center gap-2 rounded-xl bg-white px-4 text-base font-semibold text-background max-md:h-11 md:text-xl"
                  >
                    Register
                  </button>
                </>
              )}
              <Sidebar pathname={pathname} />
            </nav>
            {children}
          </section>
        </div>
      </div>
    </article>
  );
}
