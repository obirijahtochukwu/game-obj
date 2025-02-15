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
            <div className="mt-auto px-2">
              <button
                onClick={() => navigate(url)}
                className="relative h-9 w-full -skew-x-[20deg] cursor-pointer bg-gradient-custom"
              >
                <div className="absolute top-0 flex h-full w-full skew-x-[20deg] items-center justify-center text-base font-semibold">
                  Play Game
                </div>
              </button>
            </div>
            {/* <Buttons.primary classname="trapezium-button -skew-x-12 mt-auto !rounded-none"></Buttons.primary> */}
          </div>
        ))}
      </section>
    </article>
  );
}
