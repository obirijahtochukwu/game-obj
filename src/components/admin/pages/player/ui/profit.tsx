import React from "react";
import ReactApexChart from "react-apexcharts";
import { profit } from "../mock-data";

export default function Profit() {
  return (
    <article className="col-span-12 p-5 bg-advance border-gray border rounded-md">
      <div className="text-base font-medium text-grey font-secondary">
        Total profit
      </div>
      <div className=" text-2xl font-bold font-advance">$144.6K</div>
      <div className="-left-4 -bottom-4 relative">
        <ReactApexChart
          //  @ts-ignore
          options={profit.options}
          series={profit.series}
          type="area"
          height={256}
        />
      </div>
    </article>
  );
}
