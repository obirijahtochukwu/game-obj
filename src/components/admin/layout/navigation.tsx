import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import axios from "axios";
import { backend_api } from "../../../lib/constants";

export default function AdminNavigation({
  children,
}: {
  children: JSX.Element;
}) {
  useEffect(() => {
    axios
      .get(backend_api + "/admin-data")
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  }, []);

  return (
    <article
      // style={{ display: "grid", gridTemplateColumns: "288px auto" }}
      className=" flex"
    >
      <Sidebar />
      <section className="w-full grid grid-cols-1">
        <div className="px-7 pb-10">
          <Header />
          {children}
        </div>
      </section>
    </article>
  );
}
