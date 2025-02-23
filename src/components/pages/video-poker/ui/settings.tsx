import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useVideoPokerContext } from "../context";
import SettingModal from "../../../ui/setting-modal";
import { generateRandomNumber } from "../../../../lib/utils/generateRandomNumber";
import { Buttons } from "../../../ui/buttons";
import BetAmount from "../../../ui/bet-amount";
import Walkthrough from "../../../ui/walkthrough";

export default function Settings() {
  const { isSetting, setIsSetting, gamble, setGamble, heldCards, redraw, draw, deal, introTip, setIntroTip } =
    useVideoPokerContext();

  const [chain, setChain] = useState("");

  const props = {
    introTip,
    setIntroTip,
  };

  return (
    <SettingModal isOpen={isSetting} setIsOpen={setIsSetting}>
      <form onSubmit={draw} className="flex h-full flex-col gap-6">
        <Select
          label={chain || ""}
          title="Crypto Chain"
          data={["btc", "sol", "ton", "eth"]}
          handleClick={(name) => setChain(name)}
        />
        <BetAmount {...props} id={1} value={gamble.betAmount} onChange={(e: number) => setGamble({ ...gamble, betAmount: e })} />

        <Walkthrough
          {...props}
          id={2}
          title="Deal for Video Poker"
          content={`Click the "Deal" button to receive your initial hand. The cards you get will set the stage for your poker strategy—choose wisely!`}
          containerStyle=" mt-auto"
        >
          <Buttons.secondary type="button" onClick={deal} classname=" bg-secondary">
            Deal
          </Buttons.secondary>
        </Walkthrough>
        <Walkthrough
          {...props}
          id={3}
          title="Redraw Your Cards"
          content={`Click the "Redraw" button to replace unwanted cards in your hand.`}
        >
          <Buttons.secondary type="button" onClick={redraw} classname=" !bg-primary !text-dark">
            Redraw
          </Buttons.secondary>
        </Walkthrough>
        <Walkthrough
          {...props}
          id={5}
          title="Cash Out"
          content={`Click the "Cash Out" button to secure your winnings and end the round.`}
        >
          {heldCards.length < 1 && introTip != 5 ? null : <Buttons.secondary type="submit">Cashout</Buttons.secondary>}
        </Walkthrough>
      </form>
    </SettingModal>
  );
}
