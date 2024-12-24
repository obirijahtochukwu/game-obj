import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useRoulleteContext } from "../context";
import SettingModal from "../../../ui/setting-modal";
import { generateRandomNumber } from "../../../../lib/utils/generateRandomNumber";

export default function Settings() {
  const { gamble, setGamble, isSetting, setIsSetting, startGame } =
    useRoulleteContext();

  const [chain, setChain] = useState("");

  const buttonClass = (custom: string) =>
    `${custom} w-full mt-auto flex items-center justify-center min-h-12 rounded-lg text-primary font-semibold text-xl`;

  useEffect(() => {
    if (gamble.betAmount && gamble.outcomes.length > 0) {
      if (
        gamble.outcomes.length == 1 ||
        gamble.outcomes.toString() == "Odd" ||
        gamble.outcomes.toString() == "Even"
      ) {
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

  return (
    <SettingModal isOpen={isSetting} setIsOpen={setIsSetting}>
      <form
        onSubmit={(e) => {
          startGame(e, generateRandomNumber());
        }}
        className=" h-full flex-col flex gap-6"
      >
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
        <section>
          <div className=" text-base font-medium text-primary/80">
            Profit on Win
          </div>
          <article className="h-14 w-full bg-muted border border-gray rounded-lg flex items-center justify-between font-semibold text-base text-primary px-3 py-1.5 mt-2 gap-3">
            <input
              disabled
              value={gamble.payout}
              className=" w-full h-full bg-transparent focus:outline-none"
            />
          </article>
        </section>

        <section>
          <div className=" text-base font-medium text-primary/80">
            Multiplier
          </div>
          <article className="h-14 w-full bg-muted border border-gray rounded-lg flex items-center justify-between font-semibold text-base text-primary px-3 py-1.5 mt-2 gap-3">
            <input
              disabled
              value={gamble.multiplier && `${gamble.multiplier}x`}
              className=" w-full h-full bg-transparent focus:outline-none"
            />
          </article>
        </section>

        <button
          // disabled={gamble.outcomes.length < 1}
          className={buttonClass(
            `${
              gamble.outcomes.length < 1 && "cursor-not-allowed opacity-70"
            } bg-secondary`
          )}
        >
          Start Play
        </button>
      </form>
    </SettingModal>
  );
}
