import React, { useState } from "react";
import { Icons } from "../../../ui/icons";
import { useClick } from "../../../../lib/hooks/useclick";
import { useBasketballContext } from "../context";
import { Country, GameData, League } from "../types";

export default function Header() {
  const { isOpen, setIsOpen, targetRef } = useClick.auto();
  const {
    searchInput,
    setSearchInput,
    searchResult,
    selectedLeagues,
    setSelectedLeagues,
    selectedLeagueFilter,
    setSelectedLeagueFilter,
  } = useBasketballContext();

  const handleSelect = (prop: { league: League; country: Country }) => {
    console.log(selectedLeagueFilter);

    const isLeagueSelected = selectedLeagues?.find(({ league }) => league?.id == prop?.league?.id);
    if (!isLeagueSelected?.league.name) {
      setSelectedLeagues([...selectedLeagues, prop]);
    }
    setSelectedLeagueFilter([...selectedLeagueFilter, prop]);
    setIsOpen(false);
  };

  const handleRemove = (id: number) => {
    setSelectedLeagueFilter(selectedLeagueFilter.filter(({ league }) => league.id != id));
  };

  console.log(selectedLeagues[selectedLeagues.length - 1]?.league.id);

  return (
    <article className="flex flex-wrap items-center gap-3">
      <section
        ref={targetRef}
        className="relative flex h-11 w-full items-center gap-2.5 rounded-md border border-muted bg-advance px-4 text-primary backdrop-blur-md sm:w-80"
      >
        <Icons.search />
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            // handleSearch(e.target.value);
          }}
          onClick={() => setIsOpen(true)}
          type="text"
          className="h-full w-full bg-transparent font-advance text-lg font-normal tracking-tight focus:outline-none"
          placeholder="Search league & country"
        />
        <main
          className={`absolute left-0 top-full z-40 mt-2 flex w-full flex-col overflow-y-hidden bg-muted shadow-md duration-300 ${isOpen ? `${searchResult().length ? "h-60" : "h-10"}` : "h-0"}`}
        >
          <div className="dark-scrollbar my-auto h-56 overflow-y-auto">
            {searchResult().length ? (
              searchResult()?.map(({ league, country }, idx) => {
                const isSelected = selectedLeagueFilter.find((props: any) => props.league.name == league.name);
                if (!isSelected) {
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelect({ league, country })}
                      className={`flex cursor-pointer items-center gap-4 py-2 pl-4 font-advance text-sm duration-300 hover:bg-background`}
                    >
                      <input type="checkbox" name="" id="" checked={isSelected ? true : false} onChange={(e) => {}} />
                      {league.name}
                      <div className="h-1 w-1 rounded-full bg-grey" /> <div className="text-xs text-grey">{country.name}</div>
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <section className="mt-2 text-center font-advance text-base text-primary">No matching result!</section>
            )}
          </div>
        </main>
      </section>
      {selectedLeagueFilter?.map((prop: any, idx) => (
        <div key={idx} className="flex items-center gap-3 rounded-xl border border-gray bg-muted px-3 py-1">
          <div>
            <div className="max-w-32 truncate text-xs">{prop.league.name}</div>
            <div className="text-xs text-grey">{prop.country.name}</div>
          </div>
          <Icons.close onClick={() => handleRemove(prop.league.id)} color="#aeb9e1 " className="w-3 cursor-pointer" />
        </div>
      ))}
    </article>
  );
}
