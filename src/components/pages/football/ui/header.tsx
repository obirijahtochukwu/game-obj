import React, { useEffect, useState } from "react";
import { useFootballContext } from "../context";
import { debounce } from "@mui/material";
import { Icons } from "../../../ui/icons";
import { footballFixture } from "../../../../lib/types";
import { useClick } from "../../../../lib/hooks/useclick";

export default function Header() {
  const { searchInput, setSearchInput, searchResult, setSelectedLeagues, selectedLeagues } = useFootballContext();
  const { isOpen, setIsOpen, targetRef } = useClick.auto();

  const handleSelect = (isSelected, league) => {
    if (!isSelected) {
      setSelectedLeagues([...selectedLeagues, { name: league.name, country: league.country }]);
    } else {
      setSelectedLeagues(selectedLeagues.filter(({ name, country }) => name != league.name && country != league.country));
    }
    setIsOpen(false);
  };

  const handleRemove = (name: string, country: string) => {
    setSelectedLeagues(selectedLeagues.filter((league) => league.name != name && league.country != country));
  };

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
          placeholder="Search..."
        />
        <main
          className={`absolute left-0 top-full z-40 mt-4 flex w-full flex-col overflow-y-hidden bg-muted shadow-md duration-300 ${isOpen ? "h-60" : "h-0"}`}
        >
          <div className="dark-scrollbar my-auto h-56 overflow-y-auto">
            {searchResult().map(({ league }, idx) => {
              const isSelected = selectedLeagues.find(
                ({ country, name }) => league.name == name && league.country == country,
              )?.name;

              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(isSelected, league)}
                  className={`flex cursor-pointer items-center gap-4 py-2 pl-4 font-advance text-base duration-300 hover:bg-background`}
                >
                  <input type="checkbox" name="" id="" checked={isSelected ? true : false} onChange={(e) => {}} />
                  <div className="max-w-40 truncate">
                    {league?.name}
                    {`${isSelected}`}
                  </div>{" "}
                  <div className="h-1 w-1 rounded-full bg-grey" /> <div className="text-xs text-grey">{league.country}</div>
                </div>
              );
            })}
          </div>
        </main>
      </section>
      {selectedLeagues?.map(({ name, country }, idx) => (
        <div
          key={idx}
          onClick={() => handleRemove(name, country)}
          className="flex items-center gap-3 rounded-full border border-gray bg-muted px-3 py-1"
        >
          <div>
            <div className="max-w-32 truncate text-sm">{name}</div>
            <div className="text-xs text-grey">{country}</div>
          </div>
          <Icons.close color="#aeb9e1 " className="w-3 cursor-pointer" />
        </div>
      ))}
    </article>
  );
}
