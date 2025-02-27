import React from "react";
import Header from "./ui/header";
import GettingStarted from "./ui/getting-started";
import ProjectStructure from "./ui/project-structure";
import RunningApplication from "./ui/running-application";
import Deployment from "./ui/deployment";
import Contact from "./ui/contact";

export default function Documentation() {
  return (
    <div className="h-full bg-primary p-10 font-advance font-medium">
      <div className="mx-auto max-w-3xl">
        <Header />
        <GettingStarted />
        <ProjectStructure />
        <RunningApplication />
        <Deployment />
        <Contact />
      </div>
    </div>
  );
}
