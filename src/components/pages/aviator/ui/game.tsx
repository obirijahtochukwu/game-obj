import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { chartOptions, chartSeries } from "../data";
import { useGlobalContext } from "../context";

export default function Game() {
  const {
    balance,
    multiplier,
    isCrashed,
    graphData,
    userCashout,
    betAmount,
    isRunning,
    cashOut,
  } = useGlobalContext();

  return (
    <div className="w-full my-10 h-80 sm:h-96">
      <ApexCharts
        // @ts-ignore
        options={chartOptions(isCrashed)}
        series={chartSeries(graphData)}
        type="line"
        height={"120%"}
      />
    </div>
  );
}
