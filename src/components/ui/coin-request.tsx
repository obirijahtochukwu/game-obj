import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import Modal from "./modal";
import axios from "axios";
import { getStore } from "../../lib/utils/store";
import { backend_api } from "../../lib/constants";
import { useGlobalContext } from "../../lib/global-context";
import { toast } from "react-toastify";
import { useDiasbleMouse } from "../../lib/hooks/useDisableMouse";

export default function CoinRequest({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Dispatch<boolean> }) {
  const { _id, email, name } = useGlobalContext().user.info;
  const [amount, setAmount] = useState(null);
  const { isMouseDisable, disableMouse, enableMouse } = useDiasbleMouse();

  const request_token = (e: FormEvent) => {
    e.preventDefault();
    disableMouse();
    axios
      .post(backend_api + "/claim-token", { userId: _id, amount, email, name, status: "processing" })
      .then((res) => {
        setIsOpen(false);
        setAmount(null);
        toast.success("🎉 Your order has been placed!");
        enableMouse();
      })
      .catch((err) => enableMouse());
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} classname="!p-4">
      <form onSubmit={request_token} className="w-full font-advance">
        <div className="font-secondary text-lg font-semibold sm:text-xl"> Level Up Your Game</div>
        <div className="text-sm text-grey sm:text-base"> Claim your free coins and boost your game</div>
        <div className="mt-5 font-semibold">Amout ($)</div>
        <input
          required
          autoFocus
          type="number"
          max={1000}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="h-10 w-full rounded-md border border-gray bg-grey px-2 font-poppins text-base font-medium text-dark"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => setIsOpen(false)} type="button" disabled={isMouseDisable} className="px-5 py-1 text-lg">
            Cancel
          </button>
          <button
            disabled={isMouseDisable}
            type="submit"
            className="flex h-12 items-center rounded-md bg-gradient-custom px-5 text-lg"
          >
            {isMouseDisable && (
              <div className="scale-50">
                <div className="spinner"></div>
              </div>
            )}
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
