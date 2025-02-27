import React from "react";
import Header from "./ui/header";
import GettingStarted from "./ui/getting-started";
import ProjectStructure from "./ui/project-structure";
import EnvironmentVariables from "./ui/environment-variables";
import ApiEndpoints from "./ui/api-endpoints";
import RunningApplication from "./ui/running-server";
import Deployment from "./ui/deployment";
import Contact from "../ui/contact";

export default function BackendDocumentation() {
  return (
    <article className="h-full bg-primary p-10 font-advance font-medium">
      <div className="mx-auto max-w-3xl">
        <Header />
        <GettingStarted />
        <ProjectStructure />
        <EnvironmentVariables />
        <ApiEndpoints />
        <RunningApplication />
        <Deployment />
        <Contact />
      </div>
    </article>
  );
}
