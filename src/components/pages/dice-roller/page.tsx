import React, { useState } from "react";
import { AppProvider, useDiceRollerContext } from "./context";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Game from "./ui/game";
import { filteredAndPublicGameHistory } from "../../../lib/utils/filtered-and-public-game-histor";
import { useGlobalContext } from "../../../lib/global-context";
import Table from "../../ui/table";

export default function DiceRoller() {
  return (
    <AppProvider>
      {/* <ExampleTable /> */}
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { user } = useGlobalContext();
  const { setSetting } = useDiceRollerContext();
  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const data = user?.gameHistory?.filter(({ game }) => game == "Dice Roll");

  const props = {
    title: "Dice Roll",
    data: filteredAndPublicGameHistory(data, filterLabels),
    filterLabels,
    setFilterLabels,
  };

  return (
    <article>
      <section className="mb-10 rounded-3xl bg-muted">
        <div className="flex gap-7 p-4">
          <Settings />
          <main className="relative flex h-fit w-full flex-col items-center justify-center rounded-3xl bg-dark p-4 sm:h-[600px] sm:p-8 lg:w-[calc(100%-384px)]">
            <Icons.setting onClick={() => setSetting(true)} className="absolute left-4 top-4 z-10 cursor-pointer lg:hidden" />
            <Game />
          </main>
        </div>
      </section>
      <Table {...props} />
    </article>
  );
}
