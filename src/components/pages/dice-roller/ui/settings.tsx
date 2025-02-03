import React, { useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useDiceRollerContext } from "../context";
import SettingModal from "../../../ui/setting-modal";
import { Buttons } from "../../../ui/buttons";

export default function Settings() {
  const { betAmount, setBetAmount, isRolling, profitOnWin, rollDice, setting, setSetting } = useDiceRollerContext();

  const [chain, setChain] = useState("");

  return (
    <SettingModal isOpen={setting} setIsOpen={setSetting}>
      <form onSubmit={rollDice} className="flex h-full flex-col gap-6">
        <Icons.close onClick={() => setSetting(false)} className="absolute right-3 top-3 w-4 cursor-pointer lg:hidden" />

        <Select
          label={chain || ""}
          title="Crypto Chain"
          data={["btc", "sol", "ton", "eth"]}
          handleClick={(name) => setChain(name)}
        />
        <section>
          <div className="text-base font-medium text-primary/80">Bet Amount</div>
          <input
            type="number"
            placeholder="0.0000005"
            required
            autoFocus
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value))}
            className="mt-2 h-14 w-full gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary focus:outline-none"
          />
        </section>
        <section>
          <div className="text-base font-medium text-primary/80">Profit on Win</div>
          <article className="mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary">
            <input disabled value={+profitOnWin || ""} className="h-full w-full bg-transparent focus:outline-none" />
          </article>
        </section>
        <Buttons.play_game disabled={isRolling} type="submit" classname=" mt-auto">
          Bet
        </Buttons.play_game>
      </form>
    </SettingModal>
  );
}
