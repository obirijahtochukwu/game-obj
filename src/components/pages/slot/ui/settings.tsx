import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useSlotContext } from "../context";
import { FormInput } from "../../../ui/input";
import SettingModal from "../../../ui/setting-modal";
import { useGlobalContext } from "../../../../lib/global-context";
import { Buttons } from "../../../ui/buttons";
import { formattedNumber } from "../../../../lib/utils/formattedNumber";

export default function Settings() {
  const { startGame, setting, setSetting, risklevel, setRiskLevel, gamble, setGamble } = useSlotContext();
  const { balance } = useGlobalContext().user.info;

  const [level, setLevel] = useState("Basic");
  const [chain, setChain] = useState("");

  const setBetAmount = (value: number) => {
    if (balance > value) {
      setGamble({ ...gamble, betAmount: value });
    }
  };

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
        <Select
          label={chain || ""}
          title="Crypto Chain"
          data={["btc", "sol", "ton", "eth"]}
          handleClick={(name) => setChain(name)}
        />
        <section>
          <div className="flex items-center gap-2 text-base font-medium">
            Bet Amount{" "}
            <div className="rounded-sm bg-success px-1 font-advance text-xs font-bold text-background">
              ${formattedNumber(balance)}
            </div>
          </div>
          <article className="mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary">
            <input
              type="number"
              required
              value={gamble.betAmount}
              onChange={(e) => setBetAmount(+e.target.value)}
              placeholder="0.05"
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
        <Select label={level || ""} title="Risk" data={["Basic", "Medium", "Hard"]} handleClick={(name) => setLevel(name)} />
        <div className="">
          <div className="text-base font-medium">Payout</div>
          <FormInput.setting disabled value={gamble.payout} />
        </div>
        <Buttons.play_game classname="mt-auto">Bet</Buttons.play_game>
      </form>
    </SettingModal>
  );
}
