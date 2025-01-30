import React from "react";
import ReactApexChart from "react-apexcharts";
import { user_growth_chart } from "../mock-data";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function UserGrowth() {
  const user_growth = useGlobalContext().admin.user_growth.filter(({ month }) => month != null);
  const { options, series } = user_growth_chart(user_growth);

  return (
    <article className="col-span-7 rounded-md border border-gray bg-advance p-5">
      <div className="text-base font-medium">User Growth</div>
      <div className="text-xs font-medium text-grey">Registered users over time</div>
      <div className="relative -bottom-4 -left-4">
        <ReactApexChart
          //  @ts-ignore
          options={options}
          series={series}
          type="bar"
          height={256}
        />
      </div>
    </article>
  );
}
