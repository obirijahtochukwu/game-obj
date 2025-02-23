import React, { useEffect } from "react";
import { dashboard_intro } from "../mock-data";
import { Icons } from "../../../../ui/icons";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function Header() {
  const { page_views, monthly_users, total_payouts, new_signups } = useGlobalContext().admin;

  return (
    <article className="text-primary">
      <div className="font-advance text-3xl font-semibold">Welcome back, John</div>
      <article className="-z-10 text-sm font-normal opacity-70">Measure your advertising ROI and report website traffic.</article>
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
