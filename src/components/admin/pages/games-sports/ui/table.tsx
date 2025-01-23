import React from "react";
import { games } from "../mock-data";
import { generateRandomNumber } from "../../../../../lib/utils/generateRandomNumber";
import { generateRandomColor } from "../../../../../lib/utils/generate-random-color";
import { useGlobalContext } from "../../../../../lib/global-context";
import { formattedNumber } from "../../../../../lib/utils/formattedNumber";

export default function Table() {
  const { game_and_sport_stats } = useGlobalContext().admin;

  return (
    <section className="w-full overflow-x-auto custom-scrollbar bg-advance mt-3 rounded-md border border-gray">
      <div className="w-fit min-w-full flex gap-14 items-center justify-between text-grey text-sm font-normal pr-7 h-11 font-advance capitalize">
        <div className="flex gap-14 items-center justify-between rounded-lg bg-Red sticky left-0 top-0 w-fit pl-6 pr-5 bg-advance">
          <div className="w-32">Game/Sport Name</div>
          <div className="w-28">active players</div>
        </div>
        <div className="w-28 text-center">Players Win Rate</div>
        <div className="w-32 text-center">Players Loss Rate</div>
        <div className="w-28 text-center">Total Payout ($)</div>
        <div className="w-32 text-center">Average Bet Siz ($)</div>
        <div className="w-20 text-center">Session</div>
      </div>
      {game_and_sport_stats.map(
        (
          {
            game,
            activePlayers,
            winRate,
            lossRate,
            totalPayout,
            averageBetSize,
            totalPlays,
          },
          idx
        ) => (
          <section
            key={idx}
            className="w-fit min-w-full flex gap-14 items-center justify-between text-base font-normal pr-7 h-11 font-advance capitalize even:bg-dark"
          >
            <div
              className={`flex gap-14 h-full items-center justify-between rounded-lg bg-Red sticky left-0 top-0 w-fit pl-6 pr-5 bg-advance ${
                idx % 2 == 0 && " bg-dark"
              }`}
            >
              <div
                style={{ color: generateRandomColor() }}
                className="w-32 text-shadow-sm font-semibold whitespace-nowrap"
              >
                {game}
              </div>
              <div className="w-28 text-center">
                {Math.round(activePlayers)}
              </div>
            </div>
            <div className="w-28 text-center">
              <div className="flex w-12 rounded-sm justify-center mx-auto bg-success/20 text-success py-0.5 px-2">
                +{Math.round(winRate)}%
              </div>{" "}
            </div>
            <div className="w-32 text-center">
              <div className="flex w-12 rounded-sm justify-center mx-auto bg-error/20 text-error py-0.5 px-2">
                -{Math.round(lossRate)}%
              </div>{" "}
            </div>
            <div className="w-28 text-center">
              {formattedNumber(totalPayout)}
            </div>
            <div className="w-32 text-center">
              {formattedNumber(averageBetSize)}
            </div>
            <div className="w-20 text-center">{generateRandomNumber()}k</div>
          </section>
        )
      )}
    </section>
  );
}
