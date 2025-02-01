import React from "react";

export const Buttons = {
  primary: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      classname?: string;
    },
  ) => (
    <button
      {...props}
      className={
        "flex h-10 w-full items-center justify-center rounded-md bg-gradient-custom text-base font-semibold text-primary " +
        props.classname
      }
    >
      {props.children}
    </button>
  ),
  secondary: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      classname?: string;
    },
  ) => (
    <button
      {...props}
      className={`${props?.classname} ${
        props?.classname?.includes("bg") || "bg-gradient-custom"
      } flex min-h-12 w-full items-center justify-center rounded-lg text-xl font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {props.children}
    </button>
  ),
  play_now: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      classname?: string;
    },
  ) => (
    <button
      {...props}
      className={`${props?.classname} flex h-12 w-32 items-center justify-center rounded-lg bg-gradient-custom text-lg font-semibold text-primary`}
    >
      {props.children}
    </button>
  ),
};
