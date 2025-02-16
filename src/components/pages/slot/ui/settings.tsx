import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useSlotContext } from "../context";
import { FormInput } from "../../../ui/input";
import SettingModal from "../../../ui/setting-modal";
import { useGlobalContext } from "../../../../lib/global-context";
import { Buttons } from "../../../ui/buttons";
import { formattedNumber } from "../../../../lib/utils/formattedNumber";
import BetAmount from "../../../ui/bet-amount";

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
        <BetAmount value={gamble.betAmount} onChange={(e: number) => setBetAmount(e)} />

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
