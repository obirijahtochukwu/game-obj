import anime from "animejs";
import React from "react";
import { useEffect } from "react";

const Wheel = (): JSX.Element => {
  return (
    <div className={"roulette-wheel"}>
      <div
        className={"layer-2 wheel"}
        style={{ transform: "rotate(0deg)" }}
      ></div>
      <div className={"layer-3"}></div>
      <div
        className={"layer-4 wheel"}
        style={{ transform: "rotate(0deg)" }}
      ></div>
      <div className={"layer-5"}></div>
      <div className={"ball-container"} style={{ transform: "rotate(0deg)" }}>
        <div
          className={"ball"}
          style={{ transform: "translate(0, -163.221px)" }}
        ></div>
      </div>
      {/* <svg width="380" height="380">
        <circle cx="190" cy="190" r="190" style={{touch-action: 'none'}}></circle>
      </svg> */}
    </div>
  );
};

export default Wheel;
