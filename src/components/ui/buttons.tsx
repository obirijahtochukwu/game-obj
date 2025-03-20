import React from "react";
import { Icons } from "./icons";

export const Buttons = {
  primary: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      classname?: string;
      submit?: boolean;
      isLoading?: boolean;
    },
  ) => (
    <button
      {...props}
      className={`group relative z-1 flex h-9 w-full items-center justify-center overflow-hidden rounded-md bg-gradient-custom text-sm font-medium text-primary duration-300 hover:shadow-lg sm:h-10 sm:text-base sm:font-semibold ${props.disabled ? "pointer-events-none opacity-70" : ""} ${props.classname}`}
    >
      {props.isLoading ? (
        <div className="!ml-0 scale-50">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {props?.submit && <Icons.send className="h-4 w-0 duration-300 group-hover:w-6" />} {props.children}
          {props?.submit || <div className="absolute top-0 -z-1 h-0 w-full bg-sm duration-300 group-hover:h-full" />}
        </>
      )}
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
  error: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      classname?: string;
    },
  ) => (
    <button
      {...props}
      className={
        "flex h-10 w-full items-center justify-center rounded-md bg-gray/30 font-advance text-base font-semibold text-primary " +
        props.classname
      }
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
  play_game: (
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      classname?: string;
    },
  ) => {
    return (
      <button
        {...props}
        className={`${props?.classname} flex min-h-12 w-full items-center justify-center rounded-md bg-gradient-custom text-xl font-semibold text-primary`}
      >
        {props.children}
      </button>
    );
  },
  google: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      type="button"
      className="flex h-10 items-center justify-center gap-3 rounded-md bg-muted/10 px-3 font-advance text-base shadow-md"
    >
      <Icons.google /> Continue with google
    </button>
  ),
};
