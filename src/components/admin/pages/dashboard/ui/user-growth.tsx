import React from "react";
import ReactApexChart from "react-apexcharts";
import { user_growth_chart } from "../mock-data";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function UserGrowth() {
  const user_growth = useGlobalContext().admin.user_growth.filter(
    ({ month }) => month != null
  );
  console.log(user_growth);
  const { options, series } = user_growth_chart(user_growth);

  return (
    <article className="col-span-7 p-5 bg-advance border-gray border rounded-md">
      <div className="text-base font-medium">User Growth</div>
      <div className=" text-xs font-medium text-grey">
        Registered users over time
      </div>
      <div className="-left-4 -bottom-4 relative">
        <ReactApexChart
          //  @ts-ignore
          options={options}
          series={series}
          type="area"
          height={256}
        />
      </div>
    </article>
  );
}
