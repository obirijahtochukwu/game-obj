import React, { useEffect, useState } from "react";
import { Icons } from "../../../../ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../../../lib/global-context";
import { useFormattedDate } from "../../../../../lib/hooks/useFormattedDate";
import axios from "axios";
import { backend_api } from "../../../../../lib/constants";
import User from "./user";

export default function Table() {
  const { players } = useGlobalContext().admin;

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
        {players.map((props, idx) => (
          <User {...props} idx={idx} />
        ))}
      </main>
    </article>
  );
}
