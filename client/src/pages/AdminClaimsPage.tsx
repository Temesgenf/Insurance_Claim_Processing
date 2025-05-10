import React from "react";
import AdminSidebar from "../components/layout/AdminSidebar";

// Dummy claims data for demonstration
const claims = [
  { id: 1, user: "Tsegaye Tadele", policy: "Critical Care Insurance", amount: "ETB 10,000", status: "Pending" },
  { id: 2, user: "Zior Ezedein", policy: "Family Health Protection", amount: "ETB 5,000", status: "Approved" },
  { id: 3, user: "Temesgen Fikadu", policy: "Senior Citizen Health Cover", amount: "ETB 8,000", status: "Rejected" },
];

const AdminClaimsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Claims</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-[#1a2b3c] text-white">
              <tr>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Policy</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-6">{claim.user}</td>
                  <td className="py-3 px-6">{claim.policy}</td>
                  <td className="py-3 px-6">{claim.amount}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-semibold
                      ${claim.status === 'Approved' ? 'bg-green-200 text-green-800' :
                        claim.status === 'Rejected' ? 'bg-red-200 text-red-800' :
                        'bg-yellow-200 text-yellow-800'}`}>{claim.status}</span>
                  </td>
                  <td className="py-3 px-6 flex gap-2 justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">Approve</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Reject</button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">View</button>
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

export default AdminClaimsPage;
