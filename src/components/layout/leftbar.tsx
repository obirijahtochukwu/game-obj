import React, { useEffect } from "react";
import { Icons } from "../ui/icons";
import { Link } from "react-router-dom";
import { pages } from "./mock-data";
import { useGlobalContext } from "../../lib/global-context";
import { backgroundImage } from "../../lib/utils";

export default function Leftbar({
  targetRef,
  isOpen,
  setIsOpen,
  pathname,
}: {
  targetRef: React.LegacyRef<HTMLInputElement | any>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  pathname: string;
}) {
  const { _id } = useGlobalContext().user.info;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside
      ref={targetRef}
      className={`${isOpen ? "group w-80" : "w-28"} custom-scrollbar sticky top-7 z-50 h-[calc(100vh-56px)] overflow-x-hidden rounded-lg bg-advance px-4 duration-300 max-md:hidden`}
    >
      <section className="flex h-full w-full min-w-48 flex-col gap-2 py-5">
        <div
          onClick={() => window?.innerWidth > 1000 && setIsOpen(!isOpen)}
          className={`mb-auto flex h-max cursor-pointer items-center gap-2 rounded-sm pl-4`}
        >
          {isOpen ? <Icons.close /> : <Icons.bar className="h-8 w-8" />}
          <div className={`${isOpen ? "opacity-100" : "opacity-0"} text-xl font-medium text-primary duration-500`}>Menu</div>
        </div>
        <>
          {pages(_id).map(({ label, Icon, url }, idx) => (
            <Link
              to={url}
              key={idx}
              style={{ backgroundImage: pathname == url && isOpen && backgroundImage }}
              className={`${idx == 6 && "mt-auto"} ${
                isOpen ? "" : ""
              } relative z-10 flex cursor-pointer items-center gap-3 overflow-hidden rounded-md py-3 pl-4 font-advance text-lg font-medium capitalize text-primary duration-500`}
            >
              {pathname == url && (
                <div
                  style={{ backgroundImage: backgroundImage }}
                  className="absolute left-0.5 top-0 -z-10 h-full w-14 rounded-md"
                ></div>
              )}
              <Icon className="h-7 w-7" />
              <div className={`${isOpen ? "opacity-100" : "opacity-0"} duration-500`}>{label}</div>
            </Link>
          ))}
        </>
      </section>
    </aside>
  );
}
