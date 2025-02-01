import React, { useEffect } from "react";
import { Icons } from "../ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { pages, tabs } from "./mock-data";
import { useGlobalContext } from "../../lib/global-context";
import { backgroundImage } from "../../lib/utils";
import Pages from "./pages";

export default function Leftbar({ pathname }: { pathname: string }) {
  const { _id } = useGlobalContext().user.info;

  const navigate = useNavigate();

  return (
    <aside
      className={`custom-scrollbar sticky top-7 z-10 flex h-[calc(100vh-56px)] w-20 flex-col items-center justify-center gap-2 rounded-lg bg-advance py-5 duration-300 max-md:hidden`}
    >
      <Icons.bar className="mb-auto h-8 w-8" />
      <>
        {tabs(_id).map(({ label, Icon, url, pages }, idx) => (
          <article
            key={idx}
            title={label}
            onClick={() => navigate(url ? url : "#")}
            className={`${idx == 3 && "mt-auto"} group relative z-10 cursor-pointer py-3 text-primary duration-500`}
          >
            <Icon className="h-7 w-7" />
            {pages?.length > 0 && <Pages pathname={pathname} pages={pages} />}
          </article>
        ))}
      </>
    </aside>
  );
}
// percet color for roullet game icon
