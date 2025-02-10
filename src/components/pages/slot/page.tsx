import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Game from "./ui/game";
import Table from "../../ui/table";
import { AppProvider, useSlotContext } from "./context";
import { useGlobalContext } from "../../../lib/global-context";
import { useEffect, useState } from "react";
import { filteredAndPublicGameHistory } from "./../../../lib/utils/filtered-and-public-game-histor";

export default function Slot() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { user, setIsLogin } = useGlobalContext();
  const { setting, setSetting, selectedCoins, gameState } = useSlotContext();
  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const data = user?.gameHistory?.filter(({ game }) => game == "Slot");

  const props = {
    title: "Slot",
    data: filteredAndPublicGameHistory(data, filterLabels),
    filterLabels,
    setFilterLabels,
  };

  return (
    <article>
      <section className="mb-10 rounded-3xl bg-muted">
        <div className="flex gap-7 p-4">
          <Settings />
          <main className="relative flex h-max w-full flex-col items-center justify-center rounded-3xl bg-dark p-8 sm:h-[600px] lg:w-[calc(100%-384px)]">
            <Icons.setting onClick={() => setSetting(!setting)} className="absolute left-4 top-4 z-10 cursor-pointer lg:hidden" />
            <Game />
            <footer className="mt-auto grid min-w-full grid-cols-4 gap-8">
              {selectedCoins?.map(({ coin }: any, idx: number) => (
                <div
                  key={idx}
                  className={`flex h-12 items-center justify-center rounded-lg border-b-4 bg-advance text-xl font-semibold text-primary ${
                    gameState.value == coin ? "border-b-[#16a34a] bg-primary" : "border-secondary"
                  }`}
                >
                  {coin}
                </div>
              ))}
            </footer>
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
