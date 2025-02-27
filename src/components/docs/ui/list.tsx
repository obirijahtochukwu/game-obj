import React from "react";

export default function List({ data, classname }: { data: string[]; classname?: string }) {
  return (
    <section className={`ml-3 flex flex-col gap-2 ${classname}`}>
      {data.map((name) => (
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="h-1 w-1 rounded-full bg-gray" /> {name}
        </div>
      ))}
    </section>
  );
}
