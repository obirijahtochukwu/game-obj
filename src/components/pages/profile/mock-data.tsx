import { formattedNumber } from "../../../lib/utils/formattedNumber";
import { Icons } from "../../ui/icons";

export const infos = (averageBet: number, totalProfit: number, balance: number, totalLoss: number) => [
  // { title: "Total Bets Placed", value: "", Icon: Icons.total_bets },
  { title: "Average Bet Amount", value: `$${formattedNumber(averageBet)}`, Icon: Icons.average },
  { title: "Total Profit", value: `$${formattedNumber(totalProfit)}`, Icon: Icons.win_rate },
  { title: "Balance", value: `$${formattedNumber(balance)}`, Icon: Icons.balance },
  { title: "Total Loss", value: `$${formattedNumber(totalLoss)}`, Icon: Icons.loss_rate },
];

export const profile_infos = (name: string, email: string, date_of_birth: string, totalSession: string, createdAt: string) => [
  { label: "Full Name", value: name },
  { label: "Email", value: email },
  { label: "Date of birth", value: date_of_birth },
  { label: "Total Session", value: totalSession + "x" },
  { label: "Joined on", value: createdAt },
];
