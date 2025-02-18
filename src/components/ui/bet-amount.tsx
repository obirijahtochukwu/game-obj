import React from "react";
import { formattedNumber } from "../../lib/utils/formattedNumber";
import { useGlobalContext } from "../../lib/global-context";
import { useClick } from "../../lib/hooks/useclick";

export default function BetAmount({ value, onChange }) {
  const { balance } = useGlobalContext().user.info;
  const { isOpen, setIsOpen, targetRef } = useClick.auto();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(inputValue) && inputValue < balance) {
      onChange(inputValue);
    }
  };

  const adjustAmount = (label: string) => {
    if (label == "2x") {
      if (value * 2 < balance) onChange(value * 2);
    } else {
      if (value > 1) {
        onChange((value * 0.5).toFixed(1));
      }
    }
  };

  return (
    <section>
      <div className="flex items-center gap-2 text-base font-medium">
        Bet Amount{" "}
        <div className="rounded-sm bg-success px-1 font-advance text-xs font-bold text-background">
          ${balance && formattedNumber(balance - value)}
        </div>
      </div>
      <article
        ref={targetRef}
        className="relative mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary"
      >
        <input
          onClick={() => setIsOpen(true)}
          required
          value={value}
          onChange={handleInputChange}
          placeholder="0.05"
          className="h-full w-full bg-transparent focus:outline-none"
        />
        <div className="grid h-full w-full max-w-24 grid-cols-2 rounded-md border border-gray bg-advance py-2">
          {["1/2x", "2x"].map((label, idx) => (
            <button
              disabled={value < 0}
              type="button"
              key={idx}
              onClick={() => adjustAmount(label)}
              className={`${
                idx == 1 && "border-l"
              } flex cursor-pointer items-center justify-center font-advance text-xs font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {label}
            </button>
          ))}
        </div>
        <section
          className={`${isOpen ? "visible h-52 py-1 opacity-100" : "invisible h-0 opacity-0"} absolute left-0 top-full z-10 mt-2 flex w-full flex-col rounded-md bg-sm px-1 font-advance text-base shadow-md duration-300`}
        >
          {[2, 4, 7, 5, 12].map((val) => {
            const number = Math.round(100 / val);
            return (
              <div
                onClick={() => {
                  onChange(number);
                  setIsOpen(false);
                }}
                className="cursor-pointer rounded-md p-2 hover:bg-background/80"
              >
                ${number}
              </div>
            );
          })}
        </section>
      </article>
    </section>
  );
}
