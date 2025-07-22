import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ClaimStatusPieChart: React.FC = () => {
  const data = useMemo(() => ({
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [{
      label: "Claims",
      data: [200, 15, 15],
      backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      borderWidth: 1,
    }],
  }), []);

  const options = useMemo(() => ({
    responsive: true,
    plugins: { legend: { position: "bottom" as const } },
  }), []);

  return <Pie data={data} options={options} />;
};

export default React.memo(ClaimStatusPieChart);
