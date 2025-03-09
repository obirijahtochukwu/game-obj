import React, { useState } from "react";
import gameSoundEffect from "../../../../lib/utils/game-sound-effect";
import { video_poker_deck } from "../../../../lib/types";
import { useVideoPokerContext } from "../context";
import { evaluateHand, payoutTable } from "../utils";
import { generateRandomColor } from "../../../../lib/utils/generate-random-color";
import Walkthrough from "../../../ui/walkthrough";

const Game = () => {
  const { gamble, setGamble, balance, hand, deck, heldCards, toggleHold, introTip, setIntroTip } = useVideoPokerContext();

  return (
    <div className="mx-auto max-w-4xl p-2 md:p-4">
      {/* Card Display */}
      <Walkthrough
        introTip={introTip}
        setIntroTip={setIntroTip}
        id={4}
        title="Click Cards to Choose"
        content={`Select the cards you want to keep or discard by clicking on them. Your choices will shape your final hand, so pick carefully!`}
        position="left"
      >
        <main className="mx-auto h-60 w-full rounded-lg bg-black p-2 md:p-5">
          <section className="radial-grad flex h-full w-full flex-col justify-center rounded-lg px-3 sm:px-5">
            <div className="grid grid-cols-5 gap-4">
              {hand.map((card, index) => (
                <div key={index} onClick={() => toggleHold(index)}>
                  <div
                    className={`${
                      index == 0 ? "text-muted" : index == 1 ? "text-red-700" : index == 2 ? "text-secondary" : "text-blue-700"
                    } ${
                      heldCards.includes(index) ? "bg-yellow-200" : "bg-white"
                    } flex h-20 cursor-pointer flex-col items-center justify-items-start rounded-lg border text-xl shadow-md duration-300 md:h-24 md:w-20`}
                  >
                    <p className="flex justify-end">{card?.rank}</p>
                    <h1 className="text-4xl">{card?.suit}</h1>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </Walkthrough>

      {/* Payout Table */}
      <div className="mt-6">
        <h2 className="mb-2 text-xl font-bold text-primary">Payout Table</h2>
        <section className="flex flex-wrap gap-4 font-advance">
          {Object.entries(payoutTable).map(([hand, multiplier]) => (
            <div
              style={{ background: generateRandomColor() }}
              className="w-max rounded-sm px-1 py-0.5 font-semibold max-md:text-sm sm:px-3 sm:py-1"
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
