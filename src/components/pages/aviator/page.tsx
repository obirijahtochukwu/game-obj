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
  const { user } = useGlobalContext();
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
      <section className="bg-muted rounded-3xl mb-10">
        <div className="flex gap-7 p-4">
          <Settings />
          <main className="sm:min-h-[860px] h-full w-full lg:w-[calc(100%-384px)] bg-dark rounded-3xl relative flex flex-col items-center justify-center p-4 max-sm:pb-10 sm:p-8">
            <Icons.setting
              onClick={() => setSetting(true)}
              className=" absolute top-4 left-4 z-10 lg:hidden cursor-pointer"
            />
            <Game />
          </main>
        </div>
      </section>
      <Table {...props} />
    </article>
  );
}
