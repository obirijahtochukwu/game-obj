import React from "react";
import { useClick } from "../../../../lib/hooks/useclick";
import { Icons } from "../../../ui/icons";

export default function Select({
  title,
  label,
  data,
  handleClick,
}: {
  title: string;
  label: string;
  data: string[] | number[];
  handleClick: (name: string) => void;
}) {
  const { isOpen, setIsOpen, targetRef } = useClick();
  return (
    <section>
      <div className=" text-base font-medium text-primary/80">{title}</div>
      <article
        onClick={() => setIsOpen(!isOpen)}
        ref={targetRef}
        className="h-14 w-full bg-muted border-gray border rounded-lg flex items-center justify-between font-semibold text-base text-primary px-3 mt-2 cursor-pointer relative capitalize"
      >
        {label || "Select"}
        <Icons.arrow
          color="#ffffff"
          className=" rotate-90 w-4 h-4 group-hover:-rotate-90 duration-300"
        />
        <section
          className={`${
            isOpen
              ? "visible opacity-100 scale-100"
              : "scale-0 origin-top-right opacity-0 invisible "
          } absolute top-full left-0 mt-3 w-full z-10 bg-advance border-gray border rounded-xl py-2 cursor-auto shadow-2xl  duration-200`}
        >
          <div className="overflow-y-auto max-h-60 custom-scrollbar">
            {data?.map((name, idx) => (
              <div
                key={idx}
                onClick={() => handleClick(name)}
                className=" text-lg font-normal p-3 pb-1.5 hover:bg-dark/50 capitalize cursor-pointer"
              >
                {name}
              </div>
            ))}
          </div>
        </section>
      </article>
    </section>
  );
}
