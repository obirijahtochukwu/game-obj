import React from "react";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function TopPlayers() {
  const { topPlayers } = useGlobalContext().admin;

  const bet_counts = topPlayers.reduce((acc, item) => acc + item.betCount, 0);

  return (
    <article className="col-span-5 min-h-64 rounded-md border border-gray bg-advance p-5">
      <div className="mb-8 text-base font-medium">Top players</div>
      {topPlayers.map(({ username, email, betCount, profileImage }, idx) => (
        <section key={idx} className="mt-5 flex items-center gap-2 font-advance">
          <img src={profileImage} alt="" className="h-7 w-7 rounded-full" />
          <div>
            <div className="text-sm font-medium">{username}</div>
            <div className="truncate text-xs font-medium text-grey">{email}</div>
          </div>
          <div className="ml-auto text-sm font-medium">{Math.round((betCount / bet_counts) * 100)}%</div>
        </section>
      ))}
    </article>
  );
}
