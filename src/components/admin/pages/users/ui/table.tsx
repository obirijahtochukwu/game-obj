import React, { useEffect, useState } from "react";
import { Icons } from "../../../../ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../../../lib/global-context";
import { useFormattedDate } from "../../../../../lib/hooks/useFormattedDate";
import axios from "axios";
import { backend_api } from "../../../../../lib/constants";
import User from "./user";
import PaginationWithDots from "../../../../../lib/hooks/usePagination";
import usePagination from "../../../../../lib/hooks/usePagination";

export default function Table() {
  const { players } = useGlobalContext().admin;
  const itemsPerPage = 5;
  const { PaginationWithDots, visisbleData } = usePagination({
    totalPages: Math.ceil(players.length / itemsPerPage),
    data: players,
    itemsPerPage,
  });
  // const visisbleData = players.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <article className="mt-7 rounded-lg border border-gray bg-advance text-primary">
      <div className="flex items-center justify-between border-b border-gray p-6 pb-4 text-base font-medium">
        All Users {players.length}
        <PaginationWithDots />
      </div>

      <main className="custom-scrollbar w-full overflow-x-auto">
        <div className="flex h-14 w-fit min-w-full items-center justify-between gap-14 pr-7 text-sm font-medium text-grey">
          <div className="bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6">
            <div className="w-52">
              <input type="checkbox" name="" className="mr-5" id="" />
              Name
            </div>
            <div className="w-28">Balance</div>
          </div>
          <div className="w-28">Approved date</div>
          <div className="w-20 text-center">Status</div>
          <div className="w-16"></div>
        </div>
        {visisbleData.map((props, idx) => (
          <User key={idx} {...props} idx={idx} />
        ))}
      </main>
    </article>
  );
}
