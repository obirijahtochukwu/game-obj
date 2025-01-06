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
  secondary: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      classname?: string;
    }
  ) => (
    <button
      {...props}
      className={`${props?.classname} w-full flex items-center justify-center min-h-12 rounded-lg bg-secondary text-primary font-semibold text-xl disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {props.children}
    </button>
  ),
};
