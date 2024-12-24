import React, { useState } from "react";
import { useGlobalContext } from "../../../lib/global-context";
import { AppProvider, useRoulleteContext } from "./context";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Wheel from "./ui/wheel";
import Board from "./ui/board";
import { filteredAndPublicGameHistory } from "../../../lib/utils/filtered-and-public-game-histor";
import Table from "../../ui/table";

export default function Roullete() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { user } = useGlobalContext();
  const { isSetting, setIsSetting, board } = useRoulleteContext();
  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const data = user?.gameHistory?.filter(({ game }) => game == "Roullete");

  const props = {
    title: "Roullete",
    data: filteredAndPublicGameHistory(data, filterLabels),
    filterLabels,
    setFilterLabels,
  };

  return (
    <article>
      <section className="bg-muted rounded-3xl mb-10">
        <div className="flex gap-7 p-4">
          <Settings />
          <main className="sm:h-fit h-96 w-full lg:w-[calc(100%-384px)] bg-dark rounded-3xl relative flex flex-col items-center justify-center p-8">
            <Icons.setting
              onClick={() => setIsSetting(!isSetting)}
              className=" absolute top-4 left-4 z-10 lg:hidden cursor-pointer"
            />
            <Wheel />
            <Board />
          </main>
        </div>
        <div className=" bg-advance h-16 flex items-center justify-between px-8 text-primary text-2xl font-semibold rounded-b-3xl">
          Webet <Icons.expand className=" cursor-pointer" />
        </div>
      </section>
      <Table {...props} />
    </article>
  );
}
