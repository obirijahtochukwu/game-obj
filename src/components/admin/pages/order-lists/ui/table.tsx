import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_api } from "../../../../../lib/constants";
import { formattedNumber } from "../../../../../lib/utils/formattedNumber";
import { useFormattedDate } from "../../../../../lib/hooks/useFormattedDate";
import CoinApproval from "../../../../ui/coin-approval";
import Order from "./order";
import SkeletonLoader from "../../../../ui/skeleton";
import { randomData } from "../../../../../lib/utils";
import usePagination from "../../../../../lib/hooks/usePagination";

export default function Table() {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios
      .get(backend_api + "/order-list")
      .then((res) => setOrders(res.data))
      .catch((res) => {});
  };

  const isNoOrder = orders.length < 1;
  const itemsPerPage = 5;
  const { PaginationWithDots, visisbleData } = usePagination({
    totalPages: Math.ceil(orders.length / itemsPerPage),
    data: orders,
    itemsPerPage,
  });

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="font-advance text-3xl font-semibold text-primary">All Orders</div>
        <PaginationWithDots />
      </section>
      <article
        className={`custom-scrollbar mt-7 w-full rounded-md border border-gray bg-advance ${isNoOrder ? "overflow-x-hidden" : "overflow-x-auto"}`}
      >
        <div className="flex h-10 w-fit min-w-full items-center justify-between gap-14 pr-7 text-sm font-medium text-white/80">
          <div className="bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6 pr-5">
            <div className="w-20">ID</div>
            <div className="w-32">NAME</div>
          </div>
          <div className="w-28">Email ADDRESS</div>
          <div className="w-24">DATE</div>
          <div className="w-16 text-center">Amount</div>
          <div className="w-24 text-center">Status</div>
        </div>

        {isNoOrder
          ? randomData(5).map(() => <SkeletonLoader height={"h-11"} />)
          : visisbleData?.map((props, idx) => <Order {...props} idx={idx} getOrders={getOrders} orders={orders} />)}
      </article>
    </>
  );
}
