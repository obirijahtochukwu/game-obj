import { Link } from "react-router-dom";
import { Icons } from "../ui/icons";
import { pages } from "./mock-data";
import { useClick } from "../../lib/hooks/useclick";

export const Sidebar = ({ pathname }) => {
  const { isOpen, setIsOpen, targetRef } = useClick.auto();

  return (
    <>
      <Icons.bar
        onClick={() => setIsOpen(true)}
        className=" w-6 cursor-pointer sm:hidden"
      />
      <aside
        ref={targetRef}
        className={`${
          isOpen ? " translate-x-0" : " -translate-x-[700px]"
        } fixed top-0 left-0 h-full w-full z-50 bg-dark/50 backdrop-blur-lg pt-14 px-4 flex flex-col border-r border-primary/20 duration-300 sm:hidden`}
      >
        <Icons.close
          onClick={() => setIsOpen(false)}
          className=" absolute top-4 right-4 w-4 cursor-pointer"
        />
        <section className=" h-11 w-full rounded-md bg-primary/10 backdrop-blur-md border border-muted px-4 py-2 flex items-center gap-2.5 text-primary">
          <Icons.search />
          <input
            type="text"
            className=" h-full w-full bg-transparent focus:outline-none border-l border-primary/20 text-lg font-normal tracking-tight pl-3"
            placeholder="Search..."
          />
        </section>
        {pages.map(({ label, Icon, url }, idx) => (
          <Link
            to={url}
            key={idx}
            onClick={() => setIsOpen(false)}
            className={`${
              idx == 0
                ? "mt-10"
                : idx == 3
                ? "mt-auto mb-10 bg-primary/20"
                : null
            } ${
              pathname == url ? "bg-primary/20" : ""
            } flex items-center gap-3 px-5 py-3 rounded-[40px] text-primary text-lg font-semibold`}
          >
            <Icon className="h-7 w-7" />
            <div className={``}>{label}</div>
          </Link>
        ))}
      </aside>
    </>
  );
};
