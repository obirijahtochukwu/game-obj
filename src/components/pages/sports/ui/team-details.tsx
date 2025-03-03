import React, { useState } from "react";
import Modal from "../../../ui/modal";
import { useFormattedDate } from "../../../../lib/hooks/useFormattedDate";
import { Icons } from "../../../ui/icons";
import Bet from "./bet";
import { Buttons } from "../../../ui/buttons";

export default function TeamDetails(props) {
  const { formattedDate } = useFormattedDate();
  const { team } = props;
  const [isBetOpen, setIsBetOpen] = useState(false);

  console.log(team);

  return (
    <>
      <Bet
        bet={{
          title: team.league.name,
          teams: {
            home: { name: team.teams.home.name, odd: team.odd.values[0]?.odd },
            draw: { name: "draw", odd: team.odd.values[1]?.odd },
            away: { name: team.teams.away.name, odd: team.odd.values[2]?.odd },
          },
        }}
        isBetOpen={isBetOpen}
        setIsBetOpen={setIsBetOpen}
      />
      {isBetOpen || (
        <Modal {...props} side={true} classname="!px-3">
          <article className="">
            <div className="mx-auto mb-4 w-fit rounded-lg bg-dark px-2 py-1 text-xs font-normal text-primary">
              {team?.fixture?.date && formattedDate(team?.fixture?.date)}
            </div>
            <header className="flex items-center justify-between rounded-md bg-dark p-2">
              <div className="flex items-center gap-2 text-base font-normal text-primary">
                <img src={team.teams?.home?.logo} alt="" className="h-8 w-8" />
                {team.teams?.home?.name}
              </div>

              <div className="flex items-center gap-2 text-base font-normal text-primary">
                {team.teams?.away?.name}
                <img src={team.teams?.away?.logo} alt="" className="h-8 w-8" />
              </div>
            </header>
            <div className="mt-0.5 rounded-md bg-dark p-2 pt-3">
              <div className="mb-0.5 grid grid-cols-3 text-sm font-medium text-primary">
                <div className="text-left">{team.teams?.home?.name}</div>
                <div className="text-center">HT</div>
                <div className="text-right text-gray">(2x45 Min)FT</div>
              </div>
              <section className="relative grid h-fit grid-cols-6 pl-4">
                {["15", "30", "45", "60", "75", "90"].map((name) => (
                  <div className="flex items-end justify-end">
                    <div className="flex flex-col items-center justify-center text-xs font-normal text-gray">
                      <div className="h-20 border-r border-gray"></div>
                      <div className="">{name}'</div>
                    </div>
                  </div>
                ))}
                <div className="absolute left-2.5 top-1/2 -mt-1 h-[0.15px] w-[calc(100%-19px)] -translate-y-1/2 bg-gray"></div>

                <div className="absolute left-0 top-0 flex items-end justify-end">
                  <div className="flex flex-col items-center justify-center text-xs font-normal text-primary">
                    <div className="h-20 border-r border-gray"></div>
                    <div className="">RBL</div>
                  </div>
                </div>
              </section>
            </div>
            <section className="mt-3.5 flex h-11 w-full items-center gap-2.5 rounded-md bg-dark px-4 py-2 text-primary">
              <Icons.search />
              <input
                type="text"
                className="h-full w-full border-l border-primary/20 bg-transparent pl-3 text-sm font-normal tracking-tight focus:outline-none"
                placeholder="Search..."
              />
            </section>
            <section className="mt-5 rounded-md bg-advance bg-primary/10 backdrop-blur-md">
              <div className="flex h-10 cursor-pointer items-center justify-between px-4 text-base font-normal text-primary">
                1x2 <Icons.arrow color="#ffffff" className="h-4 w-4 rotate-90" />
              </div>
              <div className="flex flex-col gap-3 border-t border-muted p-2">
                {[
                  { name: team.teams?.home?.name, odd: team.odd.values[0].odd },
                  { name: "draw", odd: team.odd?.values[1].odd },
                  { name: team.teams?.away?.name, odd: team.odd?.values[2].odd },
                ].map(({ name, odd }, idx) => (
                  <div className="flex items-center justify-between rounded-sm bg-dark p-2 text-sm font-medium capitalize tracking-wider text-primary">
                    <div className="">{name}</div>
                    <div className="text-secondary">{odd}</div>
                  </div>
                ))}
              </div>
            </section>
            <section className="mt-5 rounded-md bg-advance bg-primary/10 backdrop-blur-md">
              <div className="flex h-10 cursor-pointer items-center justify-between px-4 text-base font-normal text-primary">
                1x2 <Icons.arrow color="#ffffff" className="h-4 w-4 rotate-90" />
              </div>
              <div className="flex flex-col gap-3 border-t border-muted p-2">
                {[
                  { name: team.teams?.home?.name, odd: team.odd.values[0].odd },
                  { name: team.teams?.away?.name, odd: team.odd.values[2].odd },
                ].map(({ name, odd }, idx) => (
                  <div className="flex items-center justify-between rounded-sm bg-dark p-2 text-sm font-medium capitalize tracking-wider text-primary">
                    <div className="">{name}</div>
                    <div className="text-secondary">{odd}</div>
                  </div>
                ))}
              </div>
            </section>
            <Buttons.primary onClick={() => setIsBetOpen(true)}>Place bet</Buttons.primary>
          </article>
        </Modal>
      )}
    </>
  );
}
