import React, { useEffect, useState } from "react";
import Header from "./ui/header";
import Profit from "./ui/profit";
import Table from "./ui/table";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { backend_api } from "../../../../lib/constants";
import PageLoader from "../../../ui/page-loader";

export default function Player() {
  const pathname = useLocation().pathname.split("/").pop();
  const [userDetails, setuserDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backend_api}/admin/player/${pathname}`)
      .then((res) => {
        setuserDetails(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isLoading]);

  const props = { isLoading, userDetails };

  return (
    <article className="text-primary">
      {/* <PageLoader isLoading={isLoading} /> */}
      <Header {...props} />
      <section className="mt-7 grid grid-cols-12 gap-7 text-primary">
        <Profit {...props} />
        <Table {...props} />
      </section>
    </article>
  );
}
