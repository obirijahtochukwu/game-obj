import { formattedNumber } from "../../../../lib/utils/formattedNumber";

export const overview = (
  total_payouts: number,
  average_bet_size: number,
  players_win_rate: number,
  total_players_session: number
) => [
  { title: "Total profit", value: `$${formattedNumber(total_payouts)}` },
  { title: "Average Bet Size", value: `$${formattedNumber(average_bet_size)}` },
  { title: "Player Win Rate", value: `${formattedNumber(players_win_rate)}%` },
  {
    title: "Total player sessions",
    value: `${formattedNumber(total_players_session)}`,
  },
];

export const games = [
  { name: "Plinko" },
  { name: "blackjack" },
  { name: "aviator" },
  { name: "dice roller" },
  { name: "slot" },
  { name: "roullete" },
  { name: "video poker" },
  { name: "basketball" },
  { name: "football" },
  { name: "baseball" },
  { name: "tennis" },
];
