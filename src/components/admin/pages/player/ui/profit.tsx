import React from "react";
import ReactApexChart from "react-apexcharts";
import { profit } from "../mock-data";
import { formattedNumber } from "../../../../../lib/utils/formattedNumber";

export default function Profit({ isLoading, userDetails }: any) {
  const { games } = userDetails;
  const { options, series } = profit(games);
  const total_profit = games?.reduce((acc, game) => acc + game.profit, 0);

  return (
    <article className="col-span-12 p-5 bg-advance border-gray border rounded-md">
      <div className="text-base font-medium text-grey font-secondary">
        Total profit
      </div>
      <div className=" text-2xl font-bold font-advance">
        ${formattedNumber(total_profit)}
      </div>
      <div className="-left-4 -bottom-4 relative">
        {isLoading ? (
          <div className="h-[266px]" />
        ) : (
          <ReactApexChart
            //  @ts-ignore
            options={options}
            series={series}
            type="bar"
            height={256}
          />
        )}
      </div>
    </article>
  );
}
