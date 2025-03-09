import React from "react";

export default function Tag({ children }: { children: JSX.Element }) {
  return (
    <div className="flex h-fit min-w-12 items-center justify-between gap-4 rounded-md bg-image px-3 py-1.5 font-advance text-sm font-medium">
      {children}
    </div>
  );
}
