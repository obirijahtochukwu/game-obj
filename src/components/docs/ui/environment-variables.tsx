import React from "react";
import Title from "../ui/title";
import Text from "../ui/text";
import Subtitle from "../ui/subtitle";
import { backend_environment_variables, frontend_environment_variables } from "../mock-data";
import Line from "../ui/line";

export default function EnvironmentVariables() {
  return (
    <div>
      <Title text="Environment Variables" />
      <Text text="All the environment variables required for this project." />
      <main className="custom-scrollbar w-full overflow-x-auto">
        <div className="w-max">
          <div className="mt-4 grid grid-cols-3 gap-8 border-y-[1px] border-grey py-3">
            {["Variable Name", "Description", "Example Value"].map((name) => (
              <Subtitle text={name} classname=" " />
            ))}
          </div>
          {frontend_environment_variables.map(({ name, desc, value }) => (
            <div className="grid grid-cols-3 gap-8 border-b border-grey py-3">
              <Text text={name} classname="text-sm bg-black/10 w-fit rounded-md px-2 py-1" />
              <Text text={desc} classname="text-sm " />
              <Text text={value} classname="text-sm  bg-black/10 w-fit rounded-md px-2 py-1" />
            </div>
          ))}
        </div>
      </main>
      <Line id="Running the Application" />
    </div>
  );
}
