import React from "react";
import { Link } from "react-router-dom";
import { backgroundImage } from "../../lib/utils";

export default function Pages({ pages, pathname, extreme }: { extreme?: boolean } & any) {
  return (
    <div
      className={`${extreme ? "left-full ml-4" : "left-14"} invisible absolute -top-10 z-10 flex h-fit w-0 overflow-x-hidden rounded-md bg-advance opacity-0 drop-shadow-[0px_0px_6px_#ffffff30] duration-500 group-hover:visible group-hover:w-44 group-hover:opacity-100`}
    >
      <section className="flex w-full min-w-40 flex-col gap-2 p-2">
        {pages?.map(({ label, Icon, url }, idx: number) => (
          <Link
            to={url}
            key={idx}
            style={{ backgroundImage: pathname == url && backgroundImage }}
            className={`${pathname == url ? "text-primary" : "text-grey"} relative z-10 flex items-center gap-3 rounded-md py-2 pl-4 font-advance text-base font-medium capitalize duration-300`}
          >
            <Icon className="h-5 w-5" />
            <div className={`whitespace-nowrap`}>{label}</div>
          </Link>
        ))}
      </section>
    </div>
  );
}
