import React from "react";
import { Icons } from "../../../../ui/icons";
import { Link } from "react-router-dom";

export default function Table() {
  return (
    <article className="rounded-lg border border-gray bg-advance mt-7 text-primary">
      <div className=" p-6 pb-4 text-base font-medium border-b border-gray">
        All Users
      </div>
      <main className="w-full overflow-x-auto custom-scrollbar">
        <div className="w-fit min-w-full flex gap-14 items-center justify-between text-white text-sm font-medium pr-7 h-10 ">
          <div className="flex gap-14 items-center justify-between rounded-lg bg-Red sticky left-0 top-0 w-fit pl-6 bg-advance">
            <div className="w-52">
              <input type="checkbox" name="" className="mr-5" id="" />
              Name
            </div>
            <div className="w-28">Balance</div>
          </div>
          <div className="w-28">Approved date</div>
          <div className="w-16">Status</div>
          <div className="w-12"></div>
        </div>
        {Array(7)
          .fill("")
          .map((e, idx) => (
            <div className="w-fit min-w-full flex gap-14 items-center justify-between text-white text-sm font-medium pr-7 h-16 even:bg-dark font-advance">
              <div
                className={`flex gap-14 items-center justify-between rounded-lg bg-Red sticky left-0 top-0 w-fit pl-6 bg-advance ${
                  idx % 2 == 0 && " bg-dark"
                }`}
              >
                <div className="w-52 flex items-center">
                  <input type="checkbox" name="" className="mr-5" id="" />
                  <div className="flex items-center gap-2 mt-auto bg-advance rounded-xl">
                    <img
                      src="/media/admin/user.png"
                      alt=""
                      className="h-7 w-7 rounded-full"
                    />
                    <div className="w-full">
                      <Link
                        to="/admin/player"
                        className="text-base font-medium leading-none hover:underline"
                      >
                        John Carter
                      </Link>
                      <div className="text-xs font-medium opacity-60">
                        john@google.com
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-28">{idx + 1 * 0.05}Sol</div>
              </div>
              <div className="w-28">10th June, 2023</div>
              <div className="w-16 py-0.5 rounded-sm bg-success/15 text-success flex items-center justify-center gap-1">
                <div className="h-0.5 w-0.5 bg-success" /> Online
              </div>
              <div className="w-12 flex items-center gap-1.5">
                <Icons.edit />
                <Icons.delete />
              </div>
            </div>
          ))}
      </main>
    </article>
  );
}
