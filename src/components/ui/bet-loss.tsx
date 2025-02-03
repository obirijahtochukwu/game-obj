import React, { Dispatch, useEffect, useState } from "react";
import Modal from "./modal";
import { Buttons } from "./buttons";
import { useGlobalContext } from "../../lib/global-context";

export default function BetLoss() {
  const [isOpen, setIsOpen] = useState(false);
  const { betResult, setBetResult, setIsLogin } = useGlobalContext();

  useEffect(() => {
    if (betResult.loss) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [betResult.loss]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} classname="!p-4 text-primary !bg-image !w-96">
      <article className="">
        <div className="mb-2 text-3xl">😢</div>
        <div className="text-xl font-bold uppercase italic">YOU LOST!</div>
        <div className="mb-8 font-advance text-base">
          Bummer, you lost <b className="text-error">${betResult.amount}</b>. Try again when you're ready.
        </div>
        <Buttons.primary onClick={() => setBetResult({ ...betResult, loss: false })}>Try Again</Buttons.primary>
      </article>
    </Modal>
  );
}
