import React, { useMemo } from "react";
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

interface Claim {
  claimId: number;
  status: string;
  createdAt: string;
  // other claim properties...
}

interface ClaimTrendsChartProps {
  claims: Claim[];
}

const ClaimTrendsChart: React.FC<ClaimTrendsChartProps> = ({ claims }) => {
  // Memoize expensive data processing
  const processedData = useMemo(() => {
    const dailyData: Record<string, { submitted: number; approved: number; rejected: number }> = {};
    const daysSet = new Set<string>();
    
    claims.forEach(claim => {
      const date = new Date(claim.createdAt);
      const dayMonthYear = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      daysSet.add(dayMonthYear);
      
      if (!dailyData[dayMonthYear]) {
        dailyData[dayMonthYear] = { submitted: 0, approved: 0, rejected: 0 };
      }
      
      dailyData[dayMonthYear].submitted += 1;
      
      if (claim.status === 'approved') {
        dailyData[dayMonthYear].approved += 1;
      } else if (claim.status === 'rejected') {
        dailyData[dayMonthYear].rejected += 1;
      }
    });
    
    const sortedDays = Array.from(daysSet).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    
    return {
      labels: sortedDays,
      submittedData: sortedDays.map(day => dailyData[day]?.submitted || 0),
      approvedData: sortedDays.map(day => dailyData[day]?.approved || 0),
      rejectedData: sortedDays.map(day => dailyData[day]?.rejected || 0),
    };
  }, [claims]);

  // Memoize chart data
  const data = useMemo(() => ({
    labels: processedData.labels,
    datasets: [
      {
        label: "Claims Submitted",
        data: processedData.submittedData,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Claims Approved",
        data: processedData.approvedData,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Claims Rejected",
        data: processedData.rejectedData,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }), [processedData]);

  // Memoize chart options
  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Claims" },
      },
      x: {
        title: { display: true, text: "Month" },
      },
    },
  }), []);

  return <Line data={data} options={options} />;
};

export default React.memo(ClaimTrendsChart);