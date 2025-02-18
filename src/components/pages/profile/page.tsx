import React from "react";
import Intro from "./ui/intro";
import Table from "./ui/table";
import { useGlobalContext } from "../../../lib/global-context";
import { Icons } from "../../ui/icons";
import EditProfile from "./ui/edit-profile";
import { getImagePath } from "../../../lib/utils";

export default function Profile() {
  const { name, email, profileImage } = useGlobalContext().user.info;

  return (
    <article className="grid grid-cols-12 gap-5">
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, .5)), url("./media/Background.png")`,
        }}
        className="col-span-12 flex h-24 items-center rounded-xl bg-sm px-4"
      >
        <div className="flex items-center">
          <img src={getImagePath(profileImage)} alt="" className="mr-2 h-12 w-12 rounded-md" />
          <div>
            <div className="font-secondary text-lg capitalize leading-none">{name}</div>
            <div className="font-advance text-xs text-grey">{email}</div>
          </div>
        </div>
        <EditProfile />
      </div>
      <Intro />
      <Table />
    </article>
  );
}
