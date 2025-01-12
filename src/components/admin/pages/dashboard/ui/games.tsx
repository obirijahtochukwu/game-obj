import React from "react";
import ReactApexChart from "react-apexcharts";
import { betting_activity_chart } from "../mock-data";

export default function Games() {
  return (
    <article className="col-span-5 h-full p-5 bg-advance border-gray border rounded-md">
      <div className=" text-base font-medium">Most Popular Games/Sports</div>
      <div className="">
        <ReactApexChart
          // @ts-ignore
          options={betting_activity_chart.options}
          series={betting_activity_chart.series}
          type="radialBar"
        />
      </div>
      <section className=" font-advance flex flex-col gap-6">
        <div className="flex items-center gap-2 font-medium text-base">
          <div className="bg-pink w-2 h-2 rounded-full" />
          <div className=" text-grey mr-auto">Dice roller</div>30%
        </div>
        <div className="flex items-center gap-2 font-medium text-base">
          <div className="bg-[#0E43FB] w-2 h-2 rounded-full" />
          <div className=" text-grey mr-auto">Slot</div> 55%
        </div>
        <div className="flex items-center gap-2 font-medium text-base">
          <div className="bg-[#00C2FF] w-2 h-2 rounded-full" />
          <div className=" text-grey mr-auto">Aviator</div>67%
        </div>
      </section>
    </article>
  );
}
