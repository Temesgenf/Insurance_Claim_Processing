import React from "react";
import AdminSidebar from "../components/layout/AdminSidebar";
import ClaimTrendsChart from "../components/layout/ClaimTrendsChart";
import ClaimStatusPieChart from "../components/layout/ClaimStatusPieChart";
import UserGrowthBarChart from "../components/layout/UserGrowthBarChart";


const AdminAnalyticsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics & Reports</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Claim Trends Over Time</h2>
            <div className="w-full h-96">
              <ClaimTrendsChart />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Claim Status Breakdown</h2>
            <div className="w-full h-96 flex items-center justify-center">
              <ClaimStatusPieChart />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">User Growth</h2>
          <div className="w-full h-96">
            <UserGrowthBarChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalyticsPage;
