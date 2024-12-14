import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  // Sample data for the chart
  const data = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        label: "Tasks",
        data: [55, 30, 15], // Values for the chart
        backgroundColor: [
          "#10b981", // Green
          "#f87171", // Red
          "#fbbf24", // Yellow
        ],
        hoverBackgroundColor: [
          "#059669", // Darker Green
          "#dc2626", // Darker Red
          "#d97706", // Darker Yellow
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#4b5563", // Text color (gray-700)
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`, // Format label
        },
      },
    },
  };

  return (
    <div className="flex justify-center bg-slate-400">
      <div className="h-screen">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DonutChart;
