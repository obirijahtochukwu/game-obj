import React, { useEffect, useState } from "react";
import { Icons } from "./icons";
import { useGlobalContext } from "../../lib/global-context";
import formatDateToTime from "../../lib/utils/formatDateToTime";
import { gameHistory, userData } from "../../lib/types";
import filterTableLabelsByCondition from "../../lib/utils/filter-table-labels-by-condition ";
import { formattedNumber } from "../../lib/utils/formattedNumber";
import usePagination from "../../lib/hooks/usePagination";
import NoActivity from "./no-activity";
import { useFormattedDate } from "../../lib/hooks/useFormattedDate";

export default function Table({
  title,
  data,
  filterLabels,
  setFilterLabels,
}: {
  title: string;
  data?: gameHistory[];
  filterLabels: string[];
  setFilterLabels: React.Dispatch<string[]>;
}) {
  const { formattedDate } = useFormattedDate();
  const { user }: any = useGlobalContext();
  // const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const { PaginationWithDots, visisbleData, setCurrentPage } = usePagination({
    totalPages: Math.ceil(data.length / itemsPerPage),
    data,
    itemsPerPage,
  });
  console.log(visisbleData);

  const reversedData = data.reverse();
  // const currentData = reversedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (name: string) => {
    const isExistingLabel = filterLabels.includes(name);
    if (isExistingLabel) {
      setFilterLabels(filterLabels.filter((e: string) => e != name));
    } else {
      if (name == "all bets") {
        filterTableLabelsByCondition(filterLabels, user.info._id, name, setFilterLabels);
      } else if (name == user.info._id) {
        filterTableLabelsByCondition(filterLabels, "all bets", name, setFilterLabels);
      } else if (name == "win") {
        filterTableLabelsByCondition(filterLabels, "loss", name, setFilterLabels);
      } else if (name == "loss") {
        filterTableLabelsByCondition(filterLabels, "win", name, setFilterLabels);
      } else {
        setFilterLabels([...filterLabels, name]);
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterLabels]);

  return (
    <>
      <article className="overflow-x-hidden rounded-lg bg-advance pt-6">
        <div className="flex items-center justify-between px-4 text-2xl font-semibold text-primary md:text-4xl">{title}</div>
        <section className="flex w-full items-center justify-between px-4">
          <div className="mt-5 flex w-fit items-center gap-2 sm:gap-4">
            {[
              { value: "all bets", label: "all bets" },
              { value: `${user.info._id}`, label: "my bets" },
              { value: "win", label: "win" },
              { value: "loss", label: "loss" },
            ].map(({ label, value }) => (
              <div
                key={label}
                onClick={() => {
                  handleFilterChange(value);
                }}
                className={`${
                  filterLabels.find((e) => e == value) ? "bg-primary/80 text-dark" : "border-primary/60 text-primary/80"
                } flex h-9 cursor-pointer items-center truncate rounded-md border px-2 font-advance text-sm font-semibold capitalize duration-300 sm:h-12 sm:px-4 sm:text-base`}
              >
                {label}
              </div>
            ))}
          </div>
        </section>
        <main className="custom-scrollbar mt-9 min-h-fit w-full overflow-x-auto rounded-lg">
          {visisbleData.length > 0 ? (
            <>
              <div className="bg-Red flex h-14 w-fit min-w-full items-center justify-between gap-14 border-y border-gray pr-7 font-medium text-white">
                <div className="bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-7">
                  <div className="w-20">ID</div>
                  <div className="w-36">User Name</div>
                </div>
                <div className="w-40 text-center">Date</div>
                <div className="w-28 whitespace-nowrap text-center">Bet Amount</div>
                <div className="w-20">Multiplier</div>
                <div className="w-20 text-center">Result</div>
                <div className="w-20 text-right">Payout</div>
              </div>
              {visisbleData?.map(
                ({ betAmount, createdAt, result, multiplier, payout, _id, username }, id) =>
                  result == "pending" || (
                    <div
                      key={id}
                      className="flex h-14 w-fit min-w-full items-center justify-between gap-14 pr-7 font-advance text-base font-medium text-primary/80 odd:bg-dark"
                    >
                      <div
                        className={`sticky left-0 top-0 flex h-full w-fit items-center justify-between gap-14 bg-advance pl-7 ${
                          id % 2 != 0 && "bg-dark"
                        }`}
                      >
                        <div className="w-20 truncate">{_id}</div>
                        <div className="w-36">{username}</div>
                      </div>
                      <div className="w-40 text-center">{formattedDate(createdAt)}</div>
                      <div className="w-28 text-center">${formattedNumber(betAmount)}</div>
                      <div className="w-20 text-center">{multiplier?.toFixed(1)}x</div>
                      <div
                        className={`w-20 rounded-sm py-1 text-center text-sm capitalize ${result == "win" ? "bg-success" : result == "pending" ? "bg-yellow-500/50" : "bg-danger/50"}`}
                      >
                        {result}
                      </div>
                      <div className="w-20 text-right">{`${result == "pending" ? "-----" : `$${formattedNumber(payout)}`}`}</div>
                    </div>
                  ),
              )}
            </>
          ) : (
            <NoActivity />
          )}
        </main>
      </article>
      <div className="my-4 flex justify-end">
        <PaginationWithDots />
      </div>
    </>
  );
}
