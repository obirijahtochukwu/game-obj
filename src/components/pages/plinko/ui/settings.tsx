import React, { FormEvent, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import axios from "axios";
import SettingModal from "../../../ui/setting-modal";
import BetAmount from "../../../ui/bet-amount";

export default function Settings({
  multiplier,
  setMultiplier,
  startGame,
  setting,
  setSetting,
  betAmount,
  setBetAmount,
}: {
  multiplier: number;
  setMultiplier: React.Dispatch<number>;
  startGame: (e: FormEvent) => void;
  setting: boolean;
  setSetting: React.Dispatch<boolean>;
  betAmount: number;
  setBetAmount: React.Dispatch<number>;
}) {
  const [play, setPlay] = useState("Manual");
  const [level, setLevel] = useState("Basic");
  const [chain, setChain] = useState("");
  const multipliers = [0.5, 1.0, 1.1, 1.2, 1.4, 2, 9, 16];

  return (
    <SettingModal isOpen={setting} setIsOpen={setSetting}>
      <form onSubmit={startGame} className="mb-10 flex h-full flex-col gap-6">
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
          label={level || ""}
          title="Difficulty Level"
          data={["basic", "medium", "Hard"]}
          handleClick={(name) => setLevel(name)}
        />{" "}
        <Select
          label={multiplier.toString() || ""}
          title="Multiplier"
          data={multipliers}
          handleClick={(name) => setMultiplier(+name)}
        />
        <button
          type="submit"
          className="mt-auto flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-custom text-xl font-semibold text-primary"
        >
          Bet
        </button>
      </form>
    </SettingModal>
  );
}
