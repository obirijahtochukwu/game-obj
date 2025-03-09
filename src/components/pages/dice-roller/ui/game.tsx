import React from "react";
import { useDiceRollerContext } from "../context";
import Select from "../../../ui/select";
import { Input } from "../../../ui/input";
import Walkthrough from "../../../ui/walkthrough";

export default function Game() {
  const { diceResult, betAmount, setBetAmount, multiplier, setMultiplier, isRolling, setIntroTip, winChance, introTip } =
    useDiceRollerContext();

  const multipliers = [1.0, 1.1, 1.9, 2.3, 2.7, 3.1, 3.5];

  const renderDiceFace = (number: number) => {
    const dots = {
      1: [false, false, false, false, true, false, false, false, false],
      2: [true, false, false, false, false, false, false, false, true],
      3: [true, false, false, false, true, false, false, false, true],
      4: [true, true, false, false, false, false, true, true, false],
      5: [true, true, false, false, true, false, true, true, false],
      6: [true, true, true, false, false, false, true, true, true],
    };

    return (
      <div className="absolute left-16 top-20 mb-5 grid h-24 w-24 scale-150 grid-cols-3 gap-2 rounded-sm bg-white p-3 shadow-lg sm:left-36 sm:top-44 sm:scale-[3.4]">
        {dots[number]?.map((active: boolean, index: number) => (
          <div key={index} className={`h-4 w-4 rounded-full ${active ? "rolling bg-dark" : "bg-transparent"}`}></div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 flex w-full flex-col items-center justify-center">
      <div className="relative h-60 w-60 sm:h-[420px] sm:w-96">
        {diceResult !== null ? renderDiceFace(diceResult) : renderDiceFace(6)}
      </div>
      <div className="grid w-full grid-cols-1 gap-4 rounded-3xl bg-advance p-3 text-primary sm:grid-cols-2 md:p-8">
        <Walkthrough
          introTip={introTip}
          setIntroTip={setIntroTip}
          id={2}
          title="Choose Your Outcome"
          content={`Select the outcome you want to bet on from the available options.`}
          position="left"
        >
          <Select
            bottom={true}
            label={`${multiplier?.toFixed(1)}x` || ""}
            title="Cashout At"
            data={multipliers}
            handleClick={(name) => setMultiplier(parseFloat(name))}
          />
        </Walkthrough>
        <section className="">
          <div className="font-primary text-base font-medium">Win Chance (%)</div>
          <Input.number value={winChance} />
        </section>
      </div>
      {/* <p className="text-xl font-medium text-gray-800 mt-4">{resultMessage}</p> */}
    </div>
  );
}
