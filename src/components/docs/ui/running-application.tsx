import React from "react";
import Title from "./title";
import Text from "./text";
import { running_application } from "../mock-data";
import Subtitle from "./subtitle";
import Code from "./code";
import List from "./list";
import Line from "./line";

export default function RunningApplication() {
  return (
    <div>
      <Title text="Running the Application" />
      <Text text="How to start the application in different environments." classname="mb-2" />
      <section className="flex flex-col gap-5">
        {running_application.map(({ label, code, list }, idx) => (
          <div className="flex flex-col">
            <Subtitle classname=" font-semibold" text={label} />
            <Code>
              <>
                {code.map((text) => (
                  <div className="mt-1">{text}</div>
                ))}
              </>
            </Code>
            <List data={[list]} classname="mt-2" />
          </div>
        ))}
      </section>
      <Line id="Deployment" />
    </div>
  );
}
