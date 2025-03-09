import React, { Dispatch, FormEvent, useState } from "react";
import Modal from "./modal";
import axios from "axios";
import { getStore } from "../../lib/utils/store";
import { backend_api } from "../../lib/constants";
import { useGlobalContext } from "../../lib/global-context";

export default function CoinApproval({
  _id,
  isOpen,
  setIsOpen,
  getOrders,
  userId,
}: {
  _id: string;
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  getOrders: () => void;
  userId: string;
}) {
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const approve_token = (e: FormEvent) => {
    e.preventDefault();
    axios
      .put(backend_api + "/approve-token", { _id: _id, userId })
      .then((res) => {
        console.log(res.data);
        getOrders();
        setIsSuccessfull(true);
      })
      .catch((err) => setIsSuccessfull(true));
  };

  return (
    <Modal close isOpen={isOpen} setIsOpen={setIsOpen} classname="!p-4">
      <article className="w-full font-advance text-primary">
        {isSuccessfull ? (
          <article className="py-5">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-dark text-[50px]">
              <div className="relative -right-1 -top-1">🎉</div>
            </div>
            <div className="text-center text-3xl">Token approved successfully</div>
          </article>
        ) : (
          <>
            <div className="font-secondary text-xl font-semibold">Confirm Coin Approval</div>
            <div className="text-base text-grey"> Please confirm you want to grant this user free coins.</div>

            <div className="mt-7 flex justify-end gap-3">
              <button onClick={() => setIsOpen(false)} className="rounded-md bg-dark px-5 py-1 text-lg">
                Cancel
              </button>
              <button
                type="button"
                onClick={approve_token}
                className="flex h-12 items-center rounded-md bg-gradient-custom px-5 text-lg"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </article>
    </Modal>
  );
}
