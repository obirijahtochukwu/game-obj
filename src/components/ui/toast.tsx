import React, { useEffect } from "react";
import { useGlobalContext } from "../../lib/global-context";

export default function Toast() {
  const { isBetLoading } = useGlobalContext();
  useEffect(() => {
    if (isBetLoading) {
      document.body.style.overflowY = "hidden";
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.pointerEvents = "auto";
    }
  }, [isBetLoading]);

  return (
    <div
      className={`${isBetLoading ? "translate-x-0 opacity-100" : "translate-x-96 opacity-0"} fixed right-5 top-10 z-50 flex h-max w-60 rounded-md bg-gradient-custom py-2 font-advance text-base font-semibold text-primary shadow-md backdrop-blur-2xl duration-300`}
    >
      <div className="scale-50">
        <div className="spinner"></div>
      </div>
      Please wait while we process your bet.
    </div>
  );
}
