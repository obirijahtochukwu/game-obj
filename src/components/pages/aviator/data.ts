export const chartOptions = (isCrashed) => {
  return {
    chart: {
      id: "crash-chart",
      animations: {
        enabled: true,
        easing: "linear",
        speed: 100,
      },
      zoom: { enabled: false },
    },
    xaxis: {
      type: "numeric",
      categories: [0, 4, 8, 12, 16, 20], // Custom ticks for the x-axis
      tickAmount: 5, // Matches the number of categories
      labels: {
        formatter: (val) => `${val}s`, // Add "s" for seconds
        show: true,
        style: {
          colors: "#fff",
          fontSize: "16px",
          fontWeight: "600",
        },
      },
      title: { text: "Time (s)" },
    },
    grid: {
      show: false,
    },
    yaxis: {
      categories: [1.0, 1.4, 1.9, 2.3, 2.7, 3.1, 3.5], // Custom ticks for the y-axis
      tickAmount: 6, // Matches the number of categories
      labels: {
        formatter: (val) => `${val.toFixed(1)}x`, // Add "x" for multiplier
        show: true,
        style: {
          colors: "#fff",
          fontSize: "16px",
          fontWeight: "600",
        },
      },
      min: 1.0, // Start y-axis at 1.0
      max: 3.5, // End y-axis at 3.5
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 5,
    },
    markers: { size: 0 },
    colors: [isCrashed ? "#FF4560" : "#00E396"],
    tooltip: { enabled: false },
  };
};

export const chartSeries = (graphData) => [
  {
    name: "Multiplier",
    data: graphData,
  },
];

export const users = [
  { name: "Manpreet B", multiplier: "1.45x", balance: "2.793743 SOL" },
  { name: "Talsiman T", multiplier: "", balance: "1.793743 SOL" },
  { name: "Harsh T", multiplier: "1.95x", balance: "1.763745 SOL" },
  { name: "Jeamin V", multiplier: "1.85x", balance: "0.793743 SOL" },
  { name: "Demain D", multiplier: "2.45x", balance: "4.793743 SOL" },
  { name: "Foxx T", multiplier: "", balance: "4.793743 SOL" },
];
