import React from "react";
import AdminSidebar from "../components/layout/AdminSidebar";

// Dummy policy data for demonstration
const policies = [
  { id: 1, name: "Critical Care Insurance", type: "Health", premium: "ETB 120/year", status: "Active" },
  { id: 2, name: "Family Health Protection", type: "Family", premium: "ETB 200/year", status: "Active" },
  { id: 3, name: "Senior Citizen Health Cover", type: "Senior", premium: "ETB 300/year", status: "Inactive" },
];

const AdminPoliciesPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Policies</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-[#1a2b3c] text-white">
              <tr>
                <th className="py-3 px-6 text-left">Policy Name</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Premium</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy.id} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-6">{policy.name}</td>
                  <td className="py-3 px-6">{policy.type}</td>
                  <td className="py-3 px-6">{policy.premium}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${policy.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{policy.status}</span>
                  </td>
                  <td className="py-3 px-6 flex gap-2 justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">Edit</button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">Deactivate</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPoliciesPage;
