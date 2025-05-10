import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "New Users",
      data: [10, 20, 15, 25, 30, 28, 35],
      backgroundColor: "#3b82f6",
    },
    {
      label: "Total Users",
      data: [60, 80, 95, 120, 150, 178, 213],
      backgroundColor: "#22c55e",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "User Growth Over Time",
    },
  },
};

const UserGrowthBarChart: React.FC = () => {
  return <Bar data={data} options={options} />;
};

export default UserGrowthBarChart;
