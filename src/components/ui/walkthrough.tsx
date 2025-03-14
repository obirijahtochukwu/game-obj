// import { useSwap } from "@/lib/hooks/swap/useSwap";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { getStore, setStore } from "../../lib/utils/store";
import { useGlobalContext } from "../../lib/global-context";

export default function Walkthrough({
  id,
  containerStyle,
  title,
  content,
  introTip,
  setIntroTip,
  position,
  disableIntro,
  children,
}: {
  id: number;
  containerStyle?: string;
  title?: string;
  content: string;
  introTip: number;
  setIntroTip: React.Dispatch<number>;
  position?: string;
  disableIntro?: boolean;
  children: JSX.Element;
}) {
  const userEmail = useGlobalContext().user?.info.email;
  const adminEmail = useGlobalContext().admin.email;
  const email = userEmail || adminEmail;

  const targetRef = useRef(null);
  const currentPage = useLocation().pathname.slice(1, 20);
  const oldUser = getStore(adminEmail ? "admin" : currentPage);

  const page = (name: string) => {
    return currentPage == name ? true : false;
  };

  const totalCount = page("roullete")
    ? 3
    : page("plinko")
      ? 4
      : page("slot")
        ? 4
        : page("dice-roller")
          ? 3
          : page("aviator")
            ? 3
            : page("video-poker")
              ? 5
              : adminEmail
                ? 2
                : 10;

  const close = () => {
    setIntroTip(totalCount * 5);
    setStore(adminEmail ? "admin" : currentPage, "true");
  };

  // Smooth scrolling
  useEffect(() => {
    if (introTip == id) {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ top: 500, behavior: "smooth" });
        scroll;
      }
    }
    if (introTip > totalCount) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [introTip]);

  return (
    <>
      {introTip == id &&
        oldUser != "true" &&
        email &&
        !currentPage.includes("football") &&
        !currentPage.includes("basketball") && (
          <section
            className={`visible fixed left-0 top-0 z-20 h-screen w-screen bg-dark/50 opacity-100 duration-300 max-lg:hidden`}
          ></section>
        )}

      <article className={`${containerStyle} relative w-full`}>
        <header className={introTip == id && oldUser != "true" && email ? "relative z-30" : null}>{children}</header>
        {introTip == id && oldUser != "true" && email && !disableIntro && (
          <section
            className={`absolute z-40 h-fit w-80 flex-col gap-1 rounded-lg bg-gradient-custom p-3 font-advance max-lg:!hidden ${position == "top" ? "bottom-full mb-4" : position == "left" ? "right-full top-1/2 mr-6 -translate-y-1/2" : position == "bottom" ? "-right-5 top-full mt-4" : "left-full top-1/2 -translate-y-1/2"}`}
          >
            <div className={`${content && "mb-0.5 max-w-52"} text-sm font-bold tracking-wider text-white`}>
              {title} - {useLocation().pathname.slice(1, 20)}
            </div>
            <div className="text-xs font-normal tracking-wider text-white">{content}</div>
            <footer className="mt-3 flex items-center gap-1">
              {introTip != totalCount ? (
                <>
                  <div
                    onClick={() => setIntroTip(introTip + 1)}
                    className="text-walkthrough-muted cursor-pointer rounded-md bg-dark px-3 py-2 text-sm font-bold"
                  >
                    Next
                  </div>
                  <div onClick={close} className="text-dust cursor-pointer p-2 text-sm font-semibold">
                    Skip
                  </div>
                  <div className="ml-auto text-xs font-medium text-white">
                    {introTip}/{totalCount}
                  </div>
                </>
              ) : (
                <div
                  onClick={close}
                  className="text-walkthrough-muted cursor-pointer rounded-md bg-dark px-3 py-2 text-sm font-bold"
                >
                  Close
                </div>
              )}
            </footer>
            <aside
              className={`absolute inline-block w-5 overflow-hidden ${position == "top" ? "-bottom-6 left-1/2 -translate-x-1/2 -rotate-90" : position == "left" ? "left-full top-1/2 -translate-y-1/2 rotate-180" : position == "bottom" ? "-top-5 right-6 rotate-90" : "-left-4 top-1/2 -translate-y-1/2"}`}
            >
              <div className={`h-8 origin-top-right -rotate-45 transform ${position ? "bg-shinnyBlue" : "bg-pink"}`}></div>
            </aside>
            <div ref={targetRef} className="absolute bottom-full h-40 w-40" />
          </section>
        )}
      </article>
    </>
  );
}
