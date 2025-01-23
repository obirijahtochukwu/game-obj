import React from "react";
import ReactApexChart from "react-apexcharts";
import { betting_activity_chart } from "../mock-data";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function Games() {
  const { topGames } = useGlobalContext().admin;

  const totalPlays = topGames.reduce((acc, game) => acc + game.count, 0);

  const { options, series } = betting_activity_chart(totalPlays, topGames);

  return (
    <article className="col-span-5 h-full p-5 bg-advance border-gray border rounded-md">
      <div className=" text-base font-medium">Most Popular Games/Sports</div>
      <div className="">
        <ReactApexChart
          // @ts-ignore
          options={options}
          series={series}
          type="radialBar"
        />
      </div>
      <section className=" font-advance flex flex-col gap-6">
        {topGames.map(({ _id, count }, idx) => (
          <div className="flex items-center gap-2 font-medium text-base">
            <div
              className={`${
                idx == 0
                  ? "bg-pink"
                  : idx == 1
                  ? "bg-[#0E43FB]"
                  : "bg-[#00C2FF]"
              } w-2 h-2 rounded-full`}
            />
            <div className=" text-grey mr-auto">{_id}</div>
            {Math.round((count / totalPlays) * 100)}%
          </div>
        ))}
      </section>
    </article>
  );
}
