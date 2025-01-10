import React, { FormEvent, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useClick } from "../../../../lib/hooks/useclick";
import { useAviatorContext } from "../context";
import Infos from "./infos";
import { Input } from "../../../ui/input";
import SettingModal from "./../../../ui/setting-modal";

export default function Settings() {
  const {
    cashOutAt,
    setCashOutAt,
    startGame,
    setting,
    setSetting,
    betAmount,
    setBetAmount,
    balance,
  } = useAviatorContext();

  const { isOpen, setIsOpen, targetRef } = useClick.auto();
  const [play, setPlay] = useState("Manual");
  const [level, setLevel] = useState("Basic");
  const [chain, setChain] = useState("");
  const cashouts = [1.0, 1.1, 1.9, 2.3, 2.7, 3.1, 3.5];

  return (
    <SettingModal isOpen={setting} setIsOpen={setSetting}>
      <form onSubmit={startGame} className=" h-full flex-col flex gap-6">
        <Icons.close
          onClick={() => setSetting(false)}
          className="lg:hidden absolute top-3 right-3 w-4 cursor-pointer"
        />
        <section className=" min-h-14 rounded-full grid grid-cols-2 bg-muted p-1">
          {["Manual", "Auto"].map((name) => (
            <div
              key={name}
              onClick={() => setPlay(name)}
              className={`${
                play == name ? "bg-advance" : ""
              } flex items-center justify-center rounded-full text-primary text-lg font-bold cursor-pointer duration-300`}
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
        <section>
          <div className=" text-base font-medium text-primary/80">
            Bet Amount
          </div>
          <article className="h-14 w-full bg-muted border border-gray rounded-lg flex items-center justify-between font-semibold text-base text-primary px-3 py-1.5 mt-2 gap-3">
            <input
              type="number"
              placeholder="0.0000005"
              autoFocus
              required
              value={betAmount}
              onChange={(e) => setBetAmount(parseFloat(e.target.value))}
              className=" w-full h-full bg-transparent focus:outline-none"
            />
            <div className=" h-full max-w-24 bg-advance border-gray border w-full rounded-md grid grid-cols-2 py-2">
              {["1/2", "2x"].map((label, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx == 1 && " border-l"
                  } flex items-center justify-center cursor-pointer text-primary font-semibold text-xs`}
                >
                  {label}
                </div>
              ))}
            </div>
          </article>
        </section>
        <Select
          label={cashOutAt?.toFixed(1).toString() || ""}
          title="Cashout At"
          data={cashouts}
          handleClick={(name) => setCashOutAt(parseFloat(name))}
        />
        <section>
          <div className=" text-base font-medium text-primary/80">
            Profit on Win
          </div>
          <Input.number disabled value={`${betAmount * cashOutAt} SOL`} />
        </section>
        <button
          type="submit"
          className=" w-full mt-4 flex items-center justify-center bg-gradient-custom min-h-12 rounded-xl text-primary font-semibold text-xl"
        >
          Bet
        </button>
        <Infos balance={balance} />
      </form>
    </SettingModal>
  );
}
