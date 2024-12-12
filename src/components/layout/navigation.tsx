import React, { useEffect, useState } from "react";
import { Icons } from "../ui/icons";
import { pages } from "./mock-data";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useClick } from "../../lib/hooks/useclick";
import { Sidebar } from "./sidebar";
import axios from "axios";
import Signup from "../../auth/signup";
import Leftbar from "./leftbar";
import { useGlobalContext } from "../../lib/context";
import Login from "../../auth/login";

export default function Navigation({ children }: { children: JSX.Element }) {
  const { logout, userLoggedIn } = useGlobalContext();
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
    <article className="p-4 md:p-7 flex">
      <Signup {...props} />
      <Login {...props} />
      {userLoggedIn == "true" && <Leftbar {...props} />}

      <section
        className={`${
          isOpen ? " md:w-[calc(100%-274px)]" : "md:w-[calc(100%-120px)] w-full"
        } ${
          userLoggedIn == "false" ? "!w-full" : "md:ml-7"
        } flex flex-col gap-7 duration-300`}
      >
        <nav className="flex items-center max-md:justify-between gap-4 h-14 py-0.5">
          <Link
            to={"/"}
            className=" text-lg md:text-5xl font-semibold text-primary tracking-tighter md:mr-auto"
          >
            Webet
          </Link>
          <div className=" h-full w-full max-lg:hidden max-w-lg rounded-xl bg-primary/10 backdrop-blur-md border border-muted p-4 flex items-center gap-2.5 text-primary">
            <Icons.search />
            <input
              type="text"
              className=" h-full w-full bg-transparent focus:outline-none text-lg font-normal tracking-tight"
              placeholder=""
            />
          </div>
          {userLoggedIn == "true" ? (
            <button
              onClick={logout}
              className=" bg-secondary flex items-center justify-center max-md:h-11 w-44 md:w-56 h-full gap-2 rounded-xl text-base md:text-xl font-semibold text-primary"
            >
              {" "}
              <Icons.wallet />
              logout
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsLogin(true)}
                className="flex items-center justify-center max-md:h-11 w-fit h-full px-4 gap-2 rounded-xl text-base md:text-xl font-semibold text-primary"
              >
                Sign in
              </button>
              <button
                onClick={() => setIsSignup(true)}
                className=" bg-secondary flex items-center justify-center max-md:h-11 w-fit h-full px-4 gap-2 rounded-xl text-base md:text-xl font-semibold text-primary"
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
