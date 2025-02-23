import { formattedNumber } from "../../../../lib/utils/formattedNumber";
import { games } from "../games-sports/mock-data";

export const overview = (averageBet: number, totalProfit: number, totalPlays: number, balance: number, isLoading: boolean) => [
  { title: "Total Bets Placed", value: isLoading ? null : totalPlays },
  { title: "Total payout", value: isLoading ? null : `$${formattedNumber(totalProfit)}` },
  { title: "Average Bet Amount", value: `$${formattedNumber(averageBet)}` },
  { title: "Player balance", value: isLoading ? null : `$${formattedNumber(balance)}` },
];

export const profit = (games: any) => ({
  series: [
    {
      name: "Profit",
      data: games?.map(({ profit }) => profit),
      color: "#00C2FF",
    },
  ],

  options: {
    chart: {
      height: "100%",
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    colors: ["#575DFF", "#57C3FF"], // Colors for each series
    xaxis: {
      type: "category",
      categories: games?.map(({ game }) => game),

      labels: {
        show: true,
        style: {
          colors: "#ffffff80",
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "quicksand",
        },
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
      min: 0,
      max: 1000,
      tickAmount: 4,
      labels: {
        show: true,
        formatter: function (val) {
          return val.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          });
        },
        style: {
          colors: "#ffffff80",
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "quicksand",
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        backgroundColor: "#fff",
        fontFamily: "quicksand",
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    legend: {
      show: false,
    },
  },
});
