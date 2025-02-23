import React from "react";
import { Buttons } from "../../../ui/buttons";
import { games } from "../mock-data";
import { Link, useNavigate } from "react-router-dom";
import Button from "./button";

export default function Games() {
  // const sports = tabs()[1]?.pages;

  return (
    <article className="font-advance">
      <div className="flex items-center gap-1 text-xl font-semibold tracking-wider">🎮 Games</div>
      <section className="mt-4 grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {games.map(({ label, url, image }, idx) => (
          <div key={idx} className="hi flex h-72 flex-col rounded-md border border-gray bg-sm p-3">
            <img src={image} className="h-32 w-full rounded-md bg-background" />
            <div className="mt-2 text-lg font-bold uppercase">{label}</div>
            <div className="text-sm text-grey">Active players: {idx + 3 * 7}</div>
            <Button url={url} />
          </div>
        ))}
      </section>
    </article>
  );
}
