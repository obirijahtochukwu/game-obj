import React from "react";
import Line from "../../ui/line";
import Title from "../../ui/title";
import { table_of_contents } from "../../mock-data";

export default function Header() {
  return (
    <article>
      <div className="text-3xl font-bold">Webnet Frontend Documentation</div>
      <div className="mt-5 border-l border-grey pl-5 text-base">
        This React.js application, built with TypeScript, aims to deliver a seamless and engaging gaming and betting experience.
        By leveraging context Api and tailwindcss, the platform provides users with a variety of games, real-time odds updates,
        secure betting options in a fast, intuitive, and reliable environment.
      </div>
      <Line />
      <Title text="Table of Contents" />
      <section className="flex flex-col gap-2">
        {table_of_contents.map(({ label, list }, idx) => (
          <div className="w-fit text-base font-semibold text-shinnyBlue">
            <a href={`/docs/#${label}`}>
              <span className="mr-3 text-grey">{idx + 1}.</span> {label}
            </a>
            <div className="mt-2 flex flex-col gap-1">
              {list?.map((name) => (
                <a href={`/docs/#${name}`} key={name} className="flex items-center gap-2 pl-9 text-sm font-normal">
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
