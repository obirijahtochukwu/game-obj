import React from "react";
import Carousel from "./carousel";

export default function Header() {
  return (
    <article className="">
      <div className="my-5 flex items-center gap-1 text-xl font-semibold tracking-wider">🔥 Popular</div>
      <Carousel />

      {/* <section className="flex w-full flex-col gap-4">
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
      </section> */}
    </article>
  );
}
