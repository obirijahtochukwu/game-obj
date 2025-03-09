import React from "react";
import { Buttons } from "../../../ui/buttons";
import { Link, useNavigate } from "react-router-dom";
import { tabs } from "../../../layout/mock-data";
import { Icons } from "../../../ui/icons";
import Button from "./button";
import { GameStatistics } from "../../../../lib/types";

export default function Sports({ activePlayers }: { activePlayers: (e: string) => string }) {
  const sports = tabs()[2]?.pages;

  return (
    <article className="mt-5 font-advance">
      <div className="flex items-center gap-1 text-xl font-semibold tracking-wider">📺 Sports</div>
      <section className="mt-4 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* @ts-ignore */}
        {sports?.map(({ label, url, image }, idx) => (
          <div key={idx} className="flex h-72 flex-col rounded-md border border-gray bg-sm p-2 sm:p-3">
            <img src={image} className="h-32 w-full rounded-md bg-background" />
            <div className="mt-2 text-lg font-bold uppercase">{label}</div>
            <div className="text-sm text-grey">Active users: {activePlayers(label)}</div>

            <Button url={url} />
          </div>
        ))}
      </section>
    </article>
  );
}
