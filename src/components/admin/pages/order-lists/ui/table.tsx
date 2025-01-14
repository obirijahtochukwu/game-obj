import React from "react";

export default function Table() {
  return (
    <article className="w-full overflow-x-auto custom-scrollbar bg-advance mt-7 rounded-md border border-gray">
      <div className="w-fit min-w-full flex gap-14 items-center justify-between text-white/80 text-sm font-medium pr-7 h-10 ">
        <div className="flex gap-14 items-center justify-between rounded-lg bg-Red sticky left-0 top-0 w-fit pl-6 pr-5 bg-advance">
          <div className="w-20">ID</div>
          <div className="w-32">NAME</div>
        </div>
        <div className="w-28">ADDRESS</div>
        <div className="w-24">DATE</div>
        <div className="w-16 text-center">Amount</div>
        <div className="w-24 text-center">Status</div>
      </div>
      {Array(7)
        .fill("")
        .map((e, idx) => (
          <div className="w-fit min-w-full flex gap-14 items-center justify-between text-white text-sm font-medium pr-7 h-10 even:bg-dark font-advance ">
            <div
              className={`flex gap-14 items-center justify-between rounded-lg bg-Red sticky left-0 top-0 w-fit pr-5 pl-6 bg-advance ${
                idx % 2 == 0 && " bg-dark"
              }`}
            >
              <div className="w-20">000{idx + 1}</div>
              <div className="w-32">Christine Brooks</div>
            </div>
            <div className="w-28 truncate">089 Kutch Green Apt. 448</div>
            <div className="w-24">14 Feb 2024</div>
            <div className="w-16 text-center">1000</div>
            <div className="w-24 py-0.5 rounded-sm bg-success/15 text-success flex items-center justify-center gap-1">
              Completed
            </div>
          </div>
        ))}
    </article>
  );
}
