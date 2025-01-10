import React, { useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useDiceRollerContext } from "../context";

export default function Settings() {
  const {
    betAmount,
    setBetAmount,
    isRolling,
    profitOnWin,
    rollDice,
    setting,
    setSetting,
  } = useDiceRollerContext();

  const [chain, setChain] = useState("");

  return (
    <form
      onSubmit={rollDice}
      className={`${
        setting ? " translate-x-0" : " max-lg:-translate-x-[700px]"
      } bg-advance p-4 w-full sm:max-w-96 lg:rounded-3xl flex flex-col gap-6 | max-lg:fixed max-lg:h-full max-lg:top-0 max-lg:left-0 max-lg:z-50 duration-300 max-lg:pt-12 max-lg:overflow-y-auto custom-scrollbar`}
    >
      <Icons.close
        onClick={() => setSetting(false)}
        className="lg:hidden absolute top-3 right-3 w-4 cursor-pointer"
      />

      <Select
        label={chain || ""}
        title="Crypto Chain"
        data={["btc", "sol", "ton", "eth"]}
        handleClick={(name) => setChain(name)}
      />
      <section>
        <div className=" text-base font-medium text-primary/80">Bet Amount</div>
        <input
          type="number"
          placeholder="0.0000005"
          required
          autoFocus
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value))}
          className="h-14 w-full bg-muted border border-gray rounded-lg font-semibold text-base text-primary px-3 py-1.5 mt-2 gap-3 focus:outline-none"
        />
      </section>
      <section>
        <div className=" text-base font-medium text-primary/80">
          Profit on Win
        </div>
        <article className="h-14 w-full bg-muted border border-gray rounded-lg flex items-center justify-between font-semibold text-base text-primary px-3 py-1.5 mt-2 gap-3">
          <input
            disabled
            value={+profitOnWin || ""}
            className=" w-full h-full bg-transparent focus:outline-none"
          />
        </article>
      </section>
      <button
        disabled={isRolling}
        type="submit"
        className=" w-full mt-auto flex items-center justify-center bg-gradient-custom min-h-12 rounded-xl text-primary font-semibold text-xl"
      >
        Bet
      </button>
    </form>
  );
}
