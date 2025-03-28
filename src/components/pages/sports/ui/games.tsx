import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Bet from "./bet";
import { useGlobalContext } from "../context";
import { toPercentage } from "../../../../lib/constants";
import TeamDetails from "./team-details";
import axios from "axios";
import { Base64 } from "js-base64";
import { randomData } from "../../../../lib/utils";
import SkeletonLoader from "../../../ui/skeleton";

export default function Games() {
  const { matches, isLoadng } = useGlobalContext();
  const [team, setTeam] = useState(() => ({
    state: false,
    data: {},
  }));

  useEffect(() => {
    if (team.state) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [team.state]);

  const props = {
    team: team.data,
    isOpen: team.state,
    setIsOpen: (e: boolean) => setTeam({ state: e, data: {} }),
  };
  console.log(matches);

  return (
    <section className="mt-10 grid grid-cols-1 gap-6 max-sm:mx-auto max-sm:max-w-md sm:grid-cols-2 xl:grid-cols-3">
      {team.state ? <TeamDetails {...props} /> : false}
      {isLoadng
        ? randomData(5).map(() => <SkeletonLoader height={"h-64"} />)
        : matches?.map((prop, idx) => (
            <div
              key={idx}
              onClick={() => setTeam({ state: true, data: prop })}
              className="flex min-h-64 cursor-pointer flex-col gap-4 rounded-2xl border-2 border-transparent bg-muted p-4 text-primary duration-200 hover:scale-105 hover:border-primary"
            >
              <div className="text-xl font-semibold tracking-tight">{prop.league.name}</div>
              <section className="flex items-center justify-between">
                <div className="">
                  <div className="flex items-center gap-2 text-lg font-medium">
                    <img src={prop.teams.home.logo} alt="" className="h-8 w-8" />

                    {prop.teams.home.name}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-lg font-medium">
                    <img src={prop.teams.away.logo} alt="" className="h-8 w-8" />
                    {prop.teams.away.name}
                  </div>
                </div>
                <div className="text-lg font-medium">VS</div>
                <div>
                  <div className="flex h-8 w-14 items-center justify-center rounded-lg bg-primary/20 text-base font-medium">
                    {prop.odd.values[0].odd}
                  </div>
                  <div className="mt-6 flex h-8 w-14 items-center justify-center rounded-lg bg-primary/20 text-base font-medium">
                    {prop.odd.values[2].odd}
                  </div>
                </div>
              </section>
              <section className="mt-auto flex flex-wrap gap-2">
                <div className="flex h-10 items-center justify-between gap-4 rounded-lg bg-primary/20 px-3 text-base font-medium">
                  {prop.teams.home.name}
                  <div className="">{toPercentage(+prop.odd.values[0].odd)}</div>
                </div>
                <div className="flex h-10 items-center justify-between gap-4 rounded-lg bg-primary/20 px-3 text-base font-medium">
                  Draw
                  <div className="">{toPercentage(+prop.odd.values[1].odd)}</div>
                </div>
                <div className="flex h-10 items-center justify-between gap-4 rounded-lg bg-primary/20 px-3 text-base font-medium">
                  {prop.teams.away.name}
                  <div className="">{toPercentage(+prop.odd.values[2].odd)}</div>
                </div>
              </section>
            </div>
          ))}
    </section>
  );
}
