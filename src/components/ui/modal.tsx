import React, { useEffect } from "react";
import { useClick } from "../../lib/hooks/useclick";
import { Icons } from "./icons";
import { backgroundImage } from "../../lib/utils";

export default function Modal({
  isOpen,
  setIsOpen,
  side,
  classname,
  close,
  isForm,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  side?: boolean;
  classname?: string;
  close?: boolean;
  isForm?: boolean;
  children: JSX.Element;
}) {
  const { targetRef } = useClick.manual({
    isOpen,
    setIsOpen,
    isForm,
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
        } fixed left-0 top-0 z-50 h-full w-full bg-background/10 backdrop-blur-sm duration-150`}
      ></section>

      <main
        ref={targetRef}
        style={{ top: `${(window?.innerHeight - targetRef?.current?.clientHeight) / 2}px` }}
        className={`${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} ${classname} ${
          side
            ? "right-0 top-0 h-full w-full max-w-md overflow-y-auto rounded-r-none rounded-br-none"
            : "left-1/2 h-max w-max max-w-md -translate-x-1/2"
        } !fixed z-50 origin-top-right rounded-lg bg-advance p-5 shadow-md duration-500`}
      >
        {close && (
          <div
            onClick={() => setIsOpen(false)}
            className="absolute right-1 top-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-background p-1"
          >
            <Icons.close className="h-3 w-3" />
          </div>
        )}
        {children}
      </main>
    </>
  );
}
