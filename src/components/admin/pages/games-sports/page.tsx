import React from "react";
import Header from "./ui/header";
import Table from "./ui/table";

export default function GamesSports() {
  return (
    <article className="text-primary">
      <Header />
      <div className="mt-7 text-xl font-semibold font-advance">
        Available Games/Sports
      </div>
      <Table />
    </article>
  );
}
