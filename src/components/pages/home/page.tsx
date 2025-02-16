import React, { useEffect } from "react";
import Header from "./ui/header";
import Trending from "./ui/trending";
import Games from "./ui/games";
import Sports from "./ui/sports";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    axios
      .post("https://wholphintech.com/werp/main/server/bills/get_bills_list_based_on_filters.php", {
        date_start: " 2022-01-25",
        date_end: "2025-02-11",
        user_mobile: "919700707651",
        user_password: "123123",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <Games />
      <Sports />
      {/* <Trending /> */}
    </>
  );
}
