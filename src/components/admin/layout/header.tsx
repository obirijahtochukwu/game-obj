import React from "react";
import { Icons } from "../../ui/icons";

export default function Header() {
  return (
    <article className="text-primary flex items-center py-7 h-fit w-full">
      <div className="text-xl font-semibold mr-14">Users</div>
      <section className="w-full max-w-96 h-10 bg-advance rounded-sm flex items-center gap-2 px-3 border-gray border max-lg:hidden">
        <Icons.search className="w-4 h-4" />{" "}
        <input
          type="search"
          className="h-full w-full bg-transparent focus:outline-none"
          placeholder="Search for..."
        />
      </section>
      <div className="bg-pink h-9 px-8 flex items-center justify-center rounded-sm text-primary font-semibold cursor-pointer whitespace-nowrap ml-auto">
        Approve user
      </div>
    </article>
  );
}
