import React from "react";
import { OverviewCard } from "./../../../../ui/overiew-card";
import { overview } from "../mock-data";

export default function Header({ userDetails, isLoading }: any) {
  const { averageBet, totalProfit, totalPlays, balance } = userDetails;

  return (
    <div>
      <div className="mt-3 font-advance text-3xl font-semibold">Player's Dashboard</div>
      <section className="mt-4 grid grid-cols-2 gap-7 lg:grid-cols-4">
        {overview(averageBet, totalProfit, totalPlays, balance, isLoading).map(({ title, value }: any) => (
          <OverviewCard title={title} value={value} isLoading={isLoading} />
        ))}
      </section>
    </div>
  );
}
