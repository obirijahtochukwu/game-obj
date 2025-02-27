import React from "react";

export default function Line({ id }: { id?: string }) {
  return <div id={id} className="mb-8 mt-5 h-px w-full bg-grey" />;
}
