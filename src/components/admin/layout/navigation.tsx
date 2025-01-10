import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function AdminNavigation({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <article className=" flex">
      <Sidebar />
      <div className="w-full px-7 pb-10">
        <Header />
        {children}
      </div>
    </article>
  );
}
