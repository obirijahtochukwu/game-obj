import React from "react";
import { revenue_chart } from "../mock-data";
import ReactApexChart from "react-apexcharts";
import { Icons } from "../../../../ui/icons";

export default function Revenue() {
  return (
    <article className=" col-span-7 bg-advance py-5 pl-2 pr-3 rounded-md border border-gray font-advance">
      <div className="pl-3 pr-6">
        <div className=" text-base font-medium opacity-80">Total revenue</div>
        <section className="flex gap-7 mb-11">
          <div className="flex items-center gap-2 text-2xl font-semibold font-advance">
            $240.8K{" "}
            <div className="w-fit px-1 py-0.5 rounded-sm border-gray border bg-success/15 text-success text-xs flex items-center gap-0.5">
              24.6% <Icons.increase />
            </div>
          </div>
          <div className="flex ml-auto items-center gap-1.5 text-sm font-medium text-grey">
            <div className="h-2 w-2 rounded-full bg-pink" /> Games
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-grey">
            <div className="h-2 w-2 rounded-full bg-[#00C2FF]" /> Sports
          </div>
        </section>
      </div>
      <ReactApexChart
        //  @ts-ignore
        options={revenue_chart.options}
        series={revenue_chart.series}
        type="area"
        height={350}
      />
    </article>
  );
}
