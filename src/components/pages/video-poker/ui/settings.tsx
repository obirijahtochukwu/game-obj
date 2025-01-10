import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useVideoPokerContext } from "../context";
import SettingModal from "../../../ui/setting-modal";
import { generateRandomNumber } from "../../../../lib/utils/generateRandomNumber";
import { Buttons } from "../../../ui/buttons";

export default function Settings() {
  const {
    isSetting,
    setIsSetting,
    gamble,
    setGamble,
    heldCards,
    redraw,
    draw,
    deal,
  } = useVideoPokerContext();

  const [chain, setChain] = useState("");

  return (
    <SettingModal isOpen={isSetting} setIsOpen={setIsSetting}>
      <article className=" h-full flex-col flex gap-6">
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
          <input
            type="number"
            placeholder="0.0000005"
            required
            autoFocus
            value={gamble.betAmount}
            onChange={(e) =>
              setGamble({ ...gamble, betAmount: parseFloat(e.target.value) })
            }
            className="h-14 w-full bg-muted border border-gray rounded-lg font-semibold text-base text-primary px-3 py-1.5 mt-2 gap-3 focus:outline-none"
          />
        </section>

        <Buttons.secondary onClick={deal} classname=" mt-auto bg-secondary">
          Deal
        </Buttons.secondary>
        <Buttons.secondary onClick={redraw} classname=" !bg-primary !text-dark">
          Redraw
        </Buttons.secondary>
        <Buttons.secondary onClick={draw} disabled={heldCards.length == 0}>
          Cashout
        </Buttons.secondary>
      </article>
    </SettingModal>
  );
}
