import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/home/page";
import Navigation from "../components/layout/navigation";
import Plinko from "../components/pages/plinko/page";
import Slot from "../components/pages/slot/page";
import Aviator from "../components/pages/aviator/page";
import DiceRoller from "../components/pages/dice-roller/page";
import Sports from "../components/pages/sports/page";
import Login from "../components/pages/login/page";
import Blackjack from "../components/pages/blackjack/page";
import Roullete from "../components/pages/roullete/page";
import VideoPoker from "../components/pages/video-poker/page";
import AdminNavigation from "../components/layout/navigation";
import Profile from "../components/pages/profile/page";
import Documentation from "../components/docs/page";
import BackendDocumentation from "../components/docs/backend/page";
import Football from "../components/pages/football/page";
import Basketball from "../components/pages/basketball/page";

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
    path: "/profile/:id",
    element: (
      <>
        <Navigation>
          <Profile />
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
    path: "/blackjack",
    element: (
      <>
        <Navigation>
          <Blackjack />
        </Navigation>
      </>
    ),
  },
  {
    path: "/roullete",
    element: (
      <>
        <Navigation>
          <Roullete />
        </Navigation>
      </>
    ),
  },
  {
    path: "/video-poker",
    element: (
      <>
        <Navigation>
          <VideoPoker />
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
  {
    path: "/football",
    element: (
      <>
        <Navigation>
          <Football />
        </Navigation>
      </>
    ),
  },
  {
    path: "/basketball",
    element: (
      <>
        <Navigation>
          <Basketball />
        </Navigation>
      </>
    ),
  },
  {
    path: "/docs/frontend",
    element: <Documentation />,
  },
  {
    path: "/docs/backend",
    element: <BackendDocumentation />,
  },
]);
