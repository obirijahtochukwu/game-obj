import React from "react";
import Hand from "./hand";
import { useBlackJackContext } from "../context";

export default function Hands() {
  const { playerHand, dealerHand, playerValue, dealerValue, score } =
    useBlackJackContext();

  return (
    <div className="flex justify-around">
      <Hand
        cards={playerHand}
        title="Player's Hand"
        handValue={playerValue}
        score={score.player}
      />
      <Hand
        cards={dealerHand}
        title="Dealer's Hand"
        handValue={dealerValue}
        score={score.dealer}
      />
    </div>
  );
}
