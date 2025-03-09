import React from "react";
import { revenue_chart } from "../mock-data";
import ReactApexChart from "react-apexcharts";
import { Icons } from "../../../../ui/icons";
import { useGlobalContext } from "../../../../../lib/global-context";
import { formattedNumber } from "../../../../../lib/utils/formattedNumber";

export default function Revenue() {
  const { monthly_profit } = useGlobalContext().admin;
  const profit = monthly_profit.reduce((acc, item) => acc + item.profit, 0);

  const { series, options } = revenue_chart(monthly_profit);

  return (
    <article className="-z-20 col-span-12 rounded-md border border-gray bg-advance py-5 pl-2 pr-3 font-advance lg:col-span-7">
      <div className="pl-3 pr-6">
        <div className="text-base font-medium opacity-80">Total revenue</div>
        <section className="mb-11 flex gap-7">
          <div className="flex items-center gap-2 font-advance text-2xl font-semibold">
            ${formattedNumber(profit || 0)}
            <div className="flex w-fit items-center gap-0.5 rounded-sm border border-gray bg-success/15 px-1 py-0.5 text-xs text-success">
              24.6% <Icons.increase />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-sm font-medium text-grey">
            <div className="h-2 w-2 rounded-full bg-pink" /> Games
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-grey">
            <div className="h-2 w-2 rounded-full bg-[#00C2FF]" /> Sports
          </div>
        </section>
      </div>
      <ReactApexChart
        //  @ts-ignore
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </article>
  );
}
