import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useVideoPokerContext } from "../context";
import SettingModal from "../../../ui/setting-modal";
import { generateRandomNumber } from "../../../../lib/utils/generateRandomNumber";
import { Buttons } from "../../../ui/buttons";
import BetAmount from "../../../ui/bet-amount";

export default function Settings() {
  const { isSetting, setIsSetting, gamble, setGamble, heldCards, redraw, draw, deal } = useVideoPokerContext();

  const [chain, setChain] = useState("");

  return (
    <SettingModal isOpen={isSetting} setIsOpen={setIsSetting}>
      <form onSubmit={draw} className="flex h-full flex-col gap-6">
        <Select
          label={chain || ""}
          title="Crypto Chain"
          data={["btc", "sol", "ton", "eth"]}
          handleClick={(name) => setChain(name)}
        />
        <BetAmount value={gamble.betAmount} onChange={(e: number) => setGamble({ ...gamble, betAmount: e })} />

        <Buttons.secondary type="button" onClick={deal} classname=" mt-auto bg-secondary">
          Deal
        </Buttons.secondary>
        <Buttons.secondary type="button" onClick={redraw} classname=" !bg-primary !text-dark">
          Redraw
        </Buttons.secondary>
        {heldCards.length == 0 || <Buttons.secondary type="submit">Cashout</Buttons.secondary>}
      </form>
    </SettingModal>
  );
}
