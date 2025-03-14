import { createBrowserRouter } from "react-router-dom";
import AdminNavigation from "../components/admin/layout/navigation";
import Users from "../components/admin/pages/users/page";
import Navigation from "../components/admin/layout/navigation";
import OrderList from "../components/admin/pages/order-lists/page";
import Dashboard from "../components/admin/pages/dashboard/page";
import GamesSports from "../components/admin/pages/games-sports/page";
import Player from "../components/admin/pages/player/page";
import Login from "../components/admin/auth/login";
import Advertisement from "../components/admin/pages/advertisement/page";

export const admin_router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminNavigation>
        <Dashboard />
      </AdminNavigation>
    ),
  },
  {
    path: "/users",
    element: (
      <AdminNavigation>
        <Users />
      </AdminNavigation>
    ),
  },
  {
    path: "/order-list",
    element: (
      <AdminNavigation>
        <OrderList />
      </AdminNavigation>
    ),
  },
  {
    path: "/reports",
    element: (
      <AdminNavigation>
        <Dashboard />
      </AdminNavigation>
    ),
  },
  {
    path: "/games",
    element: (
      <AdminNavigation>
        <GamesSports />
      </AdminNavigation>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <AdminNavigation>
        <Player />
      </AdminNavigation>
    ),
  },
  {
    path: "/advertisement",
    element: (
      <AdminNavigation>
        <Advertisement />
      </AdminNavigation>
    ),
  },
]);
