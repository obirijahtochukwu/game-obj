import React, { useState } from "react";
import { Icons } from "../../ui/icons";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../lib/global-context";
import TermsOfServices from "../../ui/terms-of-services";
import CreateAd from "./../../ui/create-ad";
import Logout from "../../ui/logout";
import Walkthrough from "../../ui/walkthrough";

export default function Header() {
  const [introTip, setIntroTip] = useState(1);
  const pathname = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [IsCreateAd, setIsCreateAd] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const props = { isOpen, setIsOpen, IsCreateAd, setIsCreateAd, isLogout, setIsLogout, introTip, setIntroTip };

  return (
    <article className="flex h-fit w-full items-center gap-4 py-7 text-primary">
      <TermsOfServices {...props} />
      <CreateAd {...props} />
      <section className="flex h-10 w-4/6 max-w-96 items-center gap-2 rounded-sm border border-gray bg-advance px-3 max-sm:hidden">
        <Icons.search className="h-4 w-4" />
        <input type="search" className="h-full w-full bg-transparent focus:outline-none" placeholder="Search for..." />
      </section>
      <div className="ml-auto w-fit" title="Create Ad">
        <Walkthrough
          {...props}
          id={1}
          title="Create New Advertisement"
          content="Provide a brief and engaging description of your game. Highlight its unique features and gameplay."
          containerStyle="mt-auto"
          position="bottom"
        >
          <Icons.ad className="w-6 cursor-pointer text-primary" onClick={() => setIsCreateAd(true)} />
        </Walkthrough>
      </div>
      <div className="w-fit">
        <Walkthrough
          {...props}
          id={2}
          title="Edit Terms and Services"
          content="Here you can modify the Terms and Services agreement that governs your users' interactions with your platform. Please review all changes carefully before saving."
          containerStyle="mt-auto"
          position="bottom"
        >
          <Icons.edit_note className="w-6 cursor-pointer" onClick={() => setIsOpen(true)} />
        </Walkthrough>
      </div>
    </article>
  );
}
