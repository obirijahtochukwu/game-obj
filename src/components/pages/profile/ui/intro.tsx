import React, { useState } from "react";
import { useGlobalContext } from "../../../../lib/global-context";
import { Icons } from "../../../ui/icons";
import { infos, profile_infos } from "../mock-data";
import { useFormattedDate } from "../../../../lib/hooks/useFormattedDate";
import CoinRequest from "../../../ui/coin-request";

export default function Intro() {
  const { name, email, date_of_birth, createdAt, totalSession, averageBet, totalProfit, balance, totalLoss } =
    useGlobalContext().user.info;
  const [isOpen, setIsOpen] = useState(false);

  const { extractDate } = useFormattedDate();

  const props = { isOpen, setIsOpen };

  return (
    <>
      <CoinRequest {...props} />
      <section
        style={{
          backgroundImage: ` url("./media/profile/welcome.png")`,
        }}
        className="col-span-12 flex h-80 flex-col rounded-lg bg-cover bg-fixed bg-center bg-no-repeat p-5 sm:col-span-6 lg:col-span-4"
      >
        <div className="text-3xl font-bold">Welcome back</div>
        <div className="font-advance text-base">
          Nice to see you, <span className="capitalize">{name}</span>
        </div>
        <div
          style={{
            background: `linear-gradient(to right, #ffffff20, #ffffff)`,
          }}
          className="mt-3 h-0.5 w-full rounded-full"
        />
        <section className="my-3 flex h-full flex-col justify-between">
          {profile_infos(name, email, date_of_birth, totalSession, extractDate(createdAt)).map(({ label, value }, idx) => (
            <div className="font-advance text-sm font-medium text-grey">
              {label}: <span className="font-semibold text-primary">{value}</span>
            </div>
          ))}
        </section>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-auto flex w-fit items-center gap-2 rounded-sm bg-gradient-custom px-2 py-1 font-advance text-sm hover:underline"
        >
          Claim free tokens/coins <Icons.arrow color="#ffffff" className="h-3" />
        </button>
      </section>
      <section className="col-span-12 h-full rounded-xl bg-advance p-3 sm:col-span-6 lg:col-span-8 lg:p-5">
        <div className="font-advance text-xl font-bold">Betting Informations</div>
        <div className="font-advance text-base text-grey">Track your activity and stay on top of things.</div>

        <section className="mt-7 grid grid-cols-2 gap-3">
          {infos(averageBet, totalProfit, balance, totalLoss).map(({ title, value, Icon }, idx) => (
            <div
              key={idx}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.01)), url("./media/Background.png")`,
              }}
              className="flex h-20 items-center justify-between rounded-md !bg-dark p-3"
            >
              <div>
                <div className="font-advance text-sm text-grey">{title}</div>
                <div className="font-secondary text-lg font-bold lg:text-xl">{value || 0}</div>
              </div>
              <aside className="max-lg:hidden">
                {idx == 1 ? (
                  <Icon className="w-14" />
                ) : idx == 3 ? (
                  <Icon color={"#F07B7B"} className="w-14" />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gradient-custom text-primary">
                    {Icon && <Icon className="w-7" />}
                  </div>
                )}
              </aside>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
