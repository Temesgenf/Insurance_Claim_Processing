import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Approved", "Pending", "Rejected"],
  datasets: [
    {
      label: "Claims",
      data: [200, 15, 15],
      backgroundColor: [
        "#22c55e",
        "#facc15",
        "#ef4444"
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const ClaimStatusPieChart: React.FC = () => {
  return <Pie data={data} options={options} />;
};

export default ClaimStatusPieChart;
