import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import axios from "axios";
import { backend_api } from "../../../lib/constants";
import UniverseBackground from "../auth/anime";

export default function AdminNavigation({ children }: { children: JSX.Element }) {
  useEffect(() => {
    axios
      .get(backend_api + "/admin-data")
      .then((res) => {})
      .catch((res) => {});
  }, []);

  return (
    <article className="z-10 flex">
      <Sidebar />
      <UniverseBackground />
      <section className="grid w-full grid-cols-1">
        <div className="px-7 pb-10">
          <Header />
          {children}
        </div>
      </section>
    </article>
  );
}
