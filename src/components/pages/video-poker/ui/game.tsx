import React, { useState } from "react";
import gameSoundEffect from "../../../../lib/utils/game-sound-effect";
import { video_poker_deck } from "../../../../lib/types";
import { useVideoPokerContext } from "../context";
import { evaluateHand, payoutTable } from "../utils";
import { generateandomColor } from "../../../../lib/utils/generate-random-color";

const Game = () => {
  const {
    gamble,
    setGamble,
    balance,
    hand,
    deck,
    heldCards,
    toggleHold,
    redraw,
    deal,
  } = useVideoPokerContext();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Card Display */}
      <main className=" bg-black w-full mx-auto h-60 p-5 rounded-[30px]">
        <section className="h-full w-full radial-grad rounded-[30px] flex flex-col justify-center px-5">
          <div className="grid grid-cols-5 gap-4">
            {hand.map((card, index) => (
              <div key={index} onClick={() => toggleHold(index)}>
                <div
                  className={`${
                    index == 0
                      ? " text-muted"
                      : index == 1
                      ? " text-red-700"
                      : index == 2
                      ? " text-secondary"
                      : " text-blue-700"
                  } ${
                    heldCards.includes(index) ? "bg-yellow-200" : "bg-white"
                  } w-20 h-24 border rounded-lg shadow-md flex flex-col items-center  justify-items-start text-xl duration-300 cursor-pointer`}
                >
                  <p className="flex justify-end">{card?.rank}</p>
                  <h1 className="text-4xl">{card?.suit}</h1>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Payout Table */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2 text-primary">Payout Table</h2>
        <section className=" flex flex-wrap gap-4">
          {Object.entries(payoutTable).map(([hand, multiplier]) => (
            <div
              style={{ background: generateandomColor() }}
              className=" w-max px-3 py-1 rounded-lg font-semibold"
              key={hand}
            >
              {hand}: {multiplier}x
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Game;
