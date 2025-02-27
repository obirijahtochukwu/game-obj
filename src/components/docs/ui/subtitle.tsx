import React from "react";

export default function Subtitle({ text, classname }: { text: string; classname?: string }) {
  return <div className={`${classname} mb-2 text-xl font-bold`}>{text}</div>;
}
