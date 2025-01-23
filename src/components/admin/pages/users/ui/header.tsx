import React from "react";
import { overview } from "../mock-data";
import { Icons } from "../../../../ui/icons";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function Header() {
  const { new_signups, user_growth, topPlayers, inactive_users } =
    useGlobalContext().admin;

  return (
    <section className=" grid grid-cols-4 gap-7 text-primary">
      {overview(new_signups, user_growth, topPlayers, inactive_users).map(
        ({ label, count, color, Icon }) => (
          <div className=" h-16 rounded-lg border border-gray bg-advance flex items-center gap-3 p-3">
            <div
              style={{ background: color + "40" }}
              className="h-10 w-10 rounded-full flex items-center justify-center"
            >
              <Icon />
            </div>
            <div>
              <div className=" text-base font-medium">{label}</div>
              <div className=" text-xs font-medium opacity-60">{count}</div>
            </div>
            <Icons.dot_bar className="ml-auto cursor-pointer" />
          </div>
        )
      )}
    </section>
  );
}
