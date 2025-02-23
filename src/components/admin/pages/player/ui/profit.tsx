import React from "react";
import ReactApexChart from "react-apexcharts";
import { profit } from "../mock-data";
import { formattedNumber } from "../../../../../lib/utils/formattedNumber";
import { Skeleton } from "@mui/material";
import SkeletonLoader from "../../../../ui/skeleton";

export default function Profit({ isLoading, userDetails }: any) {
  const { games } = userDetails;
  const { options, series } = profit(games);
  const monthly_profit = games?.reduce((acc, game) => acc + game.profit, 0);

  return (
    <article className="col-span-12 rounded-md border border-gray bg-advance p-5">
      <div className="font-secondary text-base font-medium text-grey">Total profit</div>
      <div className="font-advance text-2xl font-bold">{isLoading || `$${formattedNumber(monthly_profit)}`}</div>
      <div className="relative -bottom-4 -left-4">
        {isLoading ? (
          <SkeletonLoader height={"h-64 ml-5 rounded-lg"} />
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
