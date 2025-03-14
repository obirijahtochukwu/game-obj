import React from "react";
import { GameData } from "../types";
import { Icons } from "../../../ui/icons";
import Tag from "../../football/ui/tag";
import { toPercentage } from "../../../../lib/constants";
import GameInfo from "./game-info";

export default function Game(prop: GameData) {
  return (
    <GameInfo
      game={prop}
      className="flex min-h-64 cursor-pointer flex-col gap-4 rounded-2xl border-2 border-transparent bg-muted p-4 text-primary duration-200 hover:shadow-md"
    >
      <>
        <div className="flex items-center justify-between text-xl font-semibold tracking-tight text-grey">{prop.league.name}</div>
        <section className="flex items-center justify-between font-advance">
          <div className="">
            <div className="flex items-center gap-2 text-lg font-medium">
              {prop?.teams.home?.logo ? (
                <img src={prop?.teams.home?.logo} alt="" className="h-8 w-8 rounded-full" />
              ) : (
                <Icons.basketball className="h-8 w-8 rounded-full text-pink" />
              )}
              {prop?.teams.home.name}
            </div>
            <div className="mt-6 flex items-center gap-2 text-lg font-medium">
              {prop?.teams.away?.logo ? (
                <img src={prop?.teams.away?.logo} alt="" className="h-7 w-8 rounded-full" />
              ) : (
                <Icons.basketball className="h-8 w-8 rounded-full text-pink" />
              )}
              {prop.teams.away.name}
            </div>
          </div>
          <div className="text-lg font-medium">{prop.odds[0].odd}</div>
          <div className="flex flex-col gap-4">
            <Tag>
              <>{prop.odds[0].odd}</>
            </Tag>
            <Tag>
              <> {prop.odds[2].odd}</>
            </Tag>
          </div>
        </section>
        <section className="mt-auto flex flex-wrap gap-2">
          <Tag>
            <>
              {prop.teams.home.name}
              <div className="">{toPercentage(+prop.odds[0].odd)}</div>
            </>
          </Tag>
          <Tag>
            <>
              Draw
              <div className="">{toPercentage(+prop.odds[1].odd)}</div>
            </>
          </Tag>
          <Tag>
            <>
              {prop.teams.away.name}
              <div className="">{prop.odds[2].odd}</div>
            </>
          </Tag>
        </section>
      </>
    </GameInfo>
  );
}
