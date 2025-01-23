import React, { useEffect } from "react";
import { Icons } from "../../../../ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../../../lib/global-context";
import { useFormattedDate } from "../../../../../lib/hooks/useFormattedDate";
import axios from "axios";
import { backend_api } from "../../../../../lib/constants";

export default function Table() {
  const { players } = useGlobalContext().admin;
  const { extractDate } = useFormattedDate();

  return (
    <article className="mt-7 rounded-lg border border-gray bg-advance text-primary">
      <div className="border-b border-gray p-6 pb-4 text-base font-medium">All Users</div>
      <main className="custom-scrollbar w-full overflow-x-auto">
        <div className="flex h-10 w-fit min-w-full items-center justify-between gap-14 pr-7 text-sm font-medium text-white">
          <div className="bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6">
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
        {players.map(({ _id, name, email, createdAt }, idx) => (
          <div className="flex h-16 w-fit min-w-full items-center justify-between gap-14 pr-7 font-advance text-sm font-medium text-white even:bg-dark">
            <div
              className={`bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6 ${
                idx % 2 == 0 && "bg-dark"
              }`}
            >
              <div className="flex w-52 items-center">
                <input type="checkbox" name="" className="mr-5" id="" />
                <div className="mt-auto flex items-center gap-2 rounded-xl">
                  <img src="/media/user.png" alt="" className="h-7 w-7 rounded-full" />
                  <div className="w-full">
                    <Link to={`/user/${_id}`} className="text-base font-medium leading-none hover:underline">
                      {name}
                    </Link>
                    <div className="text-xs font-medium opacity-60">{email}</div>
                  </div>
                </div>
              </div>
              <div className="w-28">{idx + 1 * 0.05}Sol</div>
            </div>
            <div className="w-28">{extractDate(createdAt)}</div>
            <div className="flex w-16 items-center justify-center gap-1 rounded-sm bg-success/15 py-0.5 text-success">
              <div className="h-0.5 w-0.5 bg-success" /> Online
            </div>
            <div className="flex w-12 items-center gap-1.5">
              <Icons.edit />
              <Icons.delete />
            </div>
          </div>
        ))}
      </main>
    </article>
  );
}
