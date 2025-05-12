import React, { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
const cardData = [
  { title: "My Policy Application", color: "bg-blue-500" },
  { title: "My Pending Policy Application", color: "bg-yellow-500" },
  { title: "Approved Policy Application", color: "bg-green-500" },
  { title: "Rejected Policy Application", color: "bg-red-500" },
  { title: "My Claim Application", color: "bg-indigo-500" },
  { title: "My Approved Claim", color: "bg-green-600" },
  { title: "Rejected Claim Application", color: "bg-red-600" },
];

const UserDashboard: React.FC = () => {
  useEffect(() => {
    console.log("UserDashboard mounted - should fetch data now");
  }, []);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          User Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-xl shadow-lg p-6 text-white flex flex-col items-center ${card.color} transition-transform transform hover:scale-105`}
            >
              <div className="text-lg font-semibold mb-2 text-center">
                {card.title}
              </div>
              <div className="text-4xl font-bold">--</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
