import React from "react";
import Header from "./ui/header";
import Table from "./ui/table";

export default function Users() {
  return (
    <div>
      <div className="mb-5 font-advance text-3xl font-semibold text-primary">Users Overview</div>
      <Header />
      <Table />
    </div>
  );
}
