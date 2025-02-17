import React, { Dispatch, FormEvent, useState } from "react";
import Modal from "./modal";
import axios from "axios";
import { getStore } from "../../lib/utils/store";
import { backend_api } from "../../lib/constants";
import { useGlobalContext } from "../../lib/global-context";
import { toast } from "react-toastify";
import { FormInput, Input } from "./input";
import { useInputNum } from "../../lib/hooks/useInputNum";
import { useDiasbleMouse } from "../../lib/hooks/useDisableMouse";

export default function GiftCoin({
  _id,
  isGift,
  setIsGift,
  name,
}: {
  _id: string;
  isGift: boolean;
  setIsGift: Dispatch<boolean>;
  name: string;
}) {
  const { isMouseDisable, disableMouse, enableMouse } = useDiasbleMouse();
  const [amount, setAmount] = useState(null);
  const { admin, setAdmin } = useGlobalContext();
  const { handleInputChange } = useInputNum(setAmount);
  // console.log(admin.players.filter((j) => j.totalPlays > 0));

  const updateUI = (amount: number) => {
    const players = [...admin.players];
    const player = players.find((e) => e._id == _id);
    player.balance += amount;
    setAdmin({ ...admin, players });
  };

  const giftToken = (e: FormEvent) => {
    e.preventDefault();
    disableMouse();

    axios
      .put(backend_api + "/gift-token", { _id, amount: +amount })
      .then((res) => {
        updateUI(res.data.amount);
        console.log(res.data);
        toast.success("Gift coins sent successfully!");
        setAmount(0);
        setIsGift(false);
        enableMouse();
      })
      .catch((err) => {
        enableMouse();
        console.log(err);
      });
  };

  return (
    <Modal isOpen={isGift} setIsOpen={setIsGift} classname="!p-4 ge">
      <form onSubmit={giftToken} className="w-96 font-advance text-primary">
        <div className="mb-3 text-lg font-semibold">Give free coins to "{name}"</div>
        <FormInput.number required value={amount} onChange={handleInputChange} placeholder="Amount" />
        <div className="mt-12 flex justify-end gap-3">
          <button type="button" onClick={() => setIsGift(false)} className="rounded-md px-5 py-1 text-base">
            Cancel
          </button>
          <button type="submit" className="flex h-11 items-center rounded-md bg-success px-5 py-2 text-base">
            {isMouseDisable ? (
              <div className="!ml-0 scale-50">
                <div className="spinner"></div>
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
