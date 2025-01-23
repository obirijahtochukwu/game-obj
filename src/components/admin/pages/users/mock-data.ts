import { topPlayer, userGrowth } from "../../../../lib/types";
import { Icons } from "../../../ui/icons";

export const overview = (
  new_signups: number,
  user_growth: userGrowth[],
  topPlayers: topPlayer[],
  inactive_users: number
) => [
  {
    label: "Total Users",
    count: user_growth.reduce((acc, user) => acc + user.userCount, 0),
    color: "#CB3CFF",
    Icon: Icons.total_users,
  },
  {
    label: "New Users",
    count: new_signups,
    color: "#FDB52A",
    Icon: Icons.new_user,
  },
  {
    label: "Top Users",
    count: topPlayers.length,
    color: "#05C168",
    Icon: Icons.heart,
  },
  {
    label: "Inactive users",
    count: inactive_users,
    color: "#086CD9",
    Icon: Icons.other_users,
  },
];
