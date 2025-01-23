import React from "react";
import { overview } from "../mock-data";
import { Icons } from "../../../../ui/icons";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function Header() {
  const { new_signups, user_growth, topPlayers, inactive_users } = useGlobalContext().admin;

  return (
    <section className="grid grid-cols-2 gap-7 text-primary lg:grid-cols-4">
      {overview(new_signups, user_growth, topPlayers, inactive_users).map(({ label, count, color, Icon }) => (
        <div className="flex h-16 items-center gap-3 rounded-lg border border-gray bg-advance p-3">
          <div style={{ background: color + "40" }} className="flex h-10 w-10 items-center justify-center rounded-full">
            <Icon />
          </div>
          <div>
            <div className="text-base font-medium">{label}</div>
            <div className="text-xs font-medium opacity-60">{count}</div>
          </div>
          <Icons.dot_bar className="ml-auto cursor-pointer" />
        </div>
      ))}
    </section>
  );
}
