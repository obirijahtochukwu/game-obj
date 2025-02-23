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
    <div className="grid min-w-full grid-cols-12 overflow-hidden rounded-lg font-secondary">
      <div className={`flex h-full items-center justify-center bg-red-700 text-xl font-semibold text-primary shadow-smError`}>
        0
      </div>
      <div className="col-span-10">
        <section className="grid min-w-full grid-cols-11">
          {board.map(
            ({ num }, idx) =>
              idx > 0 &&
              idx < 34 && (
                <div onClick={() => select(num)} className={className(num)}>
                  <div className="-rotate-90">{num}</div>
                </div>
              ),
          )}
        </section>
      </div>
      <section className="col-span-1 flex flex-col">
        {board.map(
          ({ num }, idx) =>
            idx > 33 && (
              <div onClick={() => select(num)} className={className(num)}>
                {num}
              </div>
            ),
        )}
      </section>
      <section className="col-span-12 flex">
        {["Even", "Odd"].map((name, idx) => (
          <div
            onClick={() => select(name)}
            className={`${
              gamble.outcomes.includes(name) ? "border-2 border-t-2 border-advance" : ""
            } flex h-14 w-1/2 cursor-pointer items-center justify-center border-t border-primary bg-secondary text-xl font-semibold text-primary shadow-smDark even:bg-red-700 even:shadow-smError`}
          >
            {name}
          </div>
        ))}
      </section>
    </div>
  );
}
