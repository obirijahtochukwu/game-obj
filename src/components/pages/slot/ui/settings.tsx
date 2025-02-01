import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useSlotContext } from "../context";
import { FormInput } from "../../../ui/input";
import SettingModal from "../../../ui/setting-modal";

export default function Settings() {
  const { startGame, setting, setSetting, risklevel, setRiskLevel, gamble, setGamble } = useSlotContext();

  const [play, setPlay] = useState("Manual");
  const [level, setLevel] = useState("Basic");
  const [chain, setChain] = useState("");

  useEffect(() => {
    const item = risklevel.list.find(({ label }) => label == level);

    if (item.tag) {
      setRiskLevel({ ...risklevel, current: item });
      setGamble({
        ...gamble,
        payout: gamble.betAmount * risklevel.current.multiplier,
      });
    }
  }, [level, gamble.betAmount]);

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
        <section>
          <div className="text-base font-medium text-primary/80">Bet Amount</div>
          <article className="mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary">
            <input
              type="number"
              required
              value={gamble.betAmount}
              onChange={(e) => setGamble({ ...gamble, betAmount: +e.target.value })}
              placeholder="0.0000005"
              className="h-full w-full bg-transparent focus:outline-none"
            />
            <div className="grid h-full w-full max-w-24 grid-cols-2 rounded-md border border-gray bg-advance py-2">
              {["1/2", "2x"].map((label, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx == 1 && "border-l"
                  } flex cursor-pointer items-center justify-center text-xs font-semibold text-primary`}
                >
                  {label}
                </div>
              ))}
            </div>
          </article>
        </section>
        <Select label={level || ""} title="Risk" data={["Basic", "Medium", "Hard"]} handleClick={(name) => setLevel(name)} />{" "}
        <div className="w-full">
          <FormInput.setting disabled value={gamble.payout} />
          <button
            type="submit"
            className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-custom text-xl font-semibold text-primary"
          >
            Bet
          </button>
        </div>
      </form>
    </SettingModal>
  );
}
