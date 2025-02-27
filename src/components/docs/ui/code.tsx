import React from "react";

export default function Code({ children }: { children: JSX.Element }) {
  return (
    <div className="mt-1 overflow-x-hidden rounded-md bg-shinnyBlue text-sm text-primary">
      <div className="flex h-7 items-center gap-1 bg-image px-3">
        <div className="h-3 w-3 rounded-full bg-error"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-success"></div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
