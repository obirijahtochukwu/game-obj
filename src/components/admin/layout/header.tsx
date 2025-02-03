import React from "react";
import { Icons } from "../../ui/icons";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../lib/global-context";

export default function Header() {
  const pathname = useLocation().pathname;
  const { logout, setIsLogin } = useGlobalContext();

  return (
    <article className="flex h-fit w-full items-center py-7 text-primary">
      <div className="mr-14 font-advance text-xl font-bold capitalize">{pathname.split("/").pop()}</div>
      <section className="flex h-10 w-full max-w-96 items-center gap-2 rounded-sm border border-gray bg-advance px-3 max-lg:hidden">
        <Icons.search className="h-4 w-4" />{" "}
        <input type="search" className="h-full w-full bg-transparent focus:outline-none" placeholder="Search for..." />
      </section>
      <div
        onClick={logout}
        className="ml-auto flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-pink px-8 font-semibold text-primary shadow-sm"
      >
        Logout
      </div>
    </article>
  );
}
