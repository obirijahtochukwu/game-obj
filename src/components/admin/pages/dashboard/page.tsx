import React from "react";
import Header from "./ui/header";
import Revenue from "./ui/revenue";
import Games from "./ui/games";
import TopPlayers from "./ui/top-players";
import UserGrowth from "./ui/user-growth";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <section className="mt-7 grid grid-cols-1 gap-7 text-primary lg:grid-cols-12">
        <Games />
        <Revenue />
        <TopPlayers />
        <UserGrowth />
      </section>
    </div>
  );
}
