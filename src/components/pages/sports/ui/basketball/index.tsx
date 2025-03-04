import React, { useEffect, useState } from "react";
import Bet from "../bet";
import { toPercentage } from "../../../../../lib/constants";
import { fetchData } from "./utils";

const basketballInitailSate = { loading: false, data: [] };

export default function Basketball() {
  const [bet, setBet] = useState({ state: false, data: {} });
  const [basketballSate, setBasketballSate] = useState(basketballInitailSate);

  useEffect(() => {
    fetchData({ basketballSate, setBasketballSate });
  }, []);

  const props = {
    bet,
    isOpen: bet.state,
    setIsOpen: () => setBet({ state: false, data: {} }),
  };
  console.log(basketballSate.data);

  return (
    <section className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-sm:max-w-md max-sm:mx-auto mt-10">
      {/* <Bet props={props} /> */}
      {basketballSate.data.map((prop, idx) => (
        <div
          key={idx}
          // onClick={() => setBet({ state: true, data: prop })}
          className=" bg-muted rounded-2xl flex flex-col min-h-64 gap-4 p-4 text-primary cursor-pointer hover:scale-105 duration-200 hover:border-primary border-2 border-transparent"
        >
          <div className=" text-xl font-semibold tracking-tight text-secondary">
            {prop.league_name}
          </div>
          <section className="flex items-center justify-between">
            <div className="">
              <div className="flex items-center gap-2 text-lg font-medium">
                <img
                  src={"prop.teams.home.logo"}
                  alt=""
                  className="h-7 w-8 bg-gradient-custom rounded-full"
                />
                {prop.home}
              </div>
              <div className="flex items-center gap-2 text-lg font-medium mt-6">
                <img
                  src={"prop.teams.away.logo"}
                  alt=""
                  className="h-7 w-8 bg-gradient-custom rounded-full"
                />
                {prop.away}
              </div>
            </div>
            <div className=" text-lg font-medium">VS</div>
            <div>
              <div className=" w-14 h-8 rounded-lg flex items-center justify-center bg-primary/20 text-base font-medium">
                {toPercentage(prop.periods?.num_0?.money_line?.home || 5)}
              </div>
              <div className="mt-6 w-14 h-8 rounded-lg flex items-center justify-center bg-primary/20 text-base font-medium">
                {toPercentage(prop.periods?.num_0?.money_line?.home || 5)}
              </div>
            </div>
          </section>
          <section className="flex flex-wrap gap-2 mt-auto">
            <div className="h-10 rounded-lg bg-primary/20 flex items-center justify-between gap-4 px-3 text-base font-medium">
              {prop.home}
              <div className="">{toPercentage(7)}</div>
            </div>
            <div className=" h-10 rounded-lg bg-primary/20 flex items-center justify-between gap-4 px-3 text-base font-medium">
              Draw
              <div className="">{toPercentage(9)}</div>
            </div>
            <div className="h-10 rounded-lg bg-primary/20 flex items-center justify-between gap-4 px-3 text-base font-medium">
              {prop.away}
              <div className="">{toPercentage(8)}</div>
            </div>
          </section>
        </div>
      ))}
    </section>
  );
}
