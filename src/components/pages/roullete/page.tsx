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
  const { user, setIsLogin } = useGlobalContext();
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
      <section className="mb-10 rounded-3xl bg-muted">
        <div className="flex gap-7 p-4">
          <Settings />
          <main className="relative flex h-96 w-full flex-col items-center justify-center rounded-3xl bg-dark p-8 sm:h-fit lg:w-[calc(100%-384px)]">
            <Icons.setting
              onClick={() => setIsSetting(!isSetting)}
              className="absolute left-4 top-4 z-10 cursor-pointer lg:hidden"
            />
            <Wheel />
            <Board />
          </main>
        </div>
        <div className="flex h-16 items-center justify-between rounded-b-3xl bg-advance px-8 text-2xl font-semibold text-primary">
          Webet <Icons.expand className="cursor-pointer" />
        </div>
      </section>
      <Table {...props} />
    </article>
  );
}
