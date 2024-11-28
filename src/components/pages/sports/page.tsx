import React, { useEffect, useState } from "react";
import { tabs } from "./mock-data";
import { Icons } from "../../ui/icons";
import Games from "./ui/games";
import { AppProvider } from "./context";
import Basketball from "./ui/basketball";
import Baseball from "./ui/baseball";
import Tennis from "./ui/tennis";

export default function Sports() {
  const [tab, setTab] = useState(tabs[0]);

  return (
    <AppProvider>
      <article className=" mt-20">
        <section className="flex flex-wrap gap-3">
          {tabs.map((name) => (
            <div
              onClick={() => setTab(name)}
              className={`${
                tab == name ? " bg-primary/30" : " cursor-pointer"
              } py-2.5 px-6 rounded-full border-2 border-primary/10 flex items-center gap-3 text-xl font-medium text-primary duration-300`}
            >
              {" "}
              <Icons.sport_tab />
              {name}
            </div>
          ))}
        </section>

        {tab == "Football" ? (
          <Games />
        ) : tab == "Basketball" ? (
          <Basketball />
        ) : tab == "Baseball" ? (
          <Baseball />
        ) : tab == "Tennis" ? (
          <Tennis />
        ) : null}
      </article>
    </AppProvider>
  );
}
