import React from "react";
import { Icons } from "../ui/icons";
import { Link } from "react-router-dom";
import { pages } from "./mock-data";

export default function Leftbar({
  targetRef,
  isOpen,
  setIsOpen,
  pathname,
}: {
  targetRef: React.LegacyRef<HTMLInputElement | any>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  pathname: string;
}) {
  return (
    <aside
      ref={targetRef}
      className={`${
        isOpen ? "group" : ""
      } sticky z-50 backdrop-blur-md top-7 min-w-24 w-fit overflow-x-hidden h-[calc(100vh-56px)] bg-advance rounded-xl py-9 px-5 duration-300 flex flex-col items-center gap-6 max-md:hidden`}
    >
      <div
        onClick={() => window.innerWidth > 1000 && setIsOpen(!isOpen)}
        className={`${
          isOpen ? "w-56 justify-start pl-4" : "w-12 justify-center"
        } h-11 duration-500 overflow-hidden flex items-center gap-2 rounded-sm cursor-pointer`}
      >
        {isOpen ? <Icons.close /> : <Icons.bar className="h-8 w-8" />}
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
            className={`${idx == 0 ? "mt-20" : idx == 3 ? " mt-auto" : null} ${
              pathname == url ? "bg-primary/20" : ""
            } ${
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
  );
}
