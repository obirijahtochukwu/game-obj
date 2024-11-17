import React, { useEffect, useRef, useState } from "react";
import { ALL_SYMBOLS, SYMBOLS_FOOD, SYMBOLS_RANDOM } from "../ui/symbols";
import { SMSoundService } from "../../../../lib/hooks/useSoundProvider";
import { slots } from "../mock-data";
import Circle from "./circle";
import getClosestNum from "../../../../lib/getClosestNum";
import { coin } from "../../../../lib/types";

export default function Game({
  picks,
  setPicks,
  play,
}: {
  play: boolean;
  picks: coin[];
  setPicks: React.Dispatch<coin[]>;
}) {
  useEffect(() => {
    document.getElementById("jole")?.style.setProperty("--index", "4");
    document.getElementById("joe")?.style.setProperty("--index", "3");
    document.getElementById("jo")?.style.setProperty("--index", "2");
    document.getElementById("j")?.style.setProperty("--index", "1");
  }, []);

  return (
    <div>
      <article className=" h-[429px] w-[429px] bg-primary mx-auto relative rounded-full">
        {slots.map((props, idx) => (
          <Circle
            key={idx}
            idx={idx}
            {...props}
            animation={play ? props.animation : ""}
            picks={picks}
            play={play}
            setPicks={setPicks}
          />
        ))}
      </article>
    </div>
  );
}
