import React, { useEffect, useRef, useState } from "react";
import { slots } from "../mock-data";
import Circle from "./circle";
import { useSlotContext } from "../context";

export default function Game() {
  const { isGameActive } = useSlotContext();

  useEffect(() => {
    const slots = ["slot-1", "slot-2", "slot-3", "slot-4"];

    slots.forEach((id, index) => {
      const slotElement = document.getElementById(id);
      if (slotElement) {
        slotElement.style.setProperty("--index", `${index + 1}`);
      }
    });
  }, []);

  return (
    <div>
      <article className=" h-[429px] w-[429px] bg-primary mx-auto relative rounded-full">
        {slots.map(({ id, animation, data }, idx) => (
          <Circle
            key={idx}
            id={id}
            coinData={data}
            animation={isGameActive ? animation : ""}
          />
        ))}
      </article>
    </div>
  );
}
