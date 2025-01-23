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
    <article className={`welcome-anime flex p-4 md:p-7`}>
      <Signup {...props} />
      <Login {...props} />
      {user.loggedIn == "true" && <Leftbar {...props} />}

      <section
        className={`${isOpen ? "md:w-[calc(100%-274px)]" : "w-full md:w-[calc(100%-120px)]"} ${
          user.loggedIn == "false" ? "!w-full" : "md:ml-7"
        } flex flex-col gap-7 duration-300`}
      >
        <nav className="flex h-14 items-center gap-4 py-0.5 max-md:justify-between">
          <Link to={"/"} className="text-lg font-semibold tracking-tighter text-primary md:mr-auto md:text-5xl">
            Webet
          </Link>
          <div className="flex h-full w-full max-w-lg items-center gap-2.5 rounded-xl border border-muted bg-advance p-4 text-primary backdrop-blur-md max-lg:hidden">
            <Icons.search />
            <input
              type="text"
              className="h-full w-full bg-transparent text-lg font-normal tracking-tight focus:outline-none"
              placeholder=""
            />
          </div>
          {user.loggedIn == "true" ? (
            <button
              onClick={logout}
              className="flex h-full w-44 items-center justify-center gap-2 rounded-xl bg-gradient-custom text-base font-semibold text-primary max-md:h-11 md:w-56 md:text-xl"
            >
              {" "}
              <Icons.wallet />
              logout
            </button>
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
    </article>
  );
}
