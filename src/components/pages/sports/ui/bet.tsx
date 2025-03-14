import React, { useState } from "react";
import Modal from "../../../ui/modal";
import Select from "../../../ui/select";
import Balance from "../../../ui/balance";
import BetAmount from "../../../ui/bet-amount";
import { Buttons } from "../../../ui/buttons";

const Bet = ({ bet, isBetOpen, setIsBetOpen, placeBet, isLoading }) => {
  const [selectedTeam, setSelectedTeam] = useState<{ name?: string; value?: string }>({});
  const [betAmount, setBetAmount] = useState<number>(0);

  return (
    <Modal isOpen={isBetOpen} setIsOpen={setIsBetOpen} classname="">
      <section className="flex w-full flex-col gap-4">
        <div className="text-lg font-semibold text-primary/70">{bet.title}</div>
        <Balance />
        <section>
          <Select
            label={selectedTeam.name || "Select Team"}
            title="Team to Bet On"
            odd
            data={[
              { name: bet.teams.home.name, value: `${bet.teams.home.odd}x` },
              { name: "Draw", value: `${bet.teams.draw.odd}x` },
              { name: bet.teams.away.name, value: `${bet.teams.away.odd}x` },
            ]}
            handleClick={(e: any) => setSelectedTeam(e)}
          />
        </section>
        <BetAmount disableIntro value={betAmount} onChange={(e: number) => setBetAmount(e)} />
        <footer className="mt-4 grid grid-cols-2 gap-3">
          <Buttons.error onClick={() => setIsBetOpen(false)}>Cancel</Buttons.error>
          <Buttons.primary isLoading={isLoading} onClick={() => placeBet(betAmount, selectedTeam)}>
            Submit
          </Buttons.primary>
        </footer>
      </section>
    </Modal>
  );
};

export default Bet;
