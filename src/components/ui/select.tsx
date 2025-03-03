import React from "react";
import { Icons } from "./icons";
import { useClick } from "../../lib/hooks/useclick";

export default function Select({
  title,
  bottom,
  label,
  data,
  odd,
  handleClick,
}: {
  bottom?: boolean;
  title: string;
  label: string;
  odd?: boolean;
  data: string[] | number[] | any;
  handleClick: (name: string) => void;
}) {
  const { isOpen, setIsOpen, targetRef } = useClick.auto();
  return (
    <section>
      <div className="text-base font-medium text-primary">{title}</div>
      <article
        onClick={() => setIsOpen(!isOpen)}
        ref={targetRef}
        className="relative mt-2 flex h-14 w-full cursor-pointer items-center justify-between rounded-lg border border-gray bg-muted px-3 text-base font-semibold capitalize text-primary"
      >
        {label || "Select"}
        <Icons.arrow color="#ffffff" className="h-4 w-4 rotate-90 duration-300 group-hover:-rotate-90" />
        <section
          className={`${isOpen ? "visible scale-100 opacity-100" : "invisible scale-0 opacity-0"} ${
            bottom ? "bottom-full mb-1 origin-bottom-right" : "top-full mt-1 origin-top-right"
          } absolute left-0 z-50 w-full cursor-auto rounded-md border border-gray bg-advance py-2 shadow-md duration-200`}
        >
          <div className="custom-scrollbar max-h-60 overflow-y-auto">
            {data?.map((label: any, idx: number) => {
              const { name, value } = label;
              return (
                <div
                  key={idx}
                  onClick={() => handleClick(label)}
                  className="flex cursor-pointer items-center justify-between p-3 pb-1.5 text-base font-normal capitalize hover:bg-dark/50"
                >
                  {odd ? (
                    <>
                      {name} <div className="text-sm text-grey">{value}</div>
                    </>
                  ) : (
                    <>{label}</>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </article>
    </section>
  );
}
