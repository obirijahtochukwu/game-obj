import React, { useEffect, useRef, useState } from "react";
import Coin from "./coin";
import getClosestNum from "../../../../lib/getClosestNum";
import { SMSoundService } from "../../../../lib/hooks/useSoundProvider";
import { coin } from "../../../../lib/types";

export default function Circle({
  data,
  id,
  idx,
  play,
  animation,
  picks,
  setPicks,
}: {
  data: coin[];
  id: string;
  play: boolean;
  idx: number;
  animation: string;
  picks: coin[];
  setPicks: React.Dispatch<coin[]>;
}) {
  const ref = useRef<HTMLInputElement>();
  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    if (play && !isActive) {
      document.getElementById(id).style.animationName = "";
      if (picks.length < 3) {
        SMSoundService.coin();
      }
      const correct = getClosestNum(
        data.map(
          ({ coin }) =>
            document.getElementById(coin).getBoundingClientRect().top
        ),
        event.clientY
      );
      setPicks([
        ...picks,
        data.find(
          ({ coin }) =>
            document.getElementById(coin).getBoundingClientRect().top == correct
        ),
      ]);
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (picks.length == 4) {
      setIsActive(false);
    }
  }, [picks]);

  return (
    <div
      ref={ref}
      onClick={handleClick}
      style={{ animation: animation }}
      id={id}
      className="b z-10"
    >
      {data?.map(
        (coin, idx) => idx < 12 && <Coin key={idx} coin={coin} idx={idx} />
      )}
    </div>
  );
}
