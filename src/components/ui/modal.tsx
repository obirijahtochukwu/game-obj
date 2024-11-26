import React from "react";
import { useClick } from "../../lib/hooks/useclick";

export default function Modal({
  isBet,
  setIsBet,
  children,
}: {
  isBet: boolean;
  setIsBet: React.Dispatch<boolean>;
  children: JSX.Element;
}) {
  const { targetRef } = useClick.manual({
    isOpen: isBet,
    setIsOpen: setIsBet,
  });

  return (
    <>
      <section
        className={`${
          isBet ? " opacity-100 visible" : " opacity-0 invisible"
        } duration-150 bg-black/10 backdrop-blur-sm fixed top-0 left-0 w-full h-full z-50`}
      ></section>
      <main
        ref={targetRef}
        className={`${
          isBet ? " scale-100 opacity-100" : " scale-0 opacity-0"
        } duration-500 origin-top-right fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 h-max w-max max-w-md bg-advance rounded-lg p-5 shadow-sm`}
      >
        {children}
      </main>
    </>
  );
}
