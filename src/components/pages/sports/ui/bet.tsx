import React, { useState } from "react";
import Modal from "../../../ui/modal";
import Select from "../../../ui/select";
import { Input } from "../../../ui/input";

export default function Bet({ props }) {
  const [chain, setChain] = useState("");
  const [bettingCase, setBettingCase] = useState("");
  const [betAmount, setBetAmount] = useState(0);

  return (
    <Modal {...props}>
      <section className=" flex flex-col gap-4 w-80">
        <div className=" text-lg font-semibold text-primary/70">
          {props.bet.title}
        </div>
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
          <Input.number
            onChange={(e: number) => setBetAmount(e)}
            value={betAmount}
          />
        </section>
        <Select
          label={bettingCase || ""}
          title="Betting Case"
          data={["Draw", "Win", "Lose"]}
          handleClick={(name) => setBettingCase(name)}
        />
        <button
          onClick={() => props.setIsBet(false)}
          className=" w-full mt-4 flex items-center justify-center bg-secondary h-12 rounded-xl text-primary font-semibold text-xl"
        >
          Bet
        </button>
      </section>
    </Modal>
  );
}
