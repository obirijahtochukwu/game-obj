import { gameHistory } from "../types";

export const filteredAndPublicGameHistory = (
  data: gameHistory[],
  labels: string[]
) =>
  data
    .map((item) => ({ ...item, public: "all bets" }))
    .filter((item) => {
      return labels.every((label: string) =>
        Object.values(item).some((value) => value == label)
      );
    });
