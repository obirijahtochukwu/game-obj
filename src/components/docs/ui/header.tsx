import React from "react";
import Line from "./line";
import Title from "./title";
import { backend_table_of_contents, table_of_contents } from "../mock-data";

export default function Header() {
  return (
    <article>
      <div className="text-3xl font-bold">Webnet Backend Documentation</div>
      <div className="mt-5 border-l border-grey pl-5 text-base">
        This Express.js backend API powers a React.js gaming and betting application, providing essential services such as
        real-time odds updates, secure transaction processing, user authentication, and game data delivery. Built for performance
        and reliability, it ensures a fast and engaging user experience
      </div>
      <Line />
      <Title text="Table of Contents" />
      <section className="flex flex-col gap-2">
        {backend_table_of_contents.map(({ label, list }, idx) => (
          <div className="w-fit text-base font-semibold text-shinnyBlue">
            <a href={`/backend/#${label}`}>
              <span className="mr-3 text-grey">{idx + 1}.</span> {label}
            </a>
            <div className="mt-2 flex flex-col gap-1">
              {list?.map((name) => (
                <a href={`/backend/#${name}`} key={name} className="flex items-center gap-2 pl-9 text-sm font-normal">
                  <div className="h-1 w-1 rounded-full border border-shinnyBlue" /> {name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
      <Line id="Getting Started" />
    </article>
  );
}
