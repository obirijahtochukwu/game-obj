import React, { useEffect, useState } from "react";
import Header from "./ui/header";
import Profit from "./ui/profit";
import Table from "./ui/table";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { backend_api } from "../../../../lib/constants";

export default function Player() {
  const pathname = useLocation().pathname;
  console.log(pathname.split("/").pop());
  const [userDetails, setuserDetails] = useState<any>({});

  useEffect(() => {
    axios
      .get(`${backend_api}/admin/player`)
      .then((res) => setuserDetails(res.data))
      .catch((res) => console.log(res));
  }, []);

  return (
    <article className="text-primary">
      <Header userDetails={userDetails} />
      <section className="text-primary grid grid-cols-12 gap-7 mt-7">
        <Profit />
        <Table userDetails={userDetails} />
      </section>
    </article>
  );
}
