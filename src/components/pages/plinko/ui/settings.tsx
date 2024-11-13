import React, { useState } from "react";
import Select from "./select";

export default function Settings({
  rows,
  setRows,
  handleClick,
}: {
  rows: number;
  setRows: React.Dispatch<number>;
  handleClick: () => void;
}) {
  const [play, setPlay] = useState("Manual");
  const [level, setLevel] = useState("Basic");
  const [chain, setChain] = useState("");
  const rows_list = [10, 11, 12, 13, 14, 15, 16];
  return (
    <article className=" bg-advance p-4 w-96 rounded-3xl flex flex-col gap-6">
      <section className=" h-14 rounded-full grid grid-cols-2 bg-muted p-1">
        {["Manual", "Auto"].map((name) => (
          <div
            key={name}
            onClick={() => setPlay(name)}
            className={`${
              play == name ? "bg-advance" : ""
            } flex items-center justify-center rounded-full text-primary text-lg font-bold cursor-pointer duration-300`}
          >
            {name}
          </div>
        ))}
      </section>
      <Select
        label={chain || ""}
        title="Crypto Chain"
        data={["btc", "sol", "ton", "eth"]}
        handleClick={(name) => setChain(name)}
      />
      <section>
        <div className=" text-base font-medium text-primary/80">Bet Amount</div>
        <article className="h-14 w-full bg-muted border border-gray rounded-lg flex items-center justify-between font-semibold text-base text-primary px-3 py-1.5 mt-2 gap-3">
          <input
            type="text"
            placeholder="0.0000005"
            className=" w-full h-full bg-transparent focus:outline-none"
          />
          <div className=" h-full max-w-24 bg-advance border-gray border w-full rounded-md grid grid-cols-2 py-2">
            {["1/2", "2x"].map((label, idx) => (
              <div
                key={idx}
                className={`${
                  idx == 1 && " border-l"
                } flex items-center justify-center cursor-pointer text-primary font-semibold text-xs`}
              >
                {label}
              </div>
            ))}
          </div>
        </article>
      </section>
      <Select
        label={level || ""}
        title="Difficulty Level"
        data={["basic", "medium", "Hard"]}
        handleClick={(name) => setLevel(name)}
      />{" "}
      <div className="w-full">
        <Select
          label={rows.toString() || ""}
          title="Rows"
          data={rows_list}
          handleClick={(name) => setRows(+name)}
        />
        <button
          onClick={handleClick}
          className=" w-full mt-4 flex items-center justify-center bg-secondary h-12 rounded-xl text-primary font-semibold text-xl"
        >
          Bet
        </button>
      </div>
    </article>
  );
}
