import React from "react";
import { games } from "../mock-data";

export default function Header() {
  return (
    <article className=" flex max-lg:flex-col items-center gap-7">
      <section
        style={{
          background:
            "linear-gradient(137.48deg, #FF7642 20.9%, #A53408 79.1%)",
        }}
        className="w-full max-w-43l rounded-3xl h-72 p-5 text-primary relative"
      >
        <div className=" max-w-96">
          <div className=" text-xl font-bold tracking-tighter">
            Exclusive Deal
          </div>
          <div className=" text-4xl leading-[46px] font-semibold tracking-tighter">
            Big Bass Boom <br /> Enhanced RTP
          </div>
          <div className=" text-xl font-medium tracking-tighter">
            Try Pragmatic's newest Enhanced RTP creation, Big Bass..
          </div>
          <div className="mt-5 cursor-pointer h-12 w-32 flex items-center justify-center rounded-lg text-dark bg-primary text-lg font-semibold">
            Play Now
          </div>
        </div>
        <img
          src="./media/home/header.png"
          alt=""
          className="max-w-md absolute bottom-0 -right-4"
        />
      </section>
      <section className=" flex flex-col w-full gap-4">
        {games.map(({ label, image }) => (
          <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-xl text-xl font-semibold text-primary">
            <img src={image} alt="" className=" h-12 w-12" />
            <div className=" truncate">{label}</div>
            <div className="ml-auto cursor-pointer h-12 min-w-32 flex items-center justify-center rounded-lg text-dark bg-primary text-lg font-semibold truncate">
              Play Now
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
