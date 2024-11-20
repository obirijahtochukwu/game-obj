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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-800 text-white">
      <p className="mt-auto">Balance: ${balance.toFixed(2)}</p>
      <p>Current Multiplier: {isCrashed ? "CRASHED" : `${multiplier}x`}</p>

      <div className="w-full mb-10 h-96">
        <ApexCharts
          // @ts-ignore
          options={chartOptions(isCrashed)}
          series={chartSeries(graphData)}
          type="line"
          // height={300}
        />
      </div>

      {/* {!isRunning ? (
        <></>
      ) : (
        <button
          onClick={cashOut}
          className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500"
          // disabled={isCrashed}
        >
          Cash Out
        </button>
      )} */}

      {/* {isCrashed && userCashout === null && (
        <p className="text-red-500 mt-4">Game Over. You lost ${betAmount}.</p>
      )}
      {userCashout && (
        <p className="text-green-500 mt-4">
          You cashed out at {multiplier}x! New balance: ${balance.toFixed(2)}
        </p>
      )} */}
    </div>
  );
}
