import React from "react";
import { AppProvider, useFootballContext } from "./context";
import Fixtures from "./ui/fixtures";
import Header from "./ui/header";

export default function Football() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}

function Page() {
  const { PaginationWithDots } = useFootballContext();
  return (
    <div>
      <Header />
      <Fixtures />
      <footer className="mt-5 flex justify-end">
        <PaginationWithDots />
      </footer>
    </div>
  );
}
