import React, { useState } from "react";
import { Icons } from "./icons";
import { useGlobalContext } from "../../lib/global-context";
import CoinRequest from "./coin-request";

export default function UserPopup() {
  const { user, logout } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const props = { isOpen, setIsOpen };

  return (
    <>
      <CoinRequest {...props} />
      <section className="group relative flex w-fit items-center gap-2 font-advance">
        <img src="./media/home/user.png" alt="" className="h-10 w-10 rounded-full" />
        <div className="cursor-pointer">
          <div className="text-base font-medium leading-none hover:underline">{user.info.name}</div>
          <div className="mt-0.5 text-xs font-medium text-grey">{user.info.email}</div>
        </div>
        <main className="invisible absolute right-0 top-full z-50 mt-2 flex h-0 w-max origin-top-right transform flex-col gap-3 overflow-hidden rounded-md rounded-tr-none bg-primary text-base font-semibold text-background opacity-0 duration-300 group-hover:visible group-hover:h-28 group-hover:p-2 group-hover:opacity-100">
          <div
            onClick={() => setIsOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-md p-2 duration-300 hover:bg-gradient-custom hover:text-primary"
          >
            <Icons.order color="#081028" className="w-6" /> Request token
          </div>
          <div
            onClick={logout}
            className="flex cursor-pointer items-center gap-2 rounded-md p-2 duration-300 hover:bg-gradient-custom hover:text-primary"
          >
            <Icons.wallet color="#081028" className="w-6" /> Logout
          </div>
        </main>
      </section>
    </>
  );
}
