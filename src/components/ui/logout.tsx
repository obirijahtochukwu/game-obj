import React, { useState } from "react";
import Modal from "./modal";
import { Icons } from "./icons";
import { useGlobalContext } from "../../lib/global-context";

export default function Logout({
  admin,
  isLogout,
  setIsLogout,
}: {
  admin?: boolean;
  isLogout: boolean;
  setIsLogout: React.Dispatch<boolean>;
}) {
  const { logout } = useGlobalContext();
  return (
    <>
      <aside
        onClick={() => setIsLogout(true)}
        className={`flex cursor-pointer items-center gap-3 ${admin && "mt-auto h-12 rounded-lg bg-muted pl-4 text-base font-medium"}`}
      >
        <Icons.signout className="h-5 w-fit text-primary" /> Sign out
      </aside>
      <Modal isOpen={isLogout} setIsOpen={setIsLogout} classname="!bg-image text-primary font-advance text-center font-semibold">
        <article>
          <div className="text-xl">Logout Confirmation</div>
          <div className="text-base text-grey">Are you sure you want to log out? Any unsaved changes may be lost</div>
          <footer className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsLogout(false)}
              className="flex h-10 items-center justify-center rounded-md bg-gray/50 text-base"
            >
              Cancel
            </button>
            <button onClick={logout} className="flex h-10 items-center justify-center rounded-md bg-gradient-custom text-base">
              Confirm
            </button>
          </footer>
        </article>
      </Modal>
    </>
  );
}
