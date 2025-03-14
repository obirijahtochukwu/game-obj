import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppProvider } from "./context";
import Header from "./ui/header";
import Games from "./ui/games";
import { useGlobalContext } from "../../../lib/global-context";
import { filteredAndPublicGameHistory } from "../../../lib/utils/filtered-and-public-game-histor";
import Table from "../../ui/table";

export default function Basketball() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { user } = useGlobalContext();
  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const data = user?.gameHistory?.filter(({ game }) => game == "Basketball");

  const props = {
    title: "Basketball",
    data: filteredAndPublicGameHistory(data, filterLabels),
    filterLabels,
    setFilterLabels,
  };
  return (
    <div className="">
      <Header />
      <Games />
      <br />
      <Table {...props} />
    </div>
  );
}
