import React from "react";
import { games } from "../mock-data";
import { Link } from "react-router-dom";
import { Buttons } from "../../../ui/buttons";

export default function Header() {
  return (
    <article className=" flex max-lg:flex-col items-center gap-7">
      <section
        style={{
          background:
            "linear-gradient(137.48deg, #FF7642 20.9%, #A53408 79.1%)",
        }}
        className="w-full max-w-43l rounded-3xl h-72 p-5 text-primary relative z-10"
      >
        <div className=" sm:max-w-96">
          <div className=" text-xl font-bold tracking-tighter">
            Exclusive Deal
          </div>
          <div className=" text-4xl leading-[46px] font-semibold tracking-tighter">
            Big Bass Boom <br /> Enhanced RTP
          </div>
          <div className=" text-xl font-medium tracking-tighter">
            Try Pragmatic's newest Enhanced RTP creation, Big Bass..
          </div>
          <Buttons.play_now classname="mt-5 ">Play Now</Buttons.play_now>
        </div>
        <img
          src="./media/home/header.png"
          alt=""
          className="max-w-md absolute bottom-0 -right-4 max-sm:hidden lg:hidden xl:block -z-10"
        />
      </section>
      <section className=" flex flex-col w-full gap-4">
        {games.map(({ label, image, url }) => (
          <div className="flex items-center gap-3 bg-advance p-4 rounded-xl text-xl font-semibold text-primary">
            <img src={image} alt="" className=" h-12 w-12" />
            <div className=" truncate">{label}</div>
            <Link
              to={url}
              className="ml-auto cursor-pointer h-12 min-w-32 flex items-center justify-center rounded-lg text-primary bg-gradient-custom text-lg font-semibold truncate"
            >
              Play Now
            </Link>
          </div>
        ))}
      </section>
    </article>
  );
}
