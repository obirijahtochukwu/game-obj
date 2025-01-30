import React from "react";
import { games } from "../mock-data";
import { Link } from "react-router-dom";
import { Buttons } from "../../../ui/buttons";
import { backgroundImage } from "../../../../lib/utils";

export default function Header() {
  return (
    <article className="flex items-center gap-7 max-lg:flex-col">
      <section
        style={{
          background: "linear-gradient(137.48deg, #FF7642 20.9%, #A53408 79.1%)",
        }}
        className="max-w-43l relative z-10 h-72 w-full rounded-3xl p-5 text-primary"
      >
        <div className="sm:max-w-96">
          <div className="text-xl font-bold tracking-tighter">Exclusive Deal</div>
          <div className="text-4xl font-semibold leading-[46px] tracking-tighter">
            Big Bass Boom <br /> Enhanced RTP
          </div>
          <div className="text-xl font-medium tracking-tighter">Try Pragmatic's newest Enhanced RTP creation, Big Bass..</div>
          <Buttons.play_now style={{ backgroundImage: backgroundImage }} classname="mt-5 ">
            Play Now
          </Buttons.play_now>
        </div>
        <img
          src="./media/home/header.png"
          alt=""
          className="absolute -right-4 bottom-0 -z-10 max-w-md max-sm:hidden lg:hidden xl:block"
        />
      </section>
      <section className="flex w-full flex-col gap-4">
        {games.map(({ label, image, url }) => (
          <div className="flex items-center gap-3 rounded-xl bg-advance p-4 text-xl font-semibold text-primary">
            <img src={image} alt="" className="h-12 w-12" />
            <div className="truncate">{label}</div>
            <Link
              to={url}
              className="ml-auto flex h-12 min-w-32 cursor-pointer items-center justify-center truncate rounded-lg bg-gradient-custom text-lg font-semibold text-primary"
            >
              Play Now
            </Link>
          </div>
        ))}
      </section>
    </article>
  );
}
