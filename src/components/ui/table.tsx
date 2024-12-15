import React, { useState } from "react";
import { Icons } from "./icons";
import { useGlobalContext } from "../../lib/global-context";
import formatDateToTime from "../../lib/utils/formatDateToTime";
import { gameHistory, userData } from "../../lib/types";

export default function Table({
  title,
  data,
  filterLabels,
  setFilterLabels,
}: {
  title: string;
  data?: gameHistory[];
  filterLabels: string[];
  setFilterLabels: React.Dispatch<string[]>;
}) {
  const [count, setCount] = useState(6);
  const { user }: any = useGlobalContext();

  const handleFilterChange = (name: string) => {
    const label = filterLabels.find((e) => e == name);
    if (label) {
      setFilterLabels(filterLabels.filter((e: string) => e != name));
    } else {
      if (name == "all bets") {
        const labels = filterLabels.filter((e) => e != user.info._id);
        setFilterLabels([...labels, name]);
      } else if (name == user.info._id) {
        const labels = filterLabels.filter((e) => e != "all bets");
        setFilterLabels([...labels, name]);
      } else if (name == "win") {
        const labels = filterLabels.filter((e) => e != "loss");
        setFilterLabels([...labels, name]);
      } else if (name == "loss") {
        const labels = filterLabels.filter((e) => e != "win");
        setFilterLabels([...labels, name]);
      } else {
        setFilterLabels([...filterLabels, name]);
      }
    }
  };

  return (
    <article className=" bg-advance rounded-3xl p-4 pt-6">
      <div className="flex justify-between items-center text-4xl font-semibold text-primary">
        {title}
      </div>
      <section className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex items-center mt-5 gap-4 w-fit">
          {[
            { value: "all bets", label: "all bets" },
            { value: `${user.info._id}`, label: "my bets" },
            { value: "win", label: "win" },
            { value: "loss", label: "loss" },
            // { value: "leaderboard", label: " leaderboard" },
          ].map(({ label, value }) => (
            <div
              key={label}
              onClick={() => {
                handleFilterChange(value);
              }}
              className={`${
                filterLabels.find((e) => e == value)
                  ? " bg-primary/80 text-dark"
                  : "border-primary/60 text-primary/80 "
              } flex items-center px-4 h-12 rounded-lg border text-base font-semibold cursor-pointer truncate duration-300 capitalize`}
            >
              {label}
            </div>
          ))}
          <div className=" px-4 h-12 rounded-lg border border-primary/60 text-primary/80 text-base font-semibold cursor-pointer flex items-center gap-3">
            {count}
            <div className="">
              <Icons.arrow
                onClick={() => setCount(count + 1)}
                color="#ffffff90"
                className=" -rotate-90 h-4 cursor-pointer"
              />
              <Icons.arrow
                onClick={() => setCount(count - 1)}
                color="#ffffff90"
                className=" rotate-90 h-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>
      <main className="w-full overflow-x-auto mt-9 custom-scrollbar rounded-lg">
        <div className="bg-Red w-fit min-w-full flex gap-14 items-center justify-between text-white font-medium pr-7 rounded-xl h-14">
          <div className="flex gap-14 items-center justify-between rounded-lg bg-Red sticky left-0 top-0 w-fit pl-7 bg-advance">
            <div className="w-36">Game</div>
            <div className="w-36">User</div>
          </div>
          <div className="w-36">Time</div>
          <div className="w-36">Bet Amount</div>
          <div className="w-36">Multiplier</div>
          <div className="w-36">Payout</div>
        </div>
        {data?.map(
          (
            {
              betAmount,
              createdAt,
              game,
              multiplier,
              payout,
              result,
              username,
            },
            id
          ) => (
            <div
              key={id}
              className="bg-advance h-14 w-fit min-w-full flex gap-14 items-center justify-between text-primary/80 font-medium text-base pr-7 border-gray border-t"
            >
              <div className="flex gap-14 items-center justify-between h-full sticky left-0 top-0 w-fit pl-7 bg-advance ">
                <div className="w-36">{game}</div>
                <div className="w-36">{username}</div>
              </div>
              <div className="w-36">{formatDateToTime(createdAt)}</div>
              <div className="w-36">{betAmount?.toFixed(1)} SOL</div>
              <div className="w-36">{multiplier?.toFixed(1)} x</div>
              <div className="w-36">
                {result == "loss" && "-"}
                {payout}
              </div>
            </div>
          )
        )}
      </main>
    </article>
  );
}
