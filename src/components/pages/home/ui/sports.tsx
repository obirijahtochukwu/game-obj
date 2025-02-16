import React from "react";
import { Buttons } from "../../../ui/buttons";
import { Link, useNavigate } from "react-router-dom";
import { tabs } from "../../../layout/mock-data";
import { Icons } from "../../../ui/icons";

export default function Sports() {
  const navigate = useNavigate();

  const sports = tabs()[2]?.pages;

  return (
    <article className="mt-5 font-advance">
      <div className="flex items-center gap-1 text-xl font-semibold tracking-wider">📺 Sports</div>
      <section className="mt-4 grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {/* @ts-ignore */}
        {sports?.map(({ label, url, image }, idx) => (
          <div
            key={idx}
            // style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.084) 0%, rgba(217, 217, 217, 0.042) 100%)" }}
            className="flex h-72 flex-col rounded-md border border-gray bg-sm p-3"
          >
            <img src={image} className="h-32 w-full rounded-md bg-background" />
            <div className="mt-2 text-lg font-bold uppercase">{label}</div>
            <div className="text-sm text-grey">Active players: {idx + 3 * 7}</div>

            <button
              onClick={() => navigate(url)}
              className="group relative mt-auto h-9 w-full cursor-pointer items-center justify-center overflow-x-hidden rounded-sm bg-gradient-custom text-base font-semibold duration-300"
            >
              <div className="absolute right-full top-0 z-10 flex h-full w-full items-center justify-center bg-image duration-300 group-hover:right-0">
                Click here!
              </div>
              <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-pink duration-300 group-hover:left-full">
                Play Game
              </div>
            </button>
            {/* <Buttons.primary classname="trapezium-button -skew-x-12 mt-auto !rounded-none"></Buttons.primary> */}
          </div>
        ))}
      </section>
    </article>
  );
}
