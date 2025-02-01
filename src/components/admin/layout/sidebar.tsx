import React from "react";
import { Icons } from "../../ui/icons";
import { pages } from "./mock-data";
import { Link, useLocation } from "react-router-dom";
import { backgroundImage } from "../../../lib/utils";

export default function Sidebar() {
  const pathname = useLocation().pathname;
  return (
    <article
      style={{ backgroundImage: backgroundImage }}
      className="max-lg:hdden sticky left-0 top-0 flex h-screen min-w-72 flex-col border-r border-advance p-7 text-primary"
    >
      <div className="text-xl font-semibold">Webnet X</div>
      <section className="mb-7 mt-11 flex h-10 w-full items-center gap-2 rounded-md border border-gray bg-advance px-3">
        <Icons.search className="h-4 w-4" />{" "}
        <input type="search" className="h-full w-full bg-transparent focus:outline-none" placeholder="Search for..." />
      </section>
      <section className="flex flex-col gap-2 text-base font-medium">
        <div className="border-l-2 border-transparent pl-3 font-advance text-sm opacity-80">All pages</div>
        {pages.map(({ title, url }, idx) => (
          <Link
            to={url}
            key={title}
            className={`${
              pathname == url ? "border-pink bg-dark" : "border-transparent"
            } flex h-11 items-center rounded-sm border-l-2 pl-3 duration-300`}
          >
            {title}
          </Link>
        ))}
      </section>
      <div className="mt-auto flex items-center gap-2 rounded-xl bg-advance p-3">
        <img src="/media/home/assassins.png" alt="" className="h-10 w-10 rounded-full" />
        <div className="w-full">
          <div className="text-base font-medium leading-none">John Carter</div>
          <div className="flex items-center justify-between text-sm font-medium opacity-80">
            Account settings
            <Icons.arrow className="h-3" color="#ffffff" />
          </div>
        </div>
      </div>
    </article>
  );
}
