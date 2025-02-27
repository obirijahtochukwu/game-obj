import React from "react";
import Title from "../../ui/title";
import Text from "../../ui/text";
import { backend_running_application, running_application } from "../../mock-data";
import Subtitle from "../../ui/subtitle";
import Code from "../../ui/code";
import List from "../../ui/list";
import Line from "../../ui/line";

export default function RunningApplication() {
  return (
    <div>
      <Title text="Running the Application" />
      <Text text="How to start the application in different environments." classname="mb-2" />
      <section className="flex flex-col gap-5">
        {backend_running_application.map(({ label, code, list }, idx) => (
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
