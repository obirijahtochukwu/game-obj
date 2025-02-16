import React, { useState } from "react";
import { Icons } from "../../../ui/icons";
import Select from "../../../ui/select";
import { useBlackJackContext } from "../context";
import SettingModal from "../../../ui/setting-modal";
import BetAmount from "../../../ui/bet-amount";

export default function Settings() {
  const { betAmount, setBetAmount, isSetting, setIsSetting, newGame, resetGame, playerStand, gameOver, dealCardToPlayer } =
    useBlackJackContext();

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
        className="flex h-full flex-col gap-6"
      >
        <Select
          label={chain || ""}
          title="Crypto Chain"
          data={["btc", "sol", "ton", "eth"]}
          handleClick={(name) => setChain(name)}
        />
        <BetAmount value={betAmount} onChange={(e: number) => setBetAmount(e)} />
        <section>
          <div className="text-base font-medium text-primary/80">Profit on Win</div>
          <article className="mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary">
            <input disabled value={""} className="h-full w-full bg-transparent focus:outline-none" />
          </article>
        </section>

        {!newGame ? (
          <footer className="mt-auto grid grid-cols-2 gap-3">
            <button
              className={buttonClass(`${gameOver && "cursor-not-allowed"} bg-muted`)}
              onClick={dealCardToPlayer}
              disabled={gameOver}
            >
              Hit
            </button>
            <button className={buttonClass("bg-gradient-custom")} onClick={playerStand}>
              Stand
            </button>
          </footer>
        ) : (
          <div className={buttonClass("cursor-pointer bg-green-500")} onClick={resetGame}>
            Start Play
          </div>
        )}
      </form>
    </SettingModal>
  );
}
