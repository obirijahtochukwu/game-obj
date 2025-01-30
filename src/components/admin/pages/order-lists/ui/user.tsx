import React, { useState } from "react";
import { formattedNumber } from "../../../../../lib/utils/formattedNumber";
import { useFormattedDate } from "../../../../../lib/hooks/useFormattedDate";
import CoinApproval from "../../../../ui/coin-approval";

export default function User({ idx, _id, name, amount, email, createdAt, status, getOrders, userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const { formattedDate } = useFormattedDate();
  const props = { isOpen, setIsOpen };

  return (
    <>
      <CoinApproval {...props} _id={_id} getOrders={getOrders} userId={userId} />

      <div className="flex h-12 w-fit min-w-full items-center justify-between gap-14 pr-7 font-advance text-sm font-medium text-white even:bg-dark">
        <div
          className={`bg-Red sticky left-0 top-0 flex w-fit items-center justify-between gap-14 rounded-lg bg-advance pl-6 pr-5 ${
            idx % 2 == 0 && "bg-dark"
          }`}
        >
          <div className="w-20 truncate">{_id}</div>
          <div className="w-32">{name || "--------"}</div>
        </div>
        <div className="w-28 truncate">{email}</div>
        <div className="w-24">{formattedDate(createdAt)}</div>
        <div className="w-16 text-center">${formattedNumber(amount)}</div>
        <div
          title="click to approve"
          onClick={() => setIsOpen(true)}
          className={`${status == "processing" ? "bg-secondary/20 text-secondary" : "bg-success/15 text-success"} flex w-24 cursor-pointer items-center justify-center gap-1 rounded-sm py-0.5 capitalize`}
        >
          {status}
        </div>
      </div>
    </>
  );
}
