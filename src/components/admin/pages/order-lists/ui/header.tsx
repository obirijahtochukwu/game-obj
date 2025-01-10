import React from "react";
import { Icons } from "../../../../ui/icons";
import Select from "./select";

export default function Header() {
  return (
    <section className="w-full h-12 bg-advance border-gray border rounded-md text-primary font-medium text-base capitalize max-w-4xl ">
      <main className="flex w-full h-full overflow-x-auto overflow-y-hidden custom-scrollbar">
        <div className="flex items-center justify-center h-full px-4 border-r border-gray">
          <Icons.filter />
        </div>
        <Select
          title="Filter By"
          disabled
          classname="px-4 border-r border-gray"
        />
        <Select title="Filter By" classname="px-4 border-r border-gray" />
        <Select title="14 Feb 2024" classname="px-4 border-r border-gray" />
        <Select title="Order Type" classname="px-4 border-r border-gray" />
        <Select title="Order Status" classname="px-4 border-r border-gray" />
        <div className="flex items-center h-full gap-2 text-[#FF3C66] whitespace-nowrap px-4">
          <Icons.reset /> Reset Filter
        </div>
      </main>
    </section>
  );
}
