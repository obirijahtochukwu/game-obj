import React from "react";

export default function Text({ text, classname, tip }: { text: string; classname?: string; tip?: boolean }) {
  return <div className={`${classname} text-base ${tip && "border-l border-grey pl-5"}`}>{text}</div>;
}
