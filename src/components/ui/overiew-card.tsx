import { Icons } from "./icons";
import SkeletonLoader from "./skeleton";

export const OverviewCard = ({ title, value, isLoading }: { title: string; value: string; isLoading?: boolean }) => (
  <div className="rounded-md border border-gray bg-advance p-5 py-4">
    <div className="flex items-center gap-1 text-sm font-normal capitalize text-grey">
      <div>
        <Icons.star />
      </div>
      {title} <Icons.dot_bar className="ml-auto rotate-90" />
    </div>
    <div className="flex items-center">
      {isLoading ? <SkeletonLoader height="h-5 mt-2" /> : <div className="font-advance text-2xl font-semibold">{value}</div>}
    </div>
  </div>
);
