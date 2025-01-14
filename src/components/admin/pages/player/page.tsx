import React from "react";
import Header from "./ui/header";
import Profit from "./ui/profit";
import Table from "./ui/table";

export default function Player() {
  return (
    <article className="text-primary">
      <Header />
      <section className="text-primary grid grid-cols-12 gap-7 mt-7">
        <Profit />
        <Table />
      </section>
    </article>
  );
}
