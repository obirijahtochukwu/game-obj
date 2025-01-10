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
      className={`${props?.classname} ${
        props?.classname?.includes("bg") || "bg-gradient-custom"
      } w-full flex items-center justify-center min-h-12 rounded-lg text-primary font-semibold text-xl disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {props.children}
    </button>
  ),
  play_now: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      classname?: string;
    }
  ) => (
    <button
      {...props}
      className={`${props?.classname} h-12 w-32 flex items-center justify-center rounded-lg text-primary bg-gradient-custom text-lg font-semibold`}
    >
      {props.children}
    </button>
  ),
};
