import React, { useEffect, useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useSlotContext } from "../context";
import { FormInput } from "../../../ui/input";
import SettingModal from "../../../ui/setting-modal";

export default function Settings() {
  const {
    startGame,
    setting,
    setSetting,
    risklevel,
    setRiskLevel,
    gamble,
    setGamble,
  } = useSlotContext();

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
      <article onSubmit={startGame} className=" h-full flex-col flex gap-6">
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
              required
              value={gamble.betAmount}
              onChange={(e) =>
                setGamble({ ...gamble, betAmount: +e.target.value })
              }
              placeholder="0.0000005"
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
          label={level || ""}
          title="Risk"
          data={["Basic", "Medium", "Hard"]}
          handleClick={(name) => setLevel(name)}
        />{" "}
        <div className="w-full">
          <FormInput.setting disabled value={gamble.payout} />
          <button
            type="submit"
            className=" w-full mt-4 flex items-center justify-center bg-gradient-custom h-12 rounded-xl text-primary font-semibold text-xl"
          >
            Bet
          </button>
        </div>
      </article>
    </SettingModal>
  );
}
