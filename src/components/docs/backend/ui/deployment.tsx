import React from "react";
import Title from "../../ui/title";
import Subtitle from "../../ui/subtitle";
import Text from "../../ui/text";
import { backend_deployment, deployment } from "../../mock-data";
import Code from "../../ui/code";
import Line from "../../ui/line";

export default function Deployment() {
  return (
    <div>
      <Title text="Deployment" />
      <Text tip text="Instructions for deploying the project to a hosting platform (e.g., Vercel, Netlify, GitHub Pages)." />
      <section className="mt-5 flex flex-col gap-5">
        {backend_deployment.map(({ label, list }) => (
          <div className="">
            <Subtitle text={label} />
            <section className="flex flex-col gap-5">
              {list?.map(({ title, code }, idx) => (
                <div className="font-semibold">
                  <div className="flex gap-2">
                    <span className="text-grey">{idx + 1}.</span> <Text text={title} />
                  </div>
                  {code && (
                    <div className="pl-5">
                      <Code>
                        <>{code?.map((text) => <div className="mt-1">{text}</div>)}</>
                      </Code>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </div>
        ))}
      </section>
      <Line id="Contact" />
    </div>
  );
}
