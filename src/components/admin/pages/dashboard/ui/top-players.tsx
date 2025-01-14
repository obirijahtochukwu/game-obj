import React from "react";

export default function TopPlayers() {
  return (
    <article className="col-span-5 min-h-64 p-5 bg-advance border-gray border rounded-md">
      <div className="text-base font-medium mb-8">Top players</div>
      {[0, 0, 0, 0].map((name, idx) => (
        <section
          key={idx}
          className="flex items-center gap-2 font-advance mt-5"
        >
          <img
            src="/media/admin/user.png"
            alt=""
            className="h-7 w-7 rounded-full"
          />
          <div>
            <div className=" text-sm font-medium">John Carter</div>
            <div className="text-xs font-medium text-grey truncate">
              contact@sophiemoore.com
            </div>
          </div>
          <div className="ml-auto text-sm font-medium">{idx + 1}0%</div>
        </section>
      ))}
    </article>
  );
}
