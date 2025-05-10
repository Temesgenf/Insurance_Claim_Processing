import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Claims Submitted",
      data: [30, 45, 60, 50, 70, 90, 100],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Claims Approved",
      data: [20, 35, 55, 40, 65, 80, 90],
      borderColor: "#22c55e",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Claims Rejected",
      data: [5, 8, 7, 10, 8, 6, 5],
      borderColor: "#ef4444",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const ClaimTrendsChart: React.FC = () => {
  return <Line data={data} options={options} />;
};

export default ClaimTrendsChart;
