import React, { FormEvent, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useClick } from "../../../../lib/hooks/useclick";
import { useAviatorContext } from "../context";
import Infos from "./infos";
import { Input } from "../../../ui/input";
import SettingModal from "./../../../ui/setting-modal";
import BetAmount from "../../../ui/bet-amount";
import Walkthrough from "../../../ui/walkthrough";
import Balance from "../../../ui/balance";

export default function Settings() {
  const { cashOutAt, setCashOutAt, startGame, setting, setSetting, betAmount, setBetAmount, balance, introTip, setIntroTip } =
    useAviatorContext();

  const { isOpen, setIsOpen, targetRef } = useClick.auto();
  const [play, setPlay] = useState("Manual");
  const [level, setLevel] = useState("Basic");
  const [chain, setChain] = useState("");
  const cashouts = [1.0, 1.1, 1.9, 2.3, 2.7, 3.1, 3.5];

  const props = { introTip, setIntroTip };

  return (
    <SettingModal isOpen={setting} setIsOpen={setSetting}>
      <form onSubmit={startGame} className="flex h-full flex-col gap-6">
        <Icons.close onClick={() => setSetting(false)} className="absolute right-3 top-3 w-4 cursor-pointer lg:hidden" />
        <Balance />
        <BetAmount {...props} id={1} value={betAmount} onChange={(e: number) => setBetAmount(e)} />

        <Walkthrough
          {...props}
          id={2}
          title="Select Cash Out in Aviator"
          content={`Select the "Cash Out" option at the right moment to secure your winnings before the plane flies away. Timing is everything—don’t wait too long!`}
        >
          <Select
            label={cashOutAt?.toFixed(1).toString() || ""}
            title="Cashout At"
            data={cashouts}
            handleClick={(name) => setCashOutAt(parseFloat(name))}
          />
        </Walkthrough>
        <section>
          <div className="text-base font-medium text-primary/80">Profit on Win</div>
          <Input.number disabled value={`${betAmount * cashOutAt} SOL`} />
        </section>
        <Walkthrough
          {...props}
          id={3}
          title="Start the Game"
          content="Click the 'Start Game' button to begin your betting session"
          containerStyle="mt-auto"
        >
          <button
            type="submit"
            className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-custom text-xl font-semibold text-primary"
          >
            Bet
          </button>
        </Walkthrough>
        {/* <Infos balance={balance} /> */}
      </form>
    </SettingModal>
  );
}
