import React, { useEffect, useState } from "react";
import { Icons } from "../ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { pages, tabs } from "./mock-data";
import { useGlobalContext } from "../../lib/global-context";
import { backgroundImage } from "../../lib/utils";
import Pages from "./pages";
import { useClick } from "../../lib/hooks/useclick";

export default function Leftbar({ pathname }: { pathname: string }) {
  const { _id } = useGlobalContext().user.info;
  const { isOpen, setIsOpen, targetRef } = useClick.auto();

  const navigate = useNavigate();

  const props = { _id, navigate, pathname, isOpen, setIsOpen };

  return (
    <article ref={targetRef} className={`${isOpen ? "w-52" : "w-20"} flex duration-300 max-md:hidden`}>
      <Opened {...props} />
      <aside
        className={`${isOpen ? "w-0 overflow-x-hidden opacity-0" : "w-20 opacity-100"} custom-scrollbar sticky top-7 z-10 flex h-[calc(100vh-56px)] flex-col items-center justify-center gap-2 rounded-lg bg-advance py-5 duration-300`}
      >
        <Icons.bar onClick={() => setIsOpen(true)} className="mb-auto h-8 w-8 cursor-pointer" />
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
    </article>
  );
}

const Opened = ({ _id, navigate, pathname, isOpen, setIsOpen }) => (
  <aside
    className={`${isOpen ? "w-52 px-2 opacity-100" : "w-0 overflow-x-hidden opacity-0"} custom-scrollbar max-md:hi-dden sticky top-7 z-10 flex h-[calc(100vh-56px)] flex-col justify-center gap-2 rounded-lg bg-advance py-5 duration-300`}
  >
    <div onClick={() => setIsOpen(false)} className="mb-auto flex cursor-pointer items-center gap-4 px-3 text-lg text-primary">
      <Icons.close className="h-6 w-6" /> Close
    </div>
    <>
      {tabs(_id).map(({ label, Icon, url, pages }, idx) => (
        <article
          key={idx}
          title={isOpen || label}
          onClick={() => navigate(url ? url : "#")}
          className={`${idx == 3 && "mt-auto"} group relative z-10 flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-lg text-primary duration-500 hover:bg-sm`}
        >
          <Icon className="h-7 w-7" /> {label}
          {pages?.length > 0 && <Pages pathname={pathname} extreme pages={pages} />}
        </article>
      ))}
    </>
  </aside>
);
