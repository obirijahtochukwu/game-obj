import React from "react";
import Header from "./ui/header";
import Revenue from "./ui/revenue";
import Games from "./ui/games";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <section className="text-primary grid grid-cols-12 gap-7 mt-7">
        <Games />
        <Revenue />
      </section>
    </div>
  );
}
