import React from "react";
import Header from "./ui/header";
import Trending from "./ui/trending";
import Games from "./ui/games";
import Sports from "./ui/sports";

export default function Home() {
  return (
    <>
      <Header />
      <Games />
      <Sports />
      {/* <Trending /> */}
    </>
  );
}
