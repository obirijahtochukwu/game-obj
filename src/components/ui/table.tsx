import React, { useEffect, useState } from "react";
import { Icons } from "./icons";
import { useGlobalContext } from "../../lib/global-context";
import formatDateToTime from "../../lib/utils/formatDateToTime";
import { gameHistory, userData } from "../../lib/types";
import filterTableLabelsByCondition from "../../lib/utils/filter-table-labels-by-condition ";

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
  const [count, setCount] = useState(6);
  const { user }: any = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPage = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (name: string) => {
    const isExistingLabel = filterLabels.includes(name);
    if (isExistingLabel) {
      setFilterLabels(filterLabels.filter((e: string) => e != name));
    } else {
      if (name == "all bets") {
        filterTableLabelsByCondition(
          filterLabels,
          user.info._id,
          name,
          setFilterLabels
        );
      } else if (name == user.info._id) {
        filterTableLabelsByCondition(
          filterLabels,
          "all bets",
          name,
          setFilterLabels
        );
      } else if (name == "win") {
        filterTableLabelsByCondition(
          filterLabels,
          "loss",
          name,
          setFilterLabels
        );
      } else if (name == "loss") {
        filterTableLabelsByCondition(
          filterLabels,
          "win",
          name,
          setFilterLabels
        );
      } else {
        setFilterLabels([...filterLabels, name]);
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterLabels]);

  return (
    <article className=" bg-advance rounded-3xl p-4 pt-6">
      <div className="flex justify-between items-center text-4xl font-semibold text-primary">
        {title}
      </div>
      <section className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex items-center mt-5 gap-4 w-fit">
          {[
            { value: "all bets", label: "all bets" },
            { value: `${user.info._id}`, label: "my bets" },
            { value: "win", label: "win" },
            { value: "loss", label: "loss" },
            // { value: "leaderboard", label: " leaderboard" },
          ].map(({ label, value }) => (
            <div
              key={label}
              onClick={() => {
                handleFilterChange(value);
              }}
              className={`${
                filterLabels.find((e) => e == value)
                  ? " bg-primary/80 text-dark"
                  : "border-primary/60 text-primary/80 "
              } flex items-center px-4 h-12 rounded-lg border text-base font-semibold cursor-pointer truncate duration-300 capitalize`}
            >
              {label}
            </div>
          ))}
          <div className=" px-4 h-12 rounded-lg border border-primary/60 text-primary/80 text-base font-semibold flex items-center gap-3">
            {currentPage}/{totalPage}
            <div className={totalPage == 1 && "hidden"}>
              <Icons.arrow
                onClick={() => setCurrentPage(currentPage + 1)}
                color="#ffffff90"
                className={
                  data.length / itemsPerPage > currentPage
                    ? " -rotate-90 h-4 cursor-pointer"
                    : " -rotate-90 h-4 invisible"
                }
              />
              <Icons.arrow
                onClick={() => setCurrentPage(currentPage - 1)}
                color="#ffffff90"
                className={
                  currentPage == 1
                    ? " -rotate-90 h-4 invisible"
                    : " rotate-90 h-4 cursor-pointer"
                }
              />
            </div>
          </div>
        </div>
      </section>
      <main className="w-full h-[340px] overflow-x-auto mt-9 custom-scrollbar rounded-lg">
        {currentData.length > 0 ? (
          <>
            <div className="bg-Red w-fit min-w-full flex gap-14 items-center justify-between text-white font-medium pr-7 rounded-xl h-14">
              <div className="flex gap-14 items-center justify-between rounded-lg bg-Red sticky left-0 top-0 w-fit pl-7 bg-advance">
                <div className="w-36">Game</div>
                <div className="w-36">User</div>
              </div>
              <div className="w-36">Time</div>
              <div className="w-36">Bet Amount</div>
              <div className="w-36">Multiplier</div>
              <div className="w-36">Payout</div>
            </div>
            {currentData?.map(
              (
                {
                  betAmount,
                  createdAt,
                  game,
                  multiplier,
                  payout,
                  result,
                  username,
                },
                id
              ) => (
                <div
                  key={id}
                  className="bg-advance h-14 w-fit min-w-full flex gap-14 items-center justify-between text-primary/80 font-medium text-base pr-7 border-gray border-t"
                >
                  <div className="flex gap-14 items-center justify-between h-full sticky left-0 top-0 w-fit pl-7 bg-advance ">
                    <div className="w-36">{game}</div>
                    <div className="w-36">{username}</div>
                  </div>
                  <div className="w-36">{formatDateToTime(createdAt)}</div>
                  <div className="w-36">{betAmount?.toFixed(1)} SOL</div>
                  <div className="w-36">{multiplier?.toFixed(1)} x</div>
                  <div className="w-36">
                    {result == "loss" && "-"}
                    {payout}
                  </div>
                </div>
              )
            )}
          </>
        ) : (
          <section className=" text-secondary flex justify-center items-center text-xl font-semibold h-full -mt-10">
            Opps! No game found
          </section>
        )}
      </main>
    </article>
  );
}
