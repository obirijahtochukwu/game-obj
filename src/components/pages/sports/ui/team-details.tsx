import React from "react";
import Modal from "../../../ui/modal";
import { useFormattedDate } from "../../../../lib/hooks/useFormattedDate";
import { Icons } from "../../../ui/icons";

export default function TeamDetails(props) {
  const { formattedDate } = useFormattedDate();
  const { team } = props;
  console.log(props);

  return (
    <Modal {...props} side={true} classname="!px-3">
      <article className="">
        <div className="py-1 px-2 rounded-lg bg-dark text-xs font-normal text-primary mx-auto w-fit mb-4">
          {team?.fixture?.date && formattedDate(team?.fixture?.date)}
        </div>
        <header className=" flex items-center justify-between bg-dark p-2 rounded-md">
          <div className="flex items-center gap-2 text-primary font-normal text-base">
            <img src={team.teams?.home?.logo} alt="" className="h-8 w-8" />{" "}
            {team.teams?.home?.name}
          </div>

          <div className="flex items-center gap-2 text-primary font-normal text-base">
            {team.teams?.away?.name}
            <img src={team.teams?.away?.logo} alt="" className="h-8 w-8" />
          </div>
        </header>
        <div className="p-2 pt-3 rounded-md bg-dark mt-0.5">
          <div className="grid grid-cols-3 text-sm font-medium text-primary mb-0.5">
            <div className=" text-left">{team.teams?.home?.name}</div>
            <div className=" text-center">HT</div>
            <div className=" text-right text-gray">(2x45 Min)FT</div>
          </div>
          <section className="grid grid-cols-6 pl-4 h-fit relative ">
            {["15", "30", "45", "60", "75", "90"].map((name) => (
              <div className="  flex items-end justify-end">
                <div className=" flex justify-center items-center flex-col text-xs font-normal text-gray">
                  <div className="h-20 border-r border-gray"></div>
                  <div className="">{name}'</div>
                </div>
              </div>
            ))}
            <div className=" absolute top-1/2 -translate-y-1/2 w-[calc(100%-19px)] left-2.5 h-[0.15px] bg-gray -mt-1"></div>

            <div className="absolute top-0 left-0 flex items-end justify-end">
              <div className=" flex justify-center items-center flex-col text-xs font-normal text-primary">
                <div className="h-20 border-r border-gray"></div>
                <div className="">RBL</div>
              </div>
            </div>
          </section>
        </div>
        <section className="mt-3.5 h-11 w-full rounded-md bg-dark px-4 py-2 flex items-center gap-2.5 text-primary">
          <Icons.search />
          <input
            type="text"
            className=" h-full w-full bg-transparent focus:outline-none border-l border-primary/20 text-sm font-normal tracking-tight pl-3"
            placeholder="Search..."
          />
        </section>
        <section className=" bg-advance backdrop-blur-md bg-primary/10 rounded-md mt-5">
          <div className="flex justify-between items-center h-10 px-4 text-base font-normal text-primary cursor-pointer">
            1x2 <Icons.arrow color="#ffffff" className="w-4 h-4 rotate-90" />
          </div>
          <div className="p-2 flex flex-col gap-3 border-t border-muted">
            {[
              { name: team.teams?.home?.name, odd: team.odd.values[0].odd },
              { name: "draw", odd: team.odd?.values[1].odd },
              { name: team.teams?.away?.name, odd: team.odd?.values[2].odd },
            ].map(({ name, odd }, idx) => (
              <div className=" flex items-center justify-between text-sm text-primary font-medium bg-dark p-2 rounded-sm capitalize tracking-wider">
                <div className="">{name}</div>
                <div className=" text-secondary">{odd}</div>
              </div>
            ))}
          </div>
        </section>
        <section className=" bg-advance backdrop-blur-md bg-primary/10 rounded-md mt-5">
          <div className="flex justify-between items-center h-10 px-4 text-base font-normal text-primary cursor-pointer">
            1x2 <Icons.arrow color="#ffffff" className="w-4 h-4 rotate-90" />
          </div>
          <div className="p-2 flex flex-col gap-3 border-t border-muted">
            {[
              { name: team.teams?.home?.name, odd: team.odd.values[0].odd },
              { name: team.teams?.away?.name, odd: team.odd.values[2].odd },
            ].map(({ name, odd }, idx) => (
              <div className=" flex items-center justify-between text-sm text-primary font-medium bg-dark p-2 rounded-sm capitalize tracking-wider">
                <div className="">{name}</div>
                <div className=" text-secondary">{odd}</div>
              </div>
            ))}
          </div>
        </section>{" "}
      </article>
    </Modal>
  );
}
