import React, { FormEvent, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useClick } from "../../../../lib/hooks/useclick";
import { useAviatorContext } from "../context";
import Infos from "./infos";
import { Input } from "../../../ui/input";
import SettingModal from "./../../../ui/setting-modal";
import BetAmount from "../../../ui/bet-amount";

export default function Settings() {
  const { cashOutAt, setCashOutAt, startGame, setting, setSetting, betAmount, setBetAmount, balance } = useAviatorContext();

  const { isOpen, setIsOpen, targetRef } = useClick.auto();
  const [play, setPlay] = useState("Manual");
  const [level, setLevel] = useState("Basic");
  const [chain, setChain] = useState("");
  const cashouts = [1.0, 1.1, 1.9, 2.3, 2.7, 3.1, 3.5];

  return (
    <SettingModal isOpen={setting} setIsOpen={setSetting}>
      <form onSubmit={startGame} className="flex h-full flex-col gap-6">
        <Icons.close onClick={() => setSetting(false)} className="absolute right-3 top-3 w-4 cursor-pointer lg:hidden" />
        <section className="grid min-h-14 grid-cols-2 rounded-full bg-muted p-1">
          {["Manual", "Auto"].map((name) => (
            <div
              key={name}
              onClick={() => setPlay(name)}
              className={`${
                play == name ? "bg-advance" : ""
              } flex cursor-pointer items-center justify-center rounded-full text-lg font-bold text-primary duration-300`}
            >
              {name}
            </div>
          ))}
        </section>
        <Select
          label={chain || ""}
          title="Crypto Chain"
          data={["btc", "sol", "ton", "eth"]}
          handleClick={(name) => setChain(name)}
        />
        <BetAmount value={betAmount} onChange={(e: number) => setBetAmount(e)} />

        <Select
          label={cashOutAt?.toFixed(1).toString() || ""}
          title="Cashout At"
          data={cashouts}
          handleClick={(name) => setCashOutAt(parseFloat(name))}
        />
        <section>
          <div className="text-base font-medium text-primary/80">Profit on Win</div>
          <Input.number disabled value={`${betAmount * cashOutAt} SOL`} />
        </section>
        <button
          type="submit"
          className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-custom text-xl font-semibold text-primary"
        >
          Bet
        </button>
        <Infos balance={balance} />
      </form>
    </SettingModal>
  );
}
