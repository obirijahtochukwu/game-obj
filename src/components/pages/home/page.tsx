import React, { useEffect, useState } from "react";
import Header from "./ui/header";
import Games from "./ui/games";
import Sports from "./ui/sports";
import axios from "axios";
import { backend_api } from "../../../lib/constants";

export default function Home() {
  const [stats, setStats] = useState([]);

  const activePlayers = (label: string) =>
    stats?.find(({ game }) => label.toLowerCase().includes(game.toLowerCase()))?.activePlayers || 0;

  useEffect(() => {
    axios
      .get(backend_api + "/game-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  const props = { activePlayers };

  return (
    <>
      <Header />
      <Games {...props} />
      <Sports {...props} />
      {/* <Trending /> */}
    </>
  );
}
