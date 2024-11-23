import React from "react";
import { useGlobalContext } from "../context";
import Select from "../../../ui/select";
import { Input } from "../../../ui/input";

export default function Game() {
  const {
    diceResult,
    betAmount,
    setBetAmount,
    multiplier,
    setMultiplier,
    isRolling,
    resultMessage,
    winChance,
    profitOnWin,
    rollDice,
    setting,
    setSetting,
  } = useGlobalContext();

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
      <div className="grid grid-cols-3 gap-2 w-24 h-24 scale-150 sm:scale-[3.4] bg-white rounded-sm shadow-lg p-3 mb-5 absolute top-20 left-16 sm:top-44 sm:left-36">
        {dots[number]?.map((active, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              active ? "bg-dark" : "bg-transparent"
            }`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100">
      <div className="w-60 h-60 sm:h-[420px] sm:w-96 relative">
        {diceResult !== null ? renderDiceFace(diceResult) : renderDiceFace(6)}
      </div>
      <div className="w-full p-8 rounded-3xl bg-advance text-primary grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          bottom={true}
          label={`${multiplier?.toFixed(1)}x` || ""}
          title="Cashout At"
          data={multipliers}
          handleClick={(name) => setMultiplier(parseFloat(name))}
        />
        <section className="">
          <div className=" font-primary text-base font-medium">
            Win Chance (%)
          </div>
          <Input.number value={winChance} />
        </section>
      </div>
      {/* <p className="text-xl font-medium text-gray-800 mt-4">{resultMessage}</p> */}
    </div>
  );
}
