import React, { useState } from "react";
import { Icons } from "../ui/icons";
import { pages } from "./mock-data";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useClick } from "../../lib/hooks/useclick";

export default function Navigation({ children }: { children: JSX.Element }) {
  const { isOpen, setIsOpen, targetRef } = useClick();
  const pathname = useLocation().pathname;
  return (
    <article className=" p-7 flex">
      <aside
        ref={targetRef}
        className={`${
          isOpen ? "group" : ""
        } sticky z-50 backdrop-blur-md top-7 min-w-24 w-fit overflow-x-hidden h-[calc(100vh-56px)] bg-[#313131] rounded-xl py-9 px-5 duration-300 flex flex-col items-center gap-6`}
      >
        <div
          onClick={() => setIsOpen(true)}
          className={`${
            isOpen ? "w-56 justify-start pl-4" : "w-12 justify-center"
          } h-11 duration-500 overflow-hidden flex items-center gap-2 rounded-sm cursor-pointer`}
        >
          <Icons.bar className="h-8 w-8" />{" "}
          <div
            className={`${
              isOpen
                ? "tracking-normal opacity-100"
                : "opacity-0 -tracking-[100px]"
            } duration-500 text-primary font-medium text-xl`}
          >
            Menu
          </div>
        </div>
        <>
          {pages.map(({ label, Icon, url }, idx) => (
            <Link
              to={url}
              key={idx}
              className={`${
                idx == 0 ? "mt-20" : idx == 3 ? " mt-auto" : null
              } ${pathname == url ? "bg-primary/20" : ""} ${
                isOpen ? "w-56 justify-start pl-4 gap-2" : "w-12 justify-center"
              } h-12 duration-500 overflow-hidden flex items-center rounded-3xl cursor-pointer text-xl font-medium text-primary`}
            >
              <Icon className="h-7 w-7" />
              <div
                className={`${
                  isOpen
                    ? "tracking-normal opacity-100"
                    : "opacity-0 -tracking-[100px]"
                } duration-500`}
              >
                {label}
              </div>
            </Link>
          ))}
        </>
      </aside>
      <section
        className={`${
          isOpen ? " w-[calc(100%-274px)]" : "w-[calc(100%-120px)]"
        } flex flex-col gap-7 ml-7 duration-300`}
      >
        <nav className="flex items-center gap-4 h-14 py-0.5">
          <div className=" text-5xl font-semibold text-primary tracking-tighter">
            Webet
          </div>
          <div className=" h-full w-full max-w-lg rounded-xl bg-primary/10 backdrop-blur-md border border-muted p-4 flex items-center gap-2.5 ml-auto text-primary">
            <Icons.search />
            <input
              type="text"
              className=" h-full w-full bg-transparent focus:outline-none text-lg font-normal tracking-tight"
              placeholder=""
            />
          </div>
          <button className=" bg-secondary flex items-center justify-center w-56 h-full gap-2 rounded-xl text-xl font-semibold text-primary">
            {" "}
            <Icons.wallet />
            Connect Wallet
          </button>
        </nav>
        {children}
      </section>
    </article>
  );
}
