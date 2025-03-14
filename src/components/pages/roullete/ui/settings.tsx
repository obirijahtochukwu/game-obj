import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useRoulleteContext } from "../context";
import SettingModal from "../../../ui/setting-modal";
import { generateRandomNumber } from "../../../../lib/utils/generateRandomNumber";
import BetAmount from "../../../ui/bet-amount";
import Walkthrough from "../../../ui/walkthrough";
import Balance from "../../../ui/balance";
// import Walkthrough from './../../../ui/walkthrough copy';

export default function Settings() {
  const { gamble, setGamble, isSetting, setIsSetting, startGame, introTip, setIntroTip } = useRoulleteContext();

  const [chain, setChain] = useState("");

  const buttonClass = (custom: string) =>
    `${custom} w-full mt-auto flex items-center justify-center min-h-12 rounded-lg text-primary font-semibold text-xl`;

  useEffect(() => {
    if (gamble.betAmount && gamble.outcomes.length > 0) {
      if (gamble.outcomes.length == 1 || gamble.outcomes.toString() == "Odd" || gamble.outcomes.toString() == "Even") {
        setGamble({ ...gamble, multiplier: 3.0, payout: 3 * gamble.betAmount });
      } else if (gamble.outcomes.length == 2) {
        setGamble({
          ...gamble,
          multiplier: 2.5,
          payout: 2.5 * gamble.betAmount,
        });
      } else {
        setGamble({
          ...gamble,
          multiplier: 1.2,
          payout: 1.2 * gamble.betAmount,
        });
      }
      // setGamble({})
    }
  }, [gamble.betAmount, gamble.outcomes]);

  const props = {
    introTip,
    setIntroTip,
  };

  return (
    <SettingModal isOpen={isSetting} setIsOpen={setIsSetting}>
      <form
        onSubmit={(e) => {
          startGame(e, generateRandomNumber());
        }}
        className="z-50 flex h-full flex-col gap-6"
      >
        <Balance />
        <BetAmount {...props} id={1} value={gamble.betAmount} onChange={(e: number) => setGamble({ ...gamble, betAmount: e })} />
        <section>
          <div className="text-base font-medium text-primary/80">Profit on Win</div>
          <article className="mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary">
            <input value={gamble.payout} className="h-full w-full bg-transparent focus:outline-none" />
          </article>
        </section>

        <section>
          <div className="text-base font-medium text-primary/80">Multiplier</div>
          <article className="mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary">
            <input
              disabled
              value={gamble.multiplier && `${gamble.multiplier}x`}
              className="h-full w-full bg-transparent focus:outline-none"
            />
          </article>
        </section>

        <Walkthrough
          {...props}
          id={3}
          title="Start the Game"
          content="Click the 'Start Game' button to begin your betting session"
        >
          <button
            // disabled={gamble.outcomes.length < 1}
            className={buttonClass(`${gamble.outcomes.length < 1 && "cursor-not-allowed opacity-70"} bg-gradient-custom`)}
          >
            Start Play
          </button>
        </Walkthrough>
      </form>
    </SettingModal>
  );
}
