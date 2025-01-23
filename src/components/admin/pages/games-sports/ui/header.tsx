import React from "react";
import { OverviewCard } from "./../../../../ui/overiew-card";
import { overview } from "../mock-data";
import { useGlobalContext } from "../../../../../lib/global-context";

export default function Header() {
  const {
    average_bet_size,
    total_payouts,
    players_win_rate,
    total_players_session,
  } = useGlobalContext().admin;

  return (
    <div>
      <div className=" text-3xl font-semibold font-advance">Games Overview</div>
      <section className=" grid grid-cols-2 lg:grid-cols-4 gap-7 mt-6">
        {overview(
          total_payouts,
          average_bet_size,
          players_win_rate,
          total_players_session
        ).map(({ title, value }) => (
          <OverviewCard title={title} value={value} />
        ))}
      </section>
    </div>
  );
}
