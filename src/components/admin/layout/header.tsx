import React, { useState } from "react";
import { Icons } from "../../ui/icons";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../lib/global-context";
import TermsOfServices from "../../ui/terms-of-services";
import CreateAd from "./../../ui/create-ad";

export default function Header() {
  const pathname = useLocation().pathname;
  const { logout } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [IsCreateAd, setIsCreateAd] = useState(false);

  const props = { isOpen, setIsOpen, IsCreateAd, setIsCreateAd };

  return (
    <article className="flex h-fit w-full items-center gap-4 py-7 text-primary">
      <TermsOfServices {...props} />
      <CreateAd {...props} />
      <div className="mr-14 font-advance text-xl font-bold capitalize">{pathname.split("/").pop()}</div>
      <section className="flex h-10 w-full max-w-96 items-center gap-2 rounded-sm border border-gray bg-advance px-3 max-lg:hidden">
        <Icons.search className="h-4 w-4" />{" "}
        <input type="search" className="h-full w-full bg-transparent focus:outline-none" placeholder="Search for..." />
      </section>
      <div className="ml-auto w-fit" title="Create Ad">
        <Icons.ad className="w-6 cursor-pointer text-primary" onClick={() => setIsCreateAd(true)} />
      </div>
      <div className="w-fit" title="Edit terms of service">
        <Icons.edit_note className="w-6 cursor-pointer" onClick={() => setIsOpen(true)} />
      </div>{" "}
      <div
        onClick={logout}
        className="flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-pink px-8 font-semibold text-primary shadow-sm"
      >
        Logout
      </div>
    </article>
  );
}
