import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/home/page";
import Navigation from "../components/layout/navigation";
import Plinko from "../components/pages/plinko/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navigation>
          <Home />
        </Navigation>
      </>
    ),
  },
  {
    path: "/plinko",
    element: (
      <>
        <Navigation>
          <Plinko />
        </Navigation>
      </>
    ),
  },
]);
