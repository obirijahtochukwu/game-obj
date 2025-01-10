import React, { useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useBlackJackContext } from "../context";
import SettingModal from "../../../ui/setting-modal";

export default function Settings() {
  const {
    betAmount,
    setBetAmount,
    isSetting,
    setIsSetting,
    newGame,
    resetGame,
    playerStand,
    gameOver,
    dealCardToPlayer,
  } = useBlackJackContext();

  const [chain, setChain] = useState("");

  const buttonClass = (custom: string) =>
    `${custom} w-full mt-auto flex items-center justify-center min-h-12 rounded-lg text-primary font-semibold text-xl`;

  return (
    <SettingModal isOpen={isSetting} setIsOpen={setIsSetting}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSetting(false);
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
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value))}
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
              value={""}
              className=" w-full h-full bg-transparent focus:outline-none"
            />
          </article>
        </section>

        {!newGame ? (
          <footer className=" mt-auto grid grid-cols-2 gap-3">
            <button
              className={buttonClass(
                `${gameOver && "cursor-not-allowed"} bg-muted`
              )}
              onClick={dealCardToPlayer}
              disabled={gameOver}
            >
              Hit
            </button>
            <button
              className={buttonClass(" bg-gradient-custom")}
              onClick={playerStand}
            >
              Stand
            </button>
          </footer>
        ) : (
          <div
            className={buttonClass(" bg-green-500 cursor-pointer")}
            onClick={resetGame}
          >
            Start Play
          </div>
        )}
      </form>
    </SettingModal>
  );
}
