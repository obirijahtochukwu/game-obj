import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../ui/icons";
import { pages, tabs } from "./mock-data";
import { useClick } from "../../lib/hooks/useclick";
import { useGlobalContext } from "../../lib/global-context";
import Line from "../docs/ui/line";
import Logout from "../ui/logout";
import { useState } from "react";

export const Sidebar = ({ pathname }: { pathname: string }) => {
  const { isOpen, setIsOpen, targetRef }: any = useClick.auto();
  const { user, setIsLogin, setIsSignup } = useGlobalContext();
  const [isLogout, setIsLogout] = useState(false);
  const navigate = useNavigate();

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
        <main className="flex h-full flex-col gap-1 pb-10">
          {tabs(user?.info._id)?.map(({ label, Icon, pages, url }, id) => (
            <section key={id} className="group">
              <div
                onClick={() => {
                  navigate(url);
                  if (url) {
                    setIsOpen(false);
                  }
                }}
                className="flex cursor-pointer items-center gap-3 py-3"
              >
                <Icon className="w-5" />
                {label}
                {pages?.length > 0 && (
                  <Icons.arrow color="#aeb9e1 " className="ml-auto h-4 rotate-90 duration-500 group-hover:-rotate-90" />
                )}
              </div>
              <article
                className={`h-0 overflow-y-hidden duration-500 ${id == 1 ? "group-hover:h-56" : id == 2 ? "group-hover:h-52" : null}`}
              >
                <div className="mb-2 h-px w-full bg-line" />
                <section className={`flex flex-col gap-4 ${id == 1 ? "h-52" : id == 2 ? "48" : null}`}>
                  {pages?.map(({ label, Icon, url }, idx) => (
                    <Link
                      to={url}
                      key={idx}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 pl-3 font-advance text-sm capitalize tracking-wider"
                    >
                      <Icon className="h-5 w-5" /> {label}
                    </Link>
                  ))}
                </section>
              </article>
            </section>
          ))}
          {user.loggedIn == "true" ? (
            <Logout mobile isLogout={isLogout} setIsLogout={setIsLogout} />
          ) : (
            <section className="mt-auto">
              {" "}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setIsOpen(false);
                }}
                className="flex h-full w-fit items-center justify-center gap-2 rounded-xl px-4 text-base font-semibold text-primary max-md:h-11 md:text-xl"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setIsSignup(true);
                  setIsOpen(false);
                }}
                className="flex h-full w-fit items-center justify-center gap-2 rounded-md bg-white px-4 text-base font-semibold text-background max-md:h-11 md:text-xl"
              >
                Create account
              </button>
            </section>
          )}
        </main>
      </aside>
    </>
  );
};
