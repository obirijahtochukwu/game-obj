import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Game from "./ui/game";
import Table from "../../ui/table";
import { AppProvider, useSlotContext } from "./context";
import { useGlobalContext } from "../../../lib/global-context";
import { useEffect, useState } from "react";

export default function Slot() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { user } = useGlobalContext();
  const { setting, setSetting, selectedCoins, gameState } = useSlotContext();
  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const filteredAndPublicGameHistory = user.gameHistory
    .map((item) => ({ ...item, public: "all bets" }))
    .filter((item) => {
      return filterLabels.every((label: string) =>
        Object.values(item).some((value) => value == label)
      );
    });

  const props = {
    title: "Dice Roll",
    data: filteredAndPublicGameHistory,
    filterLabels,
    setFilterLabels,
  };

  return (
    <article>
      <section className="bg-muted rounded-3xl mb-10">
        <div className="flex gap-7 p-4">
          <Settings />
          <main className="sm:h-[600px] h-96 w-full lg:w-[calc(100%-384px)] bg-dark rounded-3xl relative flex flex-col items-center justify-center p-8">
            <Icons.setting
              onClick={() => setSetting(!setting)}
              className=" absolute top-4 left-4 z-10 lg:hidden cursor-pointer"
            />
            <Game />
            <footer className=" min-w-full grid grid-cols-4 gap-8 mt-auto">
              {selectedCoins?.map(({ coin }: any) => (
                <div
                  key={coin}
                  className={`bg-advance h-12 flex items-center justify-center rounded-lg text-primary text-xl font-semibold border-b-4 ${
                    gameState.value == coin
                      ? " border-b-[#16a34a] bg-primary"
                      : "border-secondary"
                  }`}
                >
                  {coin}
                </div>
              ))}
            </footer>
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
