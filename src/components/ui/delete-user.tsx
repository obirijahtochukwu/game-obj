import React, { Dispatch, FormEvent, useState } from "react";
import Modal from "./modal";
import axios from "axios";
import { getStore } from "../../lib/utils/store";
import { backend_api } from "../../lib/constants";
import { useGlobalContext } from "../../lib/global-context";
import { toast } from "react-toastify";
import { useDiasbleMouse } from "../../lib/hooks/useDisableMouse";

export default function DeleteUser({ _id, isOpen, setIsOpen }: { _id: string; isOpen: boolean; setIsOpen: Dispatch<boolean> }) {
  const { isMouseDisable, disableMouse, enableMouse } = useDiasbleMouse();

  const { setAdmin, admin } = useGlobalContext();

  const updateUI = (id: string) => {
    const players = admin.players.filter((e) => e._id != _id);
    setAdmin({ ...admin, players });
  };

  const delete_user = (e: FormEvent) => {
    e.preventDefault();
    disableMouse();
    axios
      .delete(backend_api + "/delete-user/" + _id)
      .then((res) => {
        console.log(res.data);
        toast.success("Delete Successful🎉");
        updateUI(_id);
        setIsOpen(false);
        enableMouse();
      })
      .catch((err) => enableMouse());
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} classname="!p-4">
      <article className="w-full max-w-96 font-advance text-primary">
        <div className="font-secondary text-xl font-semibold">Are you sure you want to delete user?</div>
        <div className="mt-1 text-sm text-grey"> Deleting user is permanent and your account will automatically be deleted.</div>

        <div className="mt-12 flex justify-end gap-3">
          <button onClick={() => setIsOpen(false)} className="rounded-md bg-dark px-5 py-1 text-lg">
            Cancel
          </button>
          <button type="button" onClick={delete_user} className="flex h-10 items-center rounded-md bg-danger px-5 text-base">
            {isMouseDisable ? (
              <div className="scale-50">
                <div className="spinner"></div>
              </div>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </article>
    </Modal>
  );
}
