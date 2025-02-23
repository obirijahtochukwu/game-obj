import React, { useEffect } from "react";
import Header from "./ui/header";
import Trending from "./ui/trending";
import Games from "./ui/games";
import Sports from "./ui/sports";
import axios from "axios";
import { backend_api } from "../../../lib/constants";

export default function Home() {
  useEffect(() => {
    axios
      .get(backend_api + "/get-ads")
      .then((res) => {
        // setAds(res.data);
        console.log(res.data);
      })
      .catch((res) => console.log(res));
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
