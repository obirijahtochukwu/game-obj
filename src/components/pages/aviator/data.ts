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
