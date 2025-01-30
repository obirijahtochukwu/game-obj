import React from "react";

export default function NoActivity({ disabled }: { disabled: boolean }) {
  return (
    <section className={disabled ? "flex h-96 w-full items-center justify-center border-t border-gray text-xl" : "hidden"}>
      No Activity Log
    </section>
  );
}
