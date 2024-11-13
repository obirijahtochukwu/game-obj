import { MULTIPLIERS, outcomes } from "./outcomes";

const TOTAL_DROPS = 16;

export const predict = () => {
  let outcome = 0;
  const pattern = [];
  for (let i = 0; i < TOTAL_DROPS; i++) {
    if (Math.random() > 0.5) {
      pattern.push("R");
      outcome++;
    } else {
      pattern.push("L");
    }
  }

  const multiplier = MULTIPLIERS[outcome];
  const possiblieOutcomes = outcomes[outcome];

  return {
    point:
      possiblieOutcomes[
        Math.floor(Math.random() * possiblieOutcomes.length || 0)
      ],
    multiplier,
    pattern,
  };
};
