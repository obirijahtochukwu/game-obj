import React from "react";
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

  return (
    <>
      <section
        className={`${
          isOpen ? " opacity-100 visible" : " opacity-0 invisible"
        } duration-150 bg-background/10 backdrop-blur-sm fixed top-0 left-0 w-full h-full z-50 lg:hidden`}
      ></section>
      <article
        ref={targetRef}
        className={`${
          isOpen ? "translate-x-0" : " max-lg:-translate-x-[700px]"
        } bg-dark p-4 w-full sm:max-w-96 lg:rounded-3xl | max-lg:fixed max-lg:h-full max-lg:top-0 max-lg:left-0 max-lg:z-50 duration-300 max-lg:pt-12 max-lg:overflow-y-auto custom-scrollbar`}
      >
        {" "}
        <Icons.close
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-3 right-3 w-4 cursor-pointer"
        />
        {children}
      </article>
    </>
  );
}
