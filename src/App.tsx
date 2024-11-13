import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes";

function App() {
  return (
    <article className=" font-primary">
      <RouterProvider router={router} />
    </article>
  );
}

export default App;
