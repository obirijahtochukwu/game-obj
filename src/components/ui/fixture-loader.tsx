import React from "react";
import { randomData } from "../../lib/utils";
// import { randomData } from "../../../../lib/utils";

export default function FixtureLoader() {
  return (
    <>
      {randomData(6).map((e, i) => (
        <div key={i} className="flex min-h-64 animate-pulse flex-col gap-4 rounded-2xl border-2 border-transparent bg-muted p-4">
          {/* League Name Skeleton */}
          <div className="h-6 w-32 rounded-lg bg-grey/20"></div>

          {/* Teams Section Skeleton */}
          <section className="flex items-center justify-between">
            {/* Home Team Skeleton */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-grey/20"></div>
                <div className="h-6 w-24 rounded-lg bg-grey/20"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-grey/20"></div>
                <div className="h-6 w-24 rounded-lg bg-grey/20"></div>
              </div>
            </div>

            {/* VS Text Skeleton */}
            <div className="h-6 w-6 rounded-full bg-grey/20"></div>

            {/* Odds Skeleton */}
            <div className="flex flex-col gap-4">
              <div className="h-8 w-12 rounded-lg bg-grey/20"></div>
              <div className="h-8 w-12 rounded-lg bg-grey/20"></div>
            </div>
          </section>

          {/* Tags Section Skeleton */}
          <section className="mt-auto flex flex-wrap gap-2">
            <div className="h-8 w-24 rounded-lg bg-grey/20"></div>
            <div className="h-8 w-24 rounded-lg bg-grey/20"></div>
            <div className="h-8 w-24 rounded-lg bg-grey/20"></div>
          </section>
        </div>
      ))}
    </>
  );
}
