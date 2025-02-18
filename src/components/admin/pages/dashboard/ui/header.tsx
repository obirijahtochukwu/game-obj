import React, { useEffect } from "react";
import { dashboard_intro } from "../mock-data";
import { Icons } from "../../../../ui/icons";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { backend_api } from "../../../../../lib/constants";
import { getRequest, useAxios } from "../../../../../lib/utils/axios-helper";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function Header() {
  // const { new_signups } = useAxios(["new_signups"]).data;
  const { page_views, monthly_users, total_payouts, new_signups } = useGlobalContext().admin;

  return (
    <article className="text-primary">
      <div className="font-advance text-3xl font-semibold">Welcome back, John</div>
      {/* {`${getRequest("/new_signups")}`} */}
      <div className="text-sm font-normal opacity-70">Measure your advertising ROI and report website traffic.</div>
      <section className="mt-6 grid grid-cols-4 gap-7">
        {dashboard_intro(page_views, monthly_users, new_signups, total_payouts).map(({ title, value, percentage, Icon }: any) => (
          <div className="rounded-md border border-gray bg-advance p-5 py-4">
            <div className="flex items-center gap-1 text-sm font-normal text-primary/80">
              <Icon /> {title} <Icons.dot_bar className="ml-auto rotate-90" />
            </div>
            <div className="flex items-center">
              <div className="font-advance text-2xl font-semibold">{value}</div>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
