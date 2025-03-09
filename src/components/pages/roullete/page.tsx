import React, { useState } from "react";
import { useGlobalContext } from "../../../lib/global-context";
import { AppProvider, useRoulleteContext } from "./context";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Wheel from "./ui/wheel";
import Board from "./ui/board";
import { filteredAndPublicGameHistory } from "../../../lib/utils/filtered-and-public-game-histor";
import Table from "../../ui/table";
import Walkthrough from "../../ui/walkthrough";

export default function Roullete() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { user } = useGlobalContext();
  const { isSetting, setIsSetting, setIntroTip, introTip } = useRoulleteContext();
  const [filterLabels, setFilterLabels] = useState(["all bets"]);

  const data = user?.gameHistory?.filter(({ game }) => game == "Roullete");

  const props = {
    title: "Roullete",
    data: filteredAndPublicGameHistory(data, filterLabels),
    filterLabels,
    setFilterLabels,
    setIntroTip,
    introTip,
  };

  return (
    <article>
      <section className="mb-10 rounded-3xl bg-muted">
        <div className="flex gap-7 p-4">
          <Settings />
          <main className="relative flex h-fit w-full flex-col items-center justify-center rounded-3xl bg-dark p-8 lg:w-[calc(100%-384px)]">
            <Icons.setting
              onClick={() => setIsSetting(!isSetting)}
              className="absolute left-4 top-4 z-10 cursor-pointer lg:hidden"
            />
            <div className="relative max-sm:-left-5 max-sm:scale-75">
              <Wheel />
            </div>
            <Walkthrough
              {...props}
              id={2}
              title="Choose Your Outcome"
              content="Select the outcome you want to bet on from the available options"
              position="top"
            >
              <div className="dark-scrollbar w-full max-sm:overflow-x-auto">
                <div className="max-sm:w-96">
                  <Board />
                </div>
              </div>
            </Walkthrough>
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
