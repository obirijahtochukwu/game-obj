import React, { useEffect } from "react";
import { useClick } from "../../lib/hooks/useclick";
import { Icons } from "./icons";

export default function SettingModal({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  children: JSX.Element;
}) {
  const { targetRef } = useClick.manual({
    isOpen,
    setIsOpen,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <section
        className={`${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } fixed left-0 top-0 z-50 h-full w-full bg-background/10 backdrop-blur-sm duration-150 lg:hidden`}
      ></section>
      <article
        ref={targetRef}
        className={`${
          isOpen ? "translate-x-0" : "max-lg:-translate-x-[700px]"
        } custom-scrollbar w-full bg-dark p-4 duration-300 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-50 max-lg:h-screen max-lg:overflow-y-auto max-lg:pt-12 sm:max-w-96 lg:rounded-3xl`}
      >
        <Icons.close onClick={() => setIsOpen(false)} className="absolute right-3 top-3 w-4 cursor-pointer lg:hidden" />
        {children}
      </article>
    </>
  );
}
