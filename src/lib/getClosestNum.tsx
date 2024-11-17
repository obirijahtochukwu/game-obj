import React from "react";

export default function getClosestNum(numbers: number[], targetNumber: number) {
  const closestNumber = numbers.reduce((prev, curr) => {
    return Math.abs(curr - targetNumber) < Math.abs(prev - targetNumber)
      ? curr
      : prev;
  }, numbers[0]);

  return closestNumber;
}
