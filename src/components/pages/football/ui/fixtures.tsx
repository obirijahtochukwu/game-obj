import React, { useEffect, useState } from "react";
import { useFootballContext } from "../context";
import TeamDetails from "../../sports/ui/team-details";
import { toPercentage } from "../../../../lib/constants";
import Fixture from "./fixture";
import FixtureLoader from "./fixture-loader";
import NoActivity from "../../../ui/no-activity";

export default function Fixtures() {
  const { matches, isLoadng } = useFootballContext();

  return (
    <section className="mt-10 grid grid-cols-1 gap-6 max-sm:mx-auto max-sm:max-w-md sm:grid-cols-2 xl:grid-cols-3">
      {isLoadng ? (
        <FixtureLoader />
      ) : matches.length < 1 ? (
        <NoActivity
          title={`${isLoadng}`}
          classname=" col-span-3 !bg-background border rounded-md font-secondary tracking-wider"
        />
      ) : (
        matches?.map((prop, idx) => <Fixture key={idx} prop={prop} />)
      )}
    </section>
  );
}
