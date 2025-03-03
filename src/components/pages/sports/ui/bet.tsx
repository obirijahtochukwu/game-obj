import React, { useState } from "react";
import Modal from "../../../ui/modal";
import Select from "../../../ui/select";
import { Input } from "../../../ui/input";
import Balance from "../../../ui/balance";
import BetAmount from "../../../ui/bet-amount";
import { Buttons } from "../../../ui/buttons";

// Define the props type for the Bet component
interface BetProps {
  bet: {
    title: string;
    teams: {
      home: {
        name: string;
        odd: number | undefined;
      };
      draw: {
        name: "draw";
        odd: number | undefined;
      };
      away: {
        name: string;
        odd: number | undefined;
      };
    };
  };
  isBetOpen: boolean;
  setIsBetOpen: (isOpen: boolean) => void; // Function to close the modal
}

const Bet: React.FC<BetProps> = ({ bet, isBetOpen, setIsBetOpen }) => {
  // State for the selected team to bet on (e.g., "Home", "Away", "Draw")
  const [selectedTeam, setSelectedTeam] = useState<{ name?: string; value?: string }>({});

  // State for the bet amount
  const [betAmount, setBetAmount] = useState<number>(0);

  // Handle bet submission
  const handleBet = () => {
    // Validate inputs before proceeding
    if (!selectedTeam || betAmount <= 0) {
      alert("Please select a team and enter a valid bet amount.");
      return;
    }

    // Placeholder for bet submission logic
    console.log("Selected Team:", selectedTeam);
    console.log("Bet Amount:", betAmount);

    // Close the modal after placing the bet
    setIsBetOpen(false);
  };
  console.log(bet);
  console.log(selectedTeam);

  return (
    <Modal isOpen={isBetOpen} setIsOpen={setIsBetOpen}>
      <section className="flex w-80 flex-col gap-4">
        {/* Bet title */}
        <div className="text-lg font-semibold text-primary/70">{bet.title}</div>

        {/* Display user balance */}
        <Balance />

        {/* Team selection */}
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

        {/* Bet amount input */}
        <BetAmount disableIntro value={betAmount} onChange={(e: number) => setBetAmount(e)} />

        {/* Bet button */}
        <footer className="mt-4 grid grid-cols-2 gap-3">
          <Buttons.error onClick={() => setIsBetOpen(false)}>Cancel</Buttons.error>
          <Buttons.primary submit>Submit</Buttons.primary>
        </footer>
      </section>
    </Modal>
  );
};

export default Bet;
