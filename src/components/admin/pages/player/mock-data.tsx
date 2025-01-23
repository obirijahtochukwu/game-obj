import { formattedNumber } from "../../../../lib/utils/formattedNumber";
import { games } from "../games-sports/mock-data";

export const overview = (
  averageBet: number,
  totalProfit: number,
  totalPlays: number
) => [
  { title: "Total Bets Placed", value: totalPlays },
  { title: "Player Win Rate", value: `$${formattedNumber(totalProfit)}` },
  { title: "Average Bet Amount", value: `$${formattedNumber(averageBet)}` },
  { title: "Player balance", value: "$100k" },
];

const gameNames = games.map(({ name }) => `${name}`);

export const profit = {
  series: [
    {
      name: "series2",
      data: [100, 32, 45, 92, 65, 34, 52, 67, 80, 90],
      color: "#00C2FF",
    },
  ],

  options: {
    chart: {
      height: "100%",
      type: "area",
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
    fill: {
      type: "gradient", // Use gradient fill
      gradient: {
        shade: "light", // Shade type (light or dark)
        type: "vertical", // Gradient direction
        shadeIntensity: 0.5,
        gradientToColors: ["#575DFF", "#57C3FF"], // Ending colors for each series
        opacityFrom: 0.8, // Starting opacity
        opacityTo: 0.3, // Ending opacity
        stops: [0, 90, 100], // Gradient stops
      },
    },
    colors: ["#575DFF", "#57C3FF"], // Colors for each series
    xaxis: {
      type: "category",
      categories: gameNames,

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
      max: 100,
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
};
