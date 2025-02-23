import React from "react";
import { generateRandomNumber } from "../../../../../lib/utils/generateRandomNumber";
import { generateRandomColor } from "../../../../../lib/utils/generate-random-color";
import { formattedNumber } from "../../../../../lib/utils/formattedNumber";
import { randomData } from "../../../../../lib/utils";
import SkeletonLoader from "../../../../ui/skeleton";
import NoActivity from "../../../../ui/no-activity";
import usePagination from "../../../../../lib/hooks/usePagination";
// import { games } from "../../games-sports/mock-data";

export default function Table({ userDetails, isLoading }: any) {
  const { games } = userDetails;
  const isTableEmpty = games?.length < 1;
  const itemsPerPage = 5;
  const totalPages = isTableEmpty ? 0 : Math.ceil(games?.length / itemsPerPage);

  const { PaginationWithDots, visisbleData } = usePagination({
    totalPages,
    data: isTableEmpty ? [] : games,
    itemsPerPage,
  });

  return (
    <article className="col-span-12">
      <div className="flex items-center justify-between text-xl font-semibold">
        Active Games/Sports
        <PaginationWithDots />
      </div>
      <article
        className={`custom-scrollbar mt-3 w-full rounded-md border border-gray bg-advance ${isTableEmpty ? "overflow-x-hidden" : "overflow-x-auto"}`}
      >
        <div className="flex h-11 w-fit min-w-full items-center justify-between gap-14 pr-7 font-advance text-sm font-normal capitalize text-grey">
          <div className="bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6 pr-5">
            <div className="w-32">Game/Sport Name</div>
            <div className="w-20 text-center">Session</div>
          </div>
          <div className="w-28 text-center">Player Win Rate</div>
          <div className="w-32 text-center">Player Loss Rate</div>
          <div className="w-28 text-center">Total Payout ($)</div>
          <div className="w-32 text-center">Average Bet Siz ($)</div>
        </div>
        {isLoading ? (
          randomData(5).map(() => <SkeletonLoader height="h-11" />)
        ) : isTableEmpty ? (
          <NoActivity />
        ) : (
          visisbleData?.map(({ game, totalPlays, count, averageBetSize, profit, winRate, lossRate }, idx: number) => (
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
          ))
        )}
      </article>
    </article>
  );
}
