import { useEffect, useState } from "react";

export const useFormattedDate = () => {
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const options: any = {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate.replace(",", " |");
  };

  const extractDate = (dateString: string) => {
    const options = {
      year: "numeric",
      month: "short", // Changed to 'short' for short month names (e.g., 'Jan')
      day: "numeric",
    };
    const date = new Date(dateString);
    // @ts-ignore
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  return { formattedDate, extractDate };
};
