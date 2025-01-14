import React from "react";
import ReactApexChart from "react-apexcharts";
import { user_growth_chart } from "../mock-data";

export default function UserGrowth() {
  return (
    <article className="col-span-7 p-5 bg-advance border-gray border rounded-md">
      <div className="text-base font-medium">User Growth</div>
      <div className=" text-xs font-medium text-grey">
        Registered users over time
      </div>
      <div className="-left-4 -bottom-4 relative">
        <ReactApexChart
          //  @ts-ignore
          options={user_growth_chart.options}
          series={user_growth_chart.series}
          type="area"
          height={256}
        />
      </div>
    </article>
  );
}
