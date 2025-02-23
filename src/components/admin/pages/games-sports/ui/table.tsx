import React from "react";
import { generateRandomColor } from "../../../../../lib/utils/generate-random-color";
import { useGlobalContext } from "../../../../../lib/global-context";
import { formattedNumber } from "../../../../../lib/utils/formattedNumber";
import usePagination from "../../../../../lib/hooks/usePagination";

export default function Table() {
  const { game_and_sport_stats } = useGlobalContext().admin;

  const isTableEmpty = game_and_sport_stats?.length < 1;
  const itemsPerPage = 6;
  const totalPages = isTableEmpty ? 0 : Math.ceil(game_and_sport_stats?.length / itemsPerPage);

  const { PaginationWithDots, visisbleData } = usePagination({
    totalPages,
    data: isTableEmpty ? [] : game_and_sport_stats,
    itemsPerPage,
  });

  return (
    <>
      <div className="mt-7 flex items-center justify-between font-advance text-xl font-semibold">
        Available Games/Sports
        <PaginationWithDots />
      </div>
      <section className="custom-scrollbar mt-3 min-h-80 w-full overflow-x-auto rounded-md border border-gray bg-advance">
        <div className="flex h-11 w-fit min-w-full items-center justify-between gap-14 pr-7 font-advance text-sm font-normal capitalize text-grey">
          <div className="bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6 pr-5">
            <div className="w-32">Game/Sport Name</div>
            <div className="w-28">active players</div>
          </div>
          <div className="w-28 text-center">Players Win Rate</div>
          <div className="w-32 text-center">Players Loss Rate</div>
          <div className="w-28 text-center">Total Payout ($)</div>
          <div className="w-32 text-center">Average Bet Siz ($)</div>
          <div className="w-20 text-center">Session</div>
        </div>
        {visisbleData.map(({ game, activePlayers, winRate, lossRate, totalPayout, averageBetSize, session }, idx) => (
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
              <div className="w-28 text-center">{Math.round(activePlayers)}</div>
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
            <div className="w-28 text-center">{formattedNumber(totalPayout)}</div>
            <div className="w-32 text-center">{formattedNumber(averageBetSize)}</div>
            <div className="w-20 text-center">{session}</div>
          </section>
        ))}
      </section>
    </>
  );
}
