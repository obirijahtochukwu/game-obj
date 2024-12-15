import React, { useEffect, useRef, useState } from "react";
import Coin from "./coin";
import getClosestNum from "../../../../lib/getClosestNum";
import { SMSoundService } from "../../../../lib/hooks/useSoundProvider";
import { coin } from "../../../../lib/types";
import { useSlotContext } from "../context";

export default function Circle({
  coinData,
  id,
  animation,
}: {
  coinData: coin[];
  id: string;
  animation: string;
}) {
  const { selectedCoins, setSelectedCoins, isGameActive } = useSlotContext();

  const ref = useRef<HTMLInputElement>();
  const [isSelectionInProgress, setIsSelectionInProgress] = useState(false);

  const selectCoin = (event) => {
    if (isGameActive && !isSelectionInProgress) {
      document.getElementById(id).style.animationName = "";
      if (selectedCoins.length < 3) {
        SMSoundService.coin(); // Play sound effect
      }
      const selectedCoin = getClosestNum(coinData, event.clientY); // Find closest coin
      setSelectedCoins([...selectedCoins, selectedCoin]);
      setIsSelectionInProgress(true);
    }
  };

  useEffect(() => {
    if (selectedCoins.length == 4) {
      setIsSelectionInProgress(false);
    }
  }, [selectedCoins]);

  return (
    <div
      ref={ref}
      onClick={selectCoin}
      style={{ animation: animation }}
      id={id}
      className="b z-10"
    >
      {coinData?.map(
        (coin, idx) => idx < 12 && <Coin key={idx} coin={coin} idx={idx} />
      )}
    </div>
  );
}
