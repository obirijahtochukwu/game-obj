import React from "react";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function TopPlayers() {
  const { topPlayers } = useGlobalContext().admin;

  const bet_counts = topPlayers.reduce((acc, item) => acc + item.betCount, 0);
  console.log(bet_counts);

  return (
    <article className="col-span-5 min-h-64 p-5 bg-advance border-gray border rounded-md">
      <div className="text-base font-medium mb-8">Top players</div>
      {topPlayers.map(({ username, userId, betCount }, idx) => (
        <section
          key={idx}
          className="flex items-center gap-2 font-advance mt-5"
        >
          <img src="/media/user.png" alt="" className="h-7 w-7 rounded-full" />
          <div>
            <div className=" text-sm font-medium">{username}</div>
            <div className="text-xs font-medium text-grey truncate">
              {userId.email}
            </div>
          </div>
          <div className="ml-auto text-sm font-medium">
            {Math.round((betCount / bet_counts) * 100)}%
          </div>
        </section>
      ))}
    </article>
  );
}
