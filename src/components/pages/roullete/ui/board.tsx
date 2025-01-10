import React, { useState } from "react";
import { useRoulleteContext } from "../context";
import { toast } from "react-toastify";

export default function Board() {
  const { board, setGamble, gamble } = useRoulleteContext();
  const [bets, setBets] = useState([]);

  const className = (num: number) =>
    `${
      gamble.outcomes.includes(num) ? " border-2 border-advance" : ""
    } h-14 flex items-center justify-center  text-primary font-semibold text-xl even:bg-red-700 even:shadow-smError bg-secondary shadow-smDark cursor-pointer`;

  const select = (num: number | string) => {
    const item = gamble.outcomes.includes(num);
    if (item) {
      setGamble({
        ...gamble,
        outcomes: gamble.outcomes.filter((val: any) => val != num),
      });
    } else if (num != "Odd" && num != "Even" && gamble.outcomes.length > 2) {
      toast.error("Opps! you can only choose maximun of five outcomes");
    } else {
      if (num == "Odd") {
        const item = gamble.outcomes.filter((val: any) => val != "Even");
        setGamble({ ...gamble, outcomes: [...item, num] });
      } else if (num == "Even") {
        const item = gamble.outcomes.filter((val: any) => val != "Odd");
        setGamble({ ...gamble, outcomes: [...item, num] });
      } else {
        setGamble({ ...gamble, outcomes: [...gamble.outcomes, num] });
      }
    }
  };

  return (
    <div className="grid grid-cols-12 min-w-full rounded-lg overflow-hidden font-secondary">
      <div
        className={` h-full flex items-center justify-center shadow-smError text-primary font-semibold text-xl bg-red-700`}
      >
        0
      </div>
      <div className=" col-span-10">
        <section className=" grid grid-cols-11 min-w-full">
          {board.map(
            ({ num }, idx) =>
              idx > 0 &&
              idx < 34 && (
                <div onClick={() => select(num)} className={className(num)}>
                  <div className=" -rotate-90">{num}</div>
                </div>
              )
          )}
        </section>
      </div>
      <section className=" col-span-1 flex flex-col">
        {board.map(
          ({ num }, idx) =>
            idx > 33 && (
              <div onClick={() => select(num)} className={className(num)}>
                {num}
              </div>
            )
        )}
      </section>
      <section className=" col-span-12 flex">
        {["Even", "Odd"].map((name, idx) => (
          <div
            onClick={() => select(name)}
            className={`${
              gamble.outcomes.includes(name)
                ? " border-2 border-advance border-t-2"
                : ""
            } h-14 w-1/2 flex items-center justify-center  text-primary font-semibold text-xl even:bg-red-700 even:shadow-smError bg-secondary shadow-smDark border-t border-primary cursor-pointer`}
          >
            {name}
          </div>
        ))}
      </section>
    </div>
  );
}
