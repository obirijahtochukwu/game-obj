import React from "react";

export default function formatDateToTime(time: string) {
  const date = new Date(time);
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${period}`;
}
