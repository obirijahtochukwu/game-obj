import React, { useEffect, useState } from "react";
import Header from "./ui/header";
import Profit from "./ui/profit";
import Table from "./ui/table";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { backend_api } from "../../../../lib/constants";

export default function Player() {
  const pathname = useLocation().pathname.split("/").pop();
  const [userDetails, setuserDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backend_api}/admin/player/${pathname}`)
      .then((res) => {
        setuserDetails(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const props = { isLoading, userDetails };

  return (
    <article className="text-primary">
      <Header {...props} />
      <section className="text-primary grid grid-cols-12 gap-7 mt-7">
        <Profit {...props} />
        <Table {...props} />
      </section>
    </article>
  );
}
