import React, { useState } from "react";
import { Icons } from "../../../ui/icons";

export default function Details() {
  const [tab, setTab] = useState("All Bets");
  const [count, setCount] = useState(6);

  return (
    <article className=" bg-advance rounded-3xl p-4 pt-6">
      <div className="flex justify-between items-center text-4xl font-semibold text-primary">
        Plinko
      </div>
      <section className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex items-center mt-5 gap-4 w-fit">
          {["All Bets", "My Bets", "High Rollers", "Race Leaderboard"].map(
            (label) => (
              <div
                key={label}
                onClick={() => setTab(label)}
                className={`${
                  tab == label
                    ? " bg-primary/80 text-dark"
                    : "border-primary/60 text-primary/80 "
                } flex items-center px-4 h-12 rounded-lg border text-base font-semibold cursor-pointer truncate duration-300`}
              >
                {label}
              </div>
            )
          )}
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
        {Array(8)
          .fill("")
          .map((n, id) => (
            <div
              key={id}
              className="bg-advance h-14 w-fit min-w-full flex gap-14 items-center justify-between text-primary/80 font-medium text-base pr-7 border-gray border-t"
            >
              <div className="flex gap-14 items-center justify-between h-full sticky left-0 top-0 w-fit pl-7 bg-advance ">
                <div className="w-36">Dice</div>
                <div className="w-36">User343</div>
              </div>
              <div className="w-36">03:24 PM</div>
              <div className="w-36">0.000005 SOL</div>
              <div className="w-36">2.00 x</div>
              <div className="w-36">-0.0000005</div>
            </div>
          ))}
      </main>
    </article>
  );
}
