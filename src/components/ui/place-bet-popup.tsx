import React, { useEffect } from "react";
import { useGlobalContext } from "../../lib/global-context";
import { randomData } from "../../lib/utils";
import { Icons } from "./icons";

export default function PlaceBetPopup() {
  const { isBetPlaced, setIsBetPlaced } = useGlobalContext();
  useEffect(() => {
    if (isBetPlaced.state) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isBetPlaced.state]);

  return (
    <div
      className={`${isBetPlaced.state ? "translate-x-0 opacity-100" : "translate-x-96 opacity-0"} fixed right-5 top-10 z-50 flex h-max w-72 flex-col gap-1 rounded-md bg-gradient-custom p-3 py-2 font-advance text-primary shadow-md backdrop-blur-2xl duration-300`}
    >
      <div className="mb-2 flex items-center justify-between font-semibold">
        🎉 Bet Placed Successfully!{" "}
        <Icons.close className="w-3 cursor-pointer" onClick={() => setIsBetPlaced({ ...isBetPlaced, state: false })} />
      </div>
      <div className="text-sm">{isBetPlaced.title}</div>
      {isBetPlaced?.data.map(({ name, value }) => (
        <div className="flex items-center gap-2 pl-3 text-sm font-semibold">
          - <div>{name}:</div> <div className="text-primary">{value}</div>
        </div>
      ))}
      <div className="mt-2">Good luck! 🍀</div>
    </div>
  );
}
