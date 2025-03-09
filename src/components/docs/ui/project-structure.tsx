import React from "react";
import Title from "./title";
import Subtitle from "./subtitle";
import Text from "./text";
import Code from "./code";
import { project_structure } from "../mock-data";
import Line from "./line";

export default function ProjectStructure() {
  const lastIndex = (files: any, id: number) => {
    const index = files.length - 1;
    return index == id ? true : false;
  };

  return (
    <div>
      <Title text="Project Structure" />
      <Text text="Explain the structure of your project. For example:" classname="mb-2" />
      <Code>
        <>
          <div className="text-base"> project-root/</div>
          {project_structure.map(({ folder, desc, files }, idx) => (
            <div className="mt-1">
              <div className="relative grid max-w-md grid-cols-2 gap-10 pl-7 text-base">
                <div
                  className={`${idx != 7 ? "h-full" : "h-1/2 border-b-2"} absolute left-0 top-0 mt-0.5 flex w-6 items-center border-l-2 border-grey`}
                >
                  {idx != 7 && <div className="h-0.5 w-7 bg-grey" />}
                </div>
                {folder}
                {folder.includes(".") || "/"}
                <div className="whitespace-nowrap">
                  <span className="text-grey">#</span>
                  {desc}
                </div>
              </div>
              <section className="pl-7">
                {files?.map(({ file, desc }, idx) => (
                  <div className="relative mt-3 h-fit">
                    <div className="relative grid max-w-md grid-cols-2 gap-10 pl-7 text-base">
                      <div
                        className={`${lastIndex(files, idx) ? "h-1/2 border-b-2" : "h-full"} absolute left-0 top-0 mt-0.5 flex w-6 items-center border-l-2 border-grey`}
                      >
                        {lastIndex(files, idx) ? null : <div className="h-0.5 w-7 bg-grey" />}
                      </div>
                      {file}
                      {file.includes(".") || "/"}
                      <div className="whitespace-nowrap">
                        <span className="text-grey">#</span>
                        {desc}
                      </div>
                    </div>
                    <div className="absolute -left-7 top-0 h-full w-0.5 bg-grey"></div>
                  </div>
                ))}
              </section>
            </div>
          ))}
        </>
      </Code>
      <Line id="Environment Variables" />
    </div>
  );
}
