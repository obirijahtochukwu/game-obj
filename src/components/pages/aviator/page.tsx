import React, { useContext, useEffect, useState } from "react";
import Game from "./ui/game";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import { AppProvider, useAviatorContext } from "./context";
import Table from "../../ui/table";
import { useGlobalContext } from "../../../lib/global-context";
import { filteredAndPublicGameHistory } from "../../../lib/utils/filtered-and-public-game-histor";

export default function Aviator() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { user, setIsLogin } = useGlobalContext();
  const { setSetting } = useAviatorContext();
  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const data = user?.gameHistory?.filter(({ game }) => game == "Aviator");

  const props = {
    title: "Aviator",
    data: filteredAndPublicGameHistory(data, filterLabels),
    filterLabels,
    setFilterLabels,
  };

  return (
    <article>
      <section className="mb-10 rounded-3xl bg-muted">
        <div className="flex gap-7 p-2 sm:p-4">
          <Settings />
          <main className="relative flex h-full w-full flex-col items-center justify-center rounded-3xl bg-dark p-2 max-sm:pb-10 sm:min-h-[860px] sm:p-8 lg:w-[calc(100%-384px)]">
            <Icons.setting onClick={() => setSetting(true)} className="absolute left-4 top-4 z-10 cursor-pointer lg:hidden" />
            <Game />
          </main>
        </div>
      </section>
      <Table {...props} />
    </article>
  );
}
