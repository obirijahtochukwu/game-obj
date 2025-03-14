import React, { useState } from "react";
import { useFormattedDate } from "../../../../../lib/hooks/useFormattedDate";
import { Icons } from "../../../../ui/icons";
import DeleteUI from "../../../../ui/delete-ui";
import { useDiasbleMouse } from "../../../../../lib/hooks/useDisableMouse";
import axios from "axios";
import { backend_api } from "../../../../../lib/constants";
import { toast } from "react-toastify";

export default function Advertisement({
  idx,
  _id,
  link,
  title,
  image,
  description,
  createdAt,
  isMouseDisable,
  disableMouse,
  enableMouse,
}) {
  const { formattedDate } = useFormattedDate();
  const [isOpen, setIsOpen] = useState(false);

  const deleteAd = () => {
    disableMouse();
    axios
      .delete(backend_api + "/delete-ad/" + _id)
      .then((res) => {
        console.log(res.data);
        toast.success("Delete Successful🎉");
        // updateUI(_id);
        setIsOpen(false);
        enableMouse();
      })
      .catch((err) => {
        enableMouse();
        console.log(err);
      });
  };

  const props = {
    isOpen,
    setIsOpen,
    title: "Are you sure you want to delete Ad",
    description: "Deleting advertisement is permanent and your account will automatically be deleted.",
    isLoading: isMouseDisable,
    onClick: deleteAd,
  };
  return (
    <>
      <DeleteUI {...props} />
      <div className="flex min-h-12 w-fit min-w-full justify-between gap-14 py-3 pr-7 font-advance text-sm font-medium text-white/80 even:bg-dark">
        <div
          className={`sticky left-0 top-0 flex min-h-full w-fit justify-between gap-14 rounded-lg bg-advance pl-6 pr-5 ${
            idx % 2 == 0 && "!bg-dark"
          }`}
        >
          <div className="w-10">
            <img src={image} alt="" className="h-8 w-8 rounded-md" />
          </div>
          <div className="w-32">{title}</div>
        </div>
        <div className="w-40">{description}</div>
        <div className="w-24">{formattedDate(createdAt)}</div>
        <div className="w-32">{link || "--------"}</div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-8 w-20 items-center justify-center gap-4 rounded-sm bg-danger text-sm tracking-wide text-primary"
        >
          Delete
          {/* <Icons.delete className="cursor-pointer text-danger" onClick={() => setIsOpen(true)} /> */}
        </button>
      </div>
    </>
  );
}
