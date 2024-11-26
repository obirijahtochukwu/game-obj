import React, { useState } from "react";
import { Icons } from "../../../ui/icons";
import Bet from "./bet";
import { useGlobalContext } from "../context";
import { toPercentage } from "../../../../lib/constants";

export default function Games() {
  const [isBet, setIsBet] = useState(false);
  const { match } = useGlobalContext();
  const props = { isBet, setIsBet };

  return (
    <section className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-sm:max-w-md max-sm:mx-auto mt-10">
      <Bet props={props} />
      {match.odds?.map((prop, idx) => (
        <div
          key={idx}
          onClick={() => setIsBet(true)}
          className=" bg-muted rounded-2xl flex flex-col min-h-64 gap-4 p-4 text-primary cursor-pointer hover:scale-105 duration-200 hover:border-primary border-2 border-transparent"
        >
          <div className=" text-xl font-semibold tracking-tight">
            Premier League
          </div>
          <section className="flex items-center justify-between">
            <div className="">
              <div className="flex items-center gap-2 text-lg font-medium">
                <img src={prop.teams.home.logo} alt="" className="h-7 w-8" />

                {prop.teams.home.name}
              </div>
              <div className="flex items-center gap-2 text-lg font-medium mt-6">
                <img src={prop.teams.away.logo} alt="" className="h-7 w-8" />
                {prop.teams.away.name}
              </div>
            </div>
            <div className=" text-lg font-medium">VS</div>
            <div>
              <div className=" w-14 h-8 rounded-lg flex items-center justify-center bg-primary/20 text-base font-medium">
                {prop.odd.values[0].odd}
              </div>
              <div className="mt-6 w-14 h-8 rounded-lg flex items-center justify-center bg-primary/20 text-base font-medium">
                {prop.odd.values[2].odd}
              </div>
            </div>
          </section>
          <section className="flex flex-wrap gap-2 mt-auto">
            <div className="h-10 rounded-lg bg-primary/20 flex items-center justify-between gap-4 px-3 text-base font-medium">
              {prop.teams.home.name}
              <div className="">{toPercentage(prop.odd.values[0].odd)}</div>
            </div>
            <div className=" h-10 rounded-lg bg-primary/20 flex items-center justify-between gap-4 px-3 text-base font-medium">
              Draw
              <div className="">{toPercentage(prop.odd.values[1].odd)}</div>
            </div>
            <div className="h-10 rounded-lg bg-primary/20 flex items-center justify-between gap-4 px-3 text-base font-medium">
              {prop.teams.away.name}
              <div className="">{toPercentage(prop.odd.values[2].odd)}</div>
            </div>
          </section>
        </div>
      ))}
    </section>
  );
}
