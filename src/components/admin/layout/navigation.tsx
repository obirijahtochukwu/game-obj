import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function AdminNavigation({
  children,
}: {
  children: JSX.Element;
}) {
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
