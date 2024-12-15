import React from "react";
import { coin } from "../../../../lib/types";

export default function Coin({ coin, idx }: { coin: coin; idx: number }) {
  return (
    <div
      id={coin.coin}
      style={{
        transform: `rotate(${(360 / 12) * idx}deg)`,
      }}
      className="i cursor-pointer"
    >
      {coin.coin}
    </div>
  );
}
