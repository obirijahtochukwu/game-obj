import { createBrowserRouter } from "react-router-dom";
import AdminNavigation from "../components/admin/layout/navigation";
import Users from "../components/admin/pages/users/page";
import Navigation from "../components/layout/navigation";
import Home from "../components/pages/home/page";
import OrderList from "../components/admin/pages/order-lists/page";
import Dashboard from "../components/admin/pages/dashboard/page";
import GamesSports from "../components/admin/pages/games-sports/page";
import Player from "../components/admin/pages/player/page";

export const admin_router = createBrowserRouter([
  {
    path: "/admin/users",
    element: (
      <AdminNavigation>
        <Users />
      </AdminNavigation>
    ),
  },
  {
    path: "/admin/order-list",
    element: (
      <AdminNavigation>
        <OrderList />
      </AdminNavigation>
    ),
  },
  {
    path: "/admin/reports",
    element: (
      <AdminNavigation>
        <Dashboard />
      </AdminNavigation>
    ),
  },
  {
    path: "/admin/games",
    element: (
      <AdminNavigation>
        <GamesSports />
      </AdminNavigation>
    ),
  },
  {
    path: "/admin/player",
    element: (
      <AdminNavigation>
        <Player />
      </AdminNavigation>
    ),
  },
]);
