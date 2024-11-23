import React, { useState } from "react";
import { AppProvider, useGlobalContext } from "./context";
import Settings from "./ui/settings";
import { Icons } from "../../ui/icons";
import Game from "./ui/game";

export default function DiceRoller() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { setSetting } = useGlobalContext();

  return (
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
  );
}
