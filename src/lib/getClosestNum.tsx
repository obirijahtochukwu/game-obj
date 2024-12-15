import React from "react";

export default function getClosestNum(data, targetNumber: number) {
  const numbers = data.map(
    ({ coin }) => document.getElementById(coin).getBoundingClientRect().top
  );

  const closestNumber = numbers.reduce((prev, curr) => {
    return Math.abs(curr - targetNumber) < Math.abs(prev - targetNumber)
      ? curr
      : prev;
  }, numbers[0]);

  const selectedCoin = data.find(
    ({ coin }) =>
      document.getElementById(coin).getBoundingClientRect().top == closestNumber
  );

  return selectedCoin;
}
