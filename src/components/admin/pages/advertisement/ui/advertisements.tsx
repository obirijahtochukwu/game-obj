import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_api } from "../../../../../lib/constants";
// import Order from "./order";
import SkeletonLoader from "../../../../ui/skeleton";
import { randomData } from "../../../../../lib/utils";
import usePagination from "../../../../../lib/hooks/usePagination";
import Advertisement from "./advertisement";
import { useDiasbleMouse } from "../../../../../lib/hooks/useDisableMouse";
// import Advertisement from "../page";

export default function Table() {
  const [advertisement, setAdvertisement] = useState([]);
  const { isMouseDisable, disableMouse, enableMouse } = useDiasbleMouse();

  const getAd = () => {
    axios
      .get(backend_api + "/get-ads")
      .then((res) => setAdvertisement(res.data))
      .catch((res) => {});
  };

  const isAdvertisement = advertisement.length < 1;
  const itemsPerPage = 7;
  const { PaginationWithDots, visisbleData } = usePagination({
    totalPages: Math.ceil(advertisement.length / itemsPerPage),
    data: advertisement,
    itemsPerPage,
  });

  useEffect(() => {
    getAd();
  }, [isMouseDisable]);

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="font-advance text-3xl font-semibold text-primary">Advertisement List</div>
        <PaginationWithDots />
      </section>
      <article
        className={`custom-scrollbar mt-7 min-h-96 w-full rounded-md border border-gray bg-advance ${isAdvertisement ? "overflow-x-hidden" : "overflow-x-auto"}`}
      >
        <div className="flex h-10 w-fit min-w-full items-center justify-between gap-14 border-b border-primary/15 pr-7 text-sm font-medium text-white/80">
          <div className="bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6 pr-5">
            <div className="w-10">Image</div>
            <div className="w-32">Title</div>
          </div>
          <div className="w-40">Description</div>
          <div className="w-24">DATE</div>
          <div className="w-32">Link</div>
          <div className="w-20 text-center">Actions</div>
        </div>
        {isAdvertisement
          ? randomData(7).map(() => <SkeletonLoader height={"h-11"} />)
          : visisbleData?.map((props, idx: number) => (
              <Advertisement
                {...props}
                idx={idx}
                isMouseDisable={isMouseDisable}
                disableMouse={disableMouse}
                enableMouse={enableMouse}
              />
            ))}
      </article>
    </>
  );
}
