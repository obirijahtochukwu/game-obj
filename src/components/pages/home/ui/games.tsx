import React, { useEffect, useState } from "react";
import { Buttons } from "../../../ui/buttons";
import { games } from "../mock-data";
import { Link, useNavigate } from "react-router-dom";
import Button from "./button";
import axios from "axios";
import { backend_api } from "../../../../lib/constants";
import { GameStatistics } from "../../../../lib/types";

export default function Games({ activePlayers }: { activePlayers: (e: string) => string }) {
  return (
    <article className="font-advance">
      <div className="flex items-center gap-1 text-xl font-semibold tracking-wider">🎮 Games</div>
      <section className="mt-4 grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {games.map(({ label, url, image }, idx) => (
          <div key={idx} className="s,:p-3 flex h-72 flex-col rounded-md border border-gray bg-sm p-2">
            <img src={image} className="h-32 w-full rounded-md bg-background" />
            <div className="mt-2 text-lg font-bold uppercase">{label}</div>
            <div className="text-sm text-grey">Active players: {activePlayers(label)}</div>
            <Button url={url} />
          </div>
        ))}
      </section>
    </article>
  );
}
