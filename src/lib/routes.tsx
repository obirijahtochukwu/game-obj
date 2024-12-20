import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/home/page";
import Navigation from "../components/layout/navigation";
import Plinko from "../components/pages/plinko/page";
import Slot from "../components/pages/slot/page";
import Aviator from "../components/pages/aviator/page";
import DiceRoller from "../components/pages/dice-roller/page";
import Sports from "../components/pages/sports/page";
import Login from "../components/pages/login/page";

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
    path: "/login",
    element: <Login />,
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
  {
    path: "/slot",
    element: (
      <>
        <Navigation>
          <Slot />
        </Navigation>
      </>
    ),
  },
  {
    path: "/aviator",
    element: (
      <>
        <Navigation>
          <Aviator />
        </Navigation>
      </>
    ),
  },
  {
    path: "/dice-roller",
    element: (
      <>
        <Navigation>
          <DiceRoller />
        </Navigation>
      </>
    ),
  },
  {
    path: "/sports",
    element: (
      <>
        <Navigation>
          <Sports />
        </Navigation>
      </>
    ),
  },
]);
