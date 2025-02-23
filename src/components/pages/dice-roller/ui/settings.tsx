import React, { useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useDiceRollerContext } from "../context";
import SettingModal from "../../../ui/setting-modal";
import { Buttons } from "../../../ui/buttons";
import BetAmount from "../../../ui/bet-amount";
import Walkthrough from "../../../ui/walkthrough";

export default function Settings() {
  const { betAmount, setBetAmount, isRolling, profitOnWin, rollDice, setting, setSetting, introTip, setIntroTip } =
    useDiceRollerContext();

  const [chain, setChain] = useState("");

  const props = { introTip, setIntroTip };

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
        <BetAmount {...props} id={1} value={betAmount} onChange={(e: number) => setBetAmount(e)} />
        <section>
          <div className="text-base font-medium text-primary/80">Profit on Win</div>
          <article className="mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary">
            <input disabled value={+profitOnWin || ""} className="h-full w-full bg-transparent focus:outline-none" />
          </article>
        </section>
        <Walkthrough
          {...props}
          id={3}
          title="Start the Game"
          content="Click the 'Start Game' button to begin your betting session"
          containerStyle="mt-auto"
        >
          <Buttons.play_game disabled={isRolling} type="submit">
            Start Game
          </Buttons.play_game>
        </Walkthrough>
      </form>
    </SettingModal>
  );
}
