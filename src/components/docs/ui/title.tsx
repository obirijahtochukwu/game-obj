import React from "react";

export default function Title({ text }: { text: string }) {
  return <div className="mb-4 text-2xl font-bold">{text}</div>;
}
