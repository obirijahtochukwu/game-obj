import React from "react";
import ReactApexChart from "react-apexcharts";
import { user_growth_chart } from "../mock-data";
import { useGlobalContext } from "../../../../../lib/global-context";
import { months } from "../../../../../lib/constants";

export default function UserGrowth() {
  const user_growth = useGlobalContext().admin.user_growth;
  const filteredUserGrowth = months.map((name) => {
    const count = user_growth.find(({ month }) => month != null && name == month)?.userCount;

    return { month: name, count: count || 0 };
  });

  const { options, series } = user_growth_chart(filteredUserGrowth);

  return (
    <article className="col-span-12 rounded-md border border-gray bg-advance p-5 lg:col-span-7">
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
