import React, { useEffect } from "react";
import FixtureLoader from "../../../ui/fixture-loader";
import { useBasketballContext } from "../context";
import NoActivity from "../../../ui/no-activity";
import { toPercentage } from "../../../../lib/constants";
import Tag from "../../football/ui/tag";
import usePagination from "../../../../lib/hooks/usePagination";
import { Icons } from "../../../ui/icons";
import { GameData } from "../types";
import Game from "./game";
// import { Game } from "../types";

export default function Games() {
  const { isLoading, games, selectedLeagueFilter } = useBasketballContext();

  const fixtures = games.filter((prop) => selectedLeagueFilter.some(({ league }) => league.name == prop.league.name));
  console.log(games);

  const itemsPerPage = 6;
  const { PaginationWithDots, visisbleData, setCurrentPage } = usePagination({
    totalPages: Math.ceil(fixtures.length / itemsPerPage),
    data: fixtures,
    itemsPerPage,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLeagueFilter.length]);

  return (
    <>
      <section className="mt-10 grid grid-cols-1 gap-6 max-sm:mx-auto max-sm:max-w-md sm:grid-cols-2 xl:grid-cols-3">
        {isLoading ? <FixtureLoader /> : visisbleData?.map((prop: GameData, idx: number) => <Game {...prop} />)}
      </section>
      <div className="mt-5 flex justify-end">
        <PaginationWithDots />
      </div>
    </>
  );
}
