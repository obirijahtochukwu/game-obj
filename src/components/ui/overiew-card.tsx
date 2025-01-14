import { Icons } from "./icons";

export const OverviewCard = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <div className="bg-advance border border-gray rounded-md p-5 py-4">
    <div className="flex gap-1 items-center text-grey text-sm font-normal capitalize">
      <div>
        {" "}
        <Icons.star />
      </div>{" "}
      {title} <Icons.dot_bar className=" ml-auto rotate-90" />
    </div>
    <div className="flex items-center">
      <div className="text-2xl font-semibold font-advance">{value}</div>
    </div>
  </div>
);
