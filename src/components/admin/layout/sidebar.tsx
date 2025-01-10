import React from "react";
import { Icons } from "../../ui/icons";
import { pages } from "./mock-data";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <article className="sticky top-0 left-0 min-w-72 h-screen border-r border-advance p-7 text-primary flex flex-col max-lg:hidden">
      <div className=" text-xl font-semibold">Webnet X</div>
      <section className=" w-full h-10 bg-advance rounded-md flex items-center gap-2 px-3 border-gray border mt-11 mb-7">
        <Icons.search className="w-4 h-4" />{" "}
        <input
          type="search"
          className="h-full w-full bg-transparent focus:outline-none"
          placeholder="Search for..."
        />
      </section>
      <section className="flex flex-col gap-2 text-base font-medium">
        <div className="border-l-2 border-transparent pl-3 opacity-80 text-sm">
          All pages
        </div>
        {pages.map(({ title, url }, idx) => (
          <Link
            to={url}
            key={title}
            className={`${
              idx == 3 ? " bg-dark border-pink" : " border-transparent"
            } h-11 flex items-center pl-3 border-l-2 rounded-sm`}
          >
            {title}
          </Link>
        ))}
      </section>
      <div className="flex items-center gap-2 mt-auto p-3 bg-advance rounded-xl">
        <img
          src="/media/home/assassins.png"
          alt=""
          className="h-10 w-10 rounded-full"
        />
        <div className="w-full">
          <div className="text-base font-medium leading-none">John Carter</div>
          <div className="text-sm font-medium flex justify-between items-center opacity-80">
            Account settings
            <Icons.arrow className="h-3" color="#ffffff" />
          </div>
        </div>
      </div>
    </article>
  );
}
