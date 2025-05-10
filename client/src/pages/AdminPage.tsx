import React from 'react';
import AdminSidebar from '../components/layout/AdminSidebar';

const adminCardData = [
  { title: 'Total Users', border: 'border-blue-500', value: 120 },
  { title: 'Total Policies', border: 'border-green-500', value: 45 },
  { title: 'Total Claims', border: 'border-indigo-500', value: 230 },
  { title: 'Pending Claims', border: 'border-yellow-500', value: 15 },
  { title: 'Approved Claims', border: 'border-green-600', value: 200 },
  { title: 'Rejected Claims', border: 'border-red-600', value: 15 },
  { title: 'Analytics', border: 'border-purple-500', value: '--' },
];

const AdminPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCardData.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-xl shadow-lg p-6 bg-white text-gray-800 flex flex-col items-center border-4 ${card.border} transition-transform transform hover:scale-105`}
            >
              <div className="text-lg font-semibold mb-2 text-center">{card.title}</div>
              <div className="text-4xl font-bold">{card.value}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
