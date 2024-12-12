import React from "react";

export const Buttons = {
  primary: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className="h-10 w-full bg-primary flex items-center justify-center rounded-md font-semibold text-base text-dark"
    >
      {props.children}
    </button>
  ),
};
