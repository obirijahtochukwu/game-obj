import { Link } from "react-router-dom";
import { Icons } from "../ui/icons";
import { pages } from "./mock-data";
import { useClick } from "../../lib/hooks/useclick";
import { useGlobalContext } from "../../lib/global-context";

export const Sidebar = ({ pathname }: { pathname: string }) => {
  const { isOpen, setIsOpen, targetRef }: any = useClick.auto();
  const { _id } = useGlobalContext().user.info;

  return (
    <>
      <Icons.bar onClick={() => setIsOpen(true)} className="w-6 cursor-pointer sm:hidden" />
      <aside
        ref={targetRef}
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-[700px]"
        } fixed left-0 top-0 z-50 flex h-full w-full flex-col border-r border-primary/20 bg-dark/50 px-4 pt-14 backdrop-blur-lg duration-300 sm:hidden`}
      >
        <Icons.close onClick={() => setIsOpen(false)} className="absolute right-4 top-4 w-4 cursor-pointer" />
        <section className="flex h-11 w-full items-center gap-2.5 rounded-md border border-muted bg-primary/10 px-4 py-2 text-primary backdrop-blur-md">
          <Icons.search />
          <input
            type="text"
            className="h-full w-full border-l border-primary/20 bg-transparent pl-3 text-lg font-normal tracking-tight focus:outline-none"
            placeholder="Search..."
          />
        </section>
        {pages(_id).map(({ label, Icon, url }, idx) => (
          <Link
            to={url}
            key={idx}
            onClick={() => setIsOpen(false)}
            className={`${idx == 0 ? "mt-10" : idx == 3 ? "mb-10 mt-auto bg-primary/20" : null} ${
              pathname == url ? "bg-primary/20" : ""
            } flex items-center gap-3 rounded-[40px] px-5 py-3 text-lg font-semibold text-primary`}
          >
            <Icon className="h-7 w-7" />
            <div className={``}>{label}</div>
          </Link>
        ))}
      </aside>
    </>
  );
};
