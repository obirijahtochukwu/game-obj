import React from "react";
import { dashboard_intro } from "../mock-data";
import { Icons } from "../../../../ui/icons";
import ReactApexChart from "react-apexcharts";

export default function Header() {
  return (
    <article className="text-primary">
      <div className=" text-3xl font-semibold font-advance">
        Welcome back, John
      </div>
      <div className=" opacity-70 text-sm font-normal">
        Measure your advertising ROI and report website traffic.
      </div>
      <section className=" grid grid-cols-4 gap-7 mt-6">
        {dashboard_intro.map(({ title, value, percentage, Icon }) => (
          <div className="bg-advance border border-gray rounded-md p-5 py-4">
            <div className="flex gap-1 items-center text-primary/80 text-sm font-normal">
              <Icon /> {title} <Icons.dot_bar className=" ml-auto rotate-90" />
            </div>
            <div className="flex items-center">
              <div className="text-2xl font-semibold font-advance">{value}</div>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
