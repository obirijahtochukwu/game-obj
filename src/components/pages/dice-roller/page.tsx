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
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { user } = useGlobalContext();
  const { setSetting } = useDiceRollerContext();
  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const data = user.gameHistory.filter(({ game }) => game == "Dice Roll");

  const props = {
    title: "Dice Roll",
    data: filteredAndPublicGameHistory(data, filterLabels),
    filterLabels,
    setFilterLabels,
  };

  return (
    <article>
      <section className="bg-muted rounded-3xl mb-10">
        <div className="flex gap-7 p-4">
          <Settings />
          <main className="sm:h-[600px] h-fit w-full lg:w-[calc(100%-384px)] bg-dark rounded-3xl relative flex flex-col items-center justify-center p-4 sm:p-8">
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
