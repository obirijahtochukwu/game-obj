import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { Buttons } from "./buttons";
import { useGlobalContext } from "../../lib/global-context";

export default function BetSuccess() {
  const [isOpen, setIsOpen] = useState(false);
  const { betResult, setBetResult, setIsLogin } = useGlobalContext();

  useEffect(() => {
    if (betResult.won) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [betResult.won]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} classname="!p-4 !bg-image !w-5/6 !max-w-96 text-primary">
      <article className="">
        <div className="mb-2 text-3xl">🎉</div>
        <div className="text-xl font-bold uppercase italic">It's a win!</div>
        <div className="mb-8 font-advance text-base">
          Congratulations! You're on a winning streak! You won <b className="text-success">${betResult.amount}</b>!
        </div>
        <Buttons.primary onClick={() => setBetResult({ ...betResult, won: false })}>Continue Playing</Buttons.primary>
      </article>
    </Modal>
  );
}
