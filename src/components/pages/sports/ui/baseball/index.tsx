import React, { useEffect, useState } from "react";
import Bet from "../bet";
import { toPercentage } from "../../../../../lib/constants";
import { fetchData } from "./utils";

const basketballInitailSate = { loading: false, data: [] };

export default function Baseball() {
  const [bet, setBet] = useState({ state: false, title: "" });
  const [basketballSate, setBasketballSate] = useState(basketballInitailSate);

  useEffect(() => {
    fetchData({ basketballSate, setBasketballSate });
  }, []);

  const props = {
    bet,
    isOpen: bet.state,
    setIsOpen: () => setBet({ state: false, title: "" }),
  };

  return (
    <section className="mt-10 grid grid-cols-1 gap-6 max-sm:mx-auto max-sm:max-w-md sm:grid-cols-2 xl:grid-cols-3">
      {/* <Bet props={props} /> */}
      {basketballSate.data.map((prop, idx) => (
        <div
          key={idx}
          onClick={() => setBet({ state: true, title: prop.league_name })}
          className="flex min-h-64 cursor-pointer flex-col gap-4 rounded-2xl border-2 border-transparent bg-muted p-4 text-primary duration-200 hover:scale-105 hover:border-primary"
        >
          <div className="text-xl font-semibold tracking-tight text-secondary">{prop.league_name}</div>
          <section className="flex items-center justify-between">
            <div className="">
              <div className="flex items-center gap-2 text-lg font-medium">
                <img src={"prop.teams.home.logo"} alt="" className="h-7 w-8 rounded-full bg-gradient-custom" />
                {prop.home}
              </div>
              <div className="mt-6 flex items-center gap-2 text-lg font-medium">
                <img src={"prop.teams.away.logo"} alt="" className="h-7 w-8 rounded-full bg-gradient-custom" />
                {prop.away}
              </div>
            </div>
            <div className="text-lg font-medium">VS</div>
            <div>
              <div className="flex h-8 w-14 items-center justify-center rounded-lg bg-primary/20 text-base font-medium">
                {toPercentage(prop.periods?.num_0?.money_line?.home || 5)}
              </div>
              <div className="mt-6 flex h-8 w-14 items-center justify-center rounded-lg bg-primary/20 text-base font-medium">
                {toPercentage(prop.periods?.num_0?.money_line?.home || 5)}
              </div>
            </div>
          </section>
          <section className="mt-auto flex flex-wrap gap-2">
            <div className="flex h-10 items-center justify-between gap-4 rounded-lg bg-primary/20 px-3 text-base font-medium">
              {prop.home}
              <div className="">{toPercentage(7)}</div>
            </div>
            <div className="flex h-10 items-center justify-between gap-4 rounded-lg bg-primary/20 px-3 text-base font-medium">
              Draw
              <div className="">{toPercentage(9)}</div>
            </div>
            <div className="flex h-10 items-center justify-between gap-4 rounded-lg bg-primary/20 px-3 text-base font-medium">
              {prop.away}
              <div className="">{toPercentage(8)}</div>
            </div>
          </section>
        </div>
      ))}
    </section>
  );
}
