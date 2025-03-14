import React, { useState } from "react";
import { AppProvider, useFootballContext } from "./context";
import Fixtures from "./ui/fixtures";
import Header from "./ui/header";
import { useGlobalContext } from "../../../lib/global-context";
import { filteredAndPublicGameHistory } from "../../../lib/utils/filtered-and-public-game-histor";
import Table from "../../ui/table";

export default function Football() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { PaginationWithDots } = useFootballContext();
  const { user } = useGlobalContext();
  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const data = user?.gameHistory?.filter(({ game }) => game == "Football");

  const props = {
    title: "Football",
    data: filteredAndPublicGameHistory(data, filterLabels),
    filterLabels,
    setFilterLabels,
  };

  return (
    <div>
      <Header />
      <Fixtures />
      <footer className="mt-5 flex justify-end">
        <PaginationWithDots />
      </footer>
      <br />
      <Table {...props} />
    </div>
  );
}
