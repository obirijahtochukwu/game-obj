import React, { useState } from "react";
import { AppProvider, useVideoPokerContext } from "./context";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Game from "./ui/game";
import Table from "../../ui/table";
import { useGlobalContext } from "../../../lib/global-context";
import { filteredAndPublicGameHistory } from "../../../lib/utils/filtered-and-public-game-histor";

export default function VideoPoker() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { user, setIsLogin } = useGlobalContext();
  const { setIsSetting, isSetting } = useVideoPokerContext();

  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const data = user?.gameHistory?.filter(({ game }) => game == "Video Poker");

  const props = {
    title: "Video Poker",
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
            <Game />
          </main>
        </div>
      </section>
      <Table {...props} />
    </article>
  );
}
