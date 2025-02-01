import { AdminData, topGames, totalProfit, userGrowth } from "../../../../lib/types";
import { getRequest } from "../../../../lib/utils/axios-helper";
import { formattedNumber } from "../../../../lib/utils/formattedNumber";
import { Icons } from "../../../ui/icons";

export const dashboard_intro = (page_views: number, monthly_users: number, new_signups: number, total_payouts: number) => [
  {
    title: "Pageviews",
    value: formattedNumber(page_views),
    percentage: "28.4%",
    Icon: Icons.view,
  },
  {
    title: "Monthly users",
    value: formattedNumber(monthly_users),
    percentage: "12.6%",
    Icon: Icons.user,
  },
  {
    title: "New sign ups",
    value: new_signups,
    percentage: "3.1%",
    Icon: Icons.add,
  },
  {
    title: "Total payout",
    value: `$${formattedNumber(total_payouts)}`,
    percentage: "11.3%",
    Icon: Icons.star,
  },
];

export const revenue_chart = (monthly_profit: totalProfit[]) => ({
  series: [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100, 80, 70, 90, 120, 150],
      color: "#CB3CFF",
    },
    {
      name: "Game",
      data: monthly_profit.map(({ profit }) => profit).concat(Array(12).fill(0).slice(0, -monthly_profit.length)),
      color: "#00C2FF",
    },
  ],

  options: {
    chart: {
      height: 350,
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
        stops: [0, 60, 100], // Gradient stops
      },
    },
    colors: ["#575DFF", "#57C3FF"], // Colors for each series
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],

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
      max: 1500,
      tickAmount: 5,
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

export const betting_activity_chart = (totalPlays: number, topGames: topGames[]) => ({
  series: topGames.map(({ count }) => count),
  options: {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        track: {
          // Add track options
          background: "#0B1739", // Set the background color for empty parts
        },
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: totalPlays,
            fontSize: "20px",
            paddingTop: "10px",
            color: "#fff",
            fontFamily: "quicksand",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            },
          },
        },
      },
    },
    colors: ["#CB3CFF", "#0E43FB", "#00C2FF"],
    labels: topGames.map(({ game }) => game),
  },
});

export const user_growth_chart = (user_growth: userGrowth[]) => ({
  series: [
    {
      name: "Registered users",
      data: user_growth?.map(({ userCount }) => userCount),
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

    colors: ["#575DFF", "#57C3FF"], // Colors for each series
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

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
      max: user_growth.length * 8,
      tickAmount: 4,
      labels: {
        show: true,
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
