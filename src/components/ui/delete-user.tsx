import React, { Dispatch, FormEvent, useState } from "react";
import Modal from "./modal";
import axios from "axios";
import { getStore } from "../../lib/utils/store";
import { backend_api } from "../../lib/constants";
import { useGlobalContext } from "../../lib/global-context";
import { toast } from "react-toastify";

export default function DeleteUser({ _id, isOpen, setIsOpen }: { _id: string; isOpen: boolean; setIsOpen: Dispatch<boolean> }) {
  const [isloading, setIsloading] = useState(false);
  const { setRefresh, setIsLogin } = useGlobalContext();

  const delete_user = (e: FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    axios
      .delete(backend_api + "/delete-user/" + _id)
      .then((res) => {
        console.log(res.data);
        toast.success("Delete Successful🎉");
        setRefresh(true);
        setIsOpen(false);
        setIsloading(false);
      })
      .catch((err) => setIsloading(false));
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} classname="!p-4">
      <article className="w-full max-w-md font-advance text-primary">
        <div className="font-secondary text-xl font-semibold">Are you sure you want to delete user?</div>
        <div className="text-sm text-grey"> Deleting user is permanent and your account will automatically be deleted.</div>

        <div className="mt-7 flex justify-end gap-3">
          <button disabled={isloading} onClick={() => setIsOpen(false)} className="rounded-md bg-dark px-5 py-1 text-lg">
            Cancel
          </button>
          <button
            disabled={isloading}
            type="button"
            onClick={delete_user}
            className="flex h-12 items-center rounded-md bg-secondary px-5 text-lg"
          >
            Confirm
          </button>
        </div>
      </article>
    </Modal>
  );
}
