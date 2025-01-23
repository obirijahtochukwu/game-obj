import React from "react";
import { OverviewCard } from "./../../../../ui/overiew-card";
import { overview } from "../mock-data";

export default function Header({ userDetails }: any) {
  const { averageBet, totalProfit, totalPlays } = userDetails;

  return (
    <div>
      <div className=" text-3xl font-semibold font-advance mt-3">
        Player's Dashboard
      </div>
      <section className=" grid grid-cols-2 lg:grid-cols-4 gap-7 mt-4">
        {overview(averageBet, totalProfit, totalPlays).map(
          ({ title, value }: any) => (
            <OverviewCard title={title} value={value} />
          )
        )}
      </section>
    </div>
  );
}
