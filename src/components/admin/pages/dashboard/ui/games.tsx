import React from "react";
import ReactApexChart from "react-apexcharts";
import { betting_activity_chart } from "../mock-data";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function Games() {
  const { topGames } = useGlobalContext().admin;

  const totalPlays = topGames.reduce((acc, game) => acc + game.count, 0);

  const { options, series } = betting_activity_chart(totalPlays, topGames);

  return (
    <article className="-z-10 col-span-12 h-[420px] rounded-md border border-gray bg-advance p-5 max-lg:overflow-y-hidden lg:col-span-5 lg:h-full">
      <div className="text-base font-medium">Most Popular Games/Sports</div>
      <div className="">
        <ReactApexChart
          // @ts-ignore
          options={options}
          series={series}
          type="radialBar"
        />
      </div>
      <section className="relative flex flex-col gap-6 font-advance max-lg:-top-40">
        {topGames.map(({ game, count }, idx) => (
          <div className="flex items-center gap-2 text-base font-medium">
            <div className={`${idx == 0 ? "bg-pink" : idx == 1 ? "bg-[#0E43FB]" : "bg-[#00C2FF]"} h-2 w-2 rounded-full`} />
            <div className="mr-auto text-grey">{game}</div>
            {Math.round((count / totalPlays) * 100)}%
          </div>
        ))}
      </section>
    </article>
  );
}
