import React from "react";

export default function NoActivity({ classname, title }: { classname?: string; title?: string }) {
  return (
    <section className={`${classname} flex h-96 w-full items-center justify-center border-t border-gray text-xl`}>
      {title || "  No Activity Log"}
    </section>
  );
}
