import React from "react";
import Title from "../../ui/title";
import Subtitle from "../../ui/subtitle";
import Text from "../../ui/text";
import List from "../../ui/list";
import { backend_installation, backend_tools } from "../../mock-data";
import Line from "../../ui/line";
import Code from "../../ui/code";

export default function GettingStarted() {
  return (
    <div id="Prerequisites">
      <Title text="Getting Started" />
      <Subtitle text="Prerequisites" />
      <Text classname="mb-3" text="Tools and software required to run the project." />
      <List data={backend_tools} />
      <Line id="Installation" />
      <Subtitle text="Installation" />
      <Text classname="mb-3" text="Step-by-step instructions to set up the project locally." />
      <section className="flex flex-col gap-3">
        {backend_installation.map(({ name, list, plain }, idx) => (
          <div key={idx} className={`text-base font-semibold`}>
            <span className="mr-1 text-grey">{idx + 1}.</span> {name}:
            <div className="ml-5">
              {plain ? (
                <List data={list} classname="my-2" />
              ) : (
                <Code>
                  <div className="flex flex-col gap-1">
                    {list.map((text) => (
                      <div>{text}</div>
                    ))}
                  </div>
                </Code>
              )}
            </div>
          </div>
        ))}
      </section>
      <Line id="Project Structure" />
    </div>
  );
}
