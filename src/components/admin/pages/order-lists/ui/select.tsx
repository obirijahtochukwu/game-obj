import React from "react";
import { Icons } from "../../../../ui/icons";

export default function Select({
  title,
  classname,
  disabled,
}: {
  title: string;
  classname?: string;
  disabled?: boolean;
}) {
  return (
    <div className={classname}>
      <button
        disabled={disabled}
        className=" flex items-center h-full gap-3 whitespace-nowrap px-0.5"
      >
        {title}{" "}
        {disabled || <Icons.arrow color="#ffffff" className="h-3 rotate-90" />}
      </button>
    </div>
  );
}
