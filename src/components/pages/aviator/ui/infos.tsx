import React from "react";
import { Icons } from "../../../ui/icons";
import { users } from "../data";

export default function Infos({ balance }: { balance: number }) {
  return (
    <article>
      <section className="flex items-center justify-between text-base text-primary font-semibold">
        <div className="flex items-center gap-1">
          <Icons.users /> 69
        </div>
        <div className="">{balance} SOL</div>
      </section>
      <section className="bg-dark rounded-lg p-2 flex flex-col gap-1 mt-2">
        {users.map(({ name, multiplier, balance }) => (
          <div className=" grid grid-cols-12 text-base font-medium text-primary">
            <div className=" col-span-5">{name}</div>{" "}
            <div className=" col-span-2">{multiplier || "-"}</div>
            <div
              className={`${
                multiplier && " text-secondary"
              } col-span-5 text-right`}
            >
              {balance}
            </div>{" "}
          </div>
        ))}
      </section>
    </article>
  );
}
