import React from "react";
import { useGlobalContext } from "../../../../lib/global-context";
import { generateRandomColor } from "../../../../lib/utils/generate-random-color";
import { formattedNumber } from "../../../../lib/utils/formattedNumber";
import NoActivity from "../../../ui/no-activity";

export default function Table() {
  const { games } = useGlobalContext().user.info;

  const no_activity = games?.length < 1;

  return (
    <article className="col-span-12 mt-5">
      <div className="text-xl font-semibold">Active Games/Sports</div>
      <main
        className={`${no_activity ? "overflow-hidden" : "overflow-x-auto"} custom-scrollbar mt-3 w-full rounded-md border border-gray bg-advance`}
      >
        <div className="flex h-11 w-fit min-w-full items-center justify-between gap-14 pr-7 font-advance text-sm font-normal capitalize text-grey">
          <div className="bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6 pr-5">
            <div className="w-32">Game/Sport Name</div>
            <div className="w-20 text-center">Session</div>
          </div>
          <div className="w-28 text-center">Win Rate</div>
          <div className="w-32 text-center">Loss Rate</div>
          <div className="w-28 text-center">Total Payout ($)</div>
          <div className="w-32 text-center">Average Bet Siz ($)</div>
        </div>
        {games?.map(({ game, totalPlays, count, averageBetSize, profit, winRate, lossRate }, idx: number) => (
          <section
            key={idx}
            className="flex h-11 w-fit min-w-full items-center justify-between gap-14 pr-7 font-advance text-base font-normal capitalize even:bg-dark"
          >
            <div
              className={`bg-Red sticky left-0 top-0 flex h-full w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6 pr-5 ${
                idx % 2 == 0 && "bg-dark"
              }`}
            >
              <div style={{ color: generateRandomColor() }} className="text-shadow-sm w-32 whitespace-nowrap font-semibold">
                {game}
              </div>
              <div className="w-20 text-center">{count}</div>
            </div>
            <div className="w-28 text-center">
              <div className="mx-auto flex w-12 justify-center rounded-sm bg-success/20 px-2 py-0.5 text-success">
                +{Math.round(winRate)}%
              </div>
            </div>
            <div className="w-32 text-center">
              <div className="mx-auto flex w-12 justify-center rounded-sm bg-error/20 px-2 py-0.5 text-error">
                -{Math.round(lossRate)}%
              </div>
            </div>
            <div className="w-28 text-center">{formattedNumber(profit)}</div>
            <div className="w-32 text-center">{formattedNumber(averageBetSize)}</div>
          </section>
        ))}
        {games?.length < 1 && <NoActivity />}
      </main>
    </article>
  );
}
