import React from "react";
import Title from "./title";
import Subtitle from "./subtitle";
import Text from "./text";
import List from "./list";
import { Installation, tools } from "../mock-data";
import Line from "./line";
import Code from "./code";

export default function GettingStarted() {
  return (
    <div id="Prerequisites">
      <Title text="Getting Started" />
      <Subtitle text="Prerequisites" />
      <Text classname="mb-3" text="Tools and software required to run the project." />
      <List data={tools} />
      <Line id="Installation" />
      <Subtitle text="Installation" />
      <Text classname="mb-3" text="Step-by-step instructions to set up the project locally." />
      <section className="flex flex-col gap-2">
        {Installation.map(({ name, list }, idx) => (
          <div key={idx} className="text-base font-semibold">
            <span className="mr-1 text-grey">{idx + 1}.</span> {name}:
            <div className="ml-5">
              <Code>
                <div className="flex flex-col gap-1">
                  {list.map((text) => (
                    <div>{text}</div>
                  ))}
                </div>
              </Code>
            </div>
          </div>
        ))}
      </section>
      <Line id="Project Structure" />
    </div>
  );
}
