import React, { useEffect } from "react";
import { useClick } from "../../lib/hooks/useclick";

export default function Modal({
  isOpen,
  setIsOpen,
  side,
  classname,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  side?: boolean;
  classname?: string;
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
        } duration-150 bg-background/10 backdrop-blur-sm fixed top-0 left-0 w-full h-full z-50`}
      ></section>
      <main
        ref={targetRef}
        className={`${
          isOpen ? " scale-100 opacity-100" : " scale-0 opacity-0"
        } ${classname} ${
          side
            ? "w-full max-w-md top-0 right-0 h-full overflow-y-auto rounded-r-none rounded-br-none"
            : "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-max w-max max-w-md"
        } duration-500 origin-top-right fixed z-50 bg-advance rounded-lg p-5 shadow-sm`}
      >
        {children}
      </main>
    </>
  );
}
