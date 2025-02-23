import React from "react";
import { Icons } from "./icons";
import { useGlobalContext } from "../../lib/global-context";

export default function Balance() {
  const { balance } = useGlobalContext().user?.info;

  return (
    <section>
      {balance && (
        <>
          <div className="text-base font-medium text-primary">Remaining Balance</div>
          <div className="mt-2 flex h-12 w-full items-center gap-3 rounded-md border border-gray bg-muted px-4">
            <Icons.debit_card className="h-5 w-5 text-grey" />
            <div className="flex h-full items-center border-l border-gray pl-3 font-advance text-base">
              ${balance.toLocaleString()}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
