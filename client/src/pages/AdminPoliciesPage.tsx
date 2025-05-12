import React from "react";
import AdminSidebar from "../components/layout/AdminSidebar";

import { getAllPolicies, approvePolicy, rejectPolicy, deletePolicy } from "../services/policyService";
import { getAllUsers } from "../services/userService";
import Swal from 'sweetalert2';

const AdminPoliciesPage: React.FC = () => {
  const [policies, setPolicies] = React.useState<any[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [actionLoading, setActionLoading] = React.useState<{ [id: number]: string | null }>({});

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [policiesRes, usersRes] = await Promise.all([
          getAllPolicies(),
          getAllUsers()
        ]);
        setPolicies(policiesRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        setError("Failed to fetch policies or users");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Policies</h1>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-4">Loading policies...</div>
          ) : error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : (
            <>
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-[#1a2b3c] text-white">
                  <tr>
                    <th className="px-4 py-2">Policy Number</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Product ID</th>
                    <th className="px-4 py-2">Start Date</th>
                    <th className="px-4 py-2">End Date</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Created At</th>
                    <th className="px-4 py-2">Updated At</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((policy) => (
                    <tr key={policy.policyId} className="border-b hover:bg-gray-100 transition-colors">
                      <td className="px-4 py-2">{policy.policyNumber}</td>
                      <td className="px-4 py-2">{
                        users.length > 0
                          ? (users.find((u) => u.userId === policy.userId)?.userName || 'Unknown')
                          : 'Loading...'}
                      </td>
                      <td className="px-4 py-2">{policy.productId}</td>
                      <td className="px-4 py-2">{policy.startDate ? new Date(policy.startDate).toLocaleDateString() : ''}</td>
                      <td className="px-4 py-2">{policy.endDate ? new Date(policy.endDate).toLocaleDateString() : ''}</td>
                      <td className="px-4 py-2">
  <span
    className={
      policy.status === 'approved'
        ? 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold'
        : policy.status === 'rejected'
        ? 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold'
        : 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold'
    }
    style={{ textTransform: 'capitalize' }}
  >
    {policy.status}
  </span>
</td>
                      <td className="px-4 py-2">{policy.createdAt ? new Date(policy.createdAt).toLocaleString() : ''}</td>
                      <td className="px-4 py-2">{policy.updatedAt ? new Date(policy.updatedAt).toLocaleString() : ''}</td>
                      <td className="px-4 py-2 flex gap-2 justify-center">
                        <button
                          className={`bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs ${policy.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={policy.status === 'approved' || actionLoading[policy.policyId] === 'approve'}
                          onClick={async () => {
                            setActionLoading((prev) => ({ ...prev, [policy.policyId]: 'approve' }));
                            try {
                              await approvePolicy(policy.policyId);
                              setPolicies((prev) => prev.map((p) => p.policyId === policy.policyId ? { ...p, status: 'approved' } : p));
                            } catch (err) {
                              await Swal.fire('Error', 'Failed to approve policy', 'error');
                            }
                            setActionLoading((prev) => ({ ...prev, [policy.policyId]: null }));
                          }}
                        >
                          {actionLoading[policy.policyId] === 'approve' ? 'Approving...' : 'Approve'}
                        </button>
                        <button
                          className={`bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs ${policy.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={policy.status === 'rejected' || actionLoading[policy.policyId] === 'reject'}
                          onClick={async () => {
                            setActionLoading((prev) => ({ ...prev, [policy.policyId]: 'reject' }));
                            try {
                              await rejectPolicy(policy.policyId);
                              setPolicies((prev) => prev.map((p) => p.policyId === policy.policyId ? { ...p, status: 'rejected' } : p));
                            } catch (err) {
                              await Swal.fire('Error', 'Failed to reject policy', 'error');
                            }
                            setActionLoading((prev) => ({ ...prev, [policy.policyId]: null }));
                          }}
                        >
                          {actionLoading[policy.policyId] === 'reject' ? 'Rejecting...' : 'Reject'}
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          disabled={actionLoading[policy.policyId] === 'delete'}
                          onClick={async () => {
                            const result = await Swal.fire({
                              title: 'Are you sure?',
                              text: 'You won\'t be able to revert this!',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#d33',
                              cancelButtonColor: '#3085d6',
                              confirmButtonText: 'Yes, delete it!'
                            });
                            if (!result.isConfirmed) return;
                            setActionLoading((prev) => ({ ...prev, [policy.policyId]: 'delete' }));
                            try {
                              await deletePolicy(policy.policyId);
                              setPolicies((prev) => prev.filter((p) => p.policyId !== policy.policyId));
                              await Swal.fire('Deleted!', 'Policy has been deleted.', 'success');
                            } catch (err) {
                              await Swal.fire('Error', 'Failed to delete policy', 'error');
                            }
                            setActionLoading((prev) => ({ ...prev, [policy.policyId]: null }));
                          }}
                        >
                          {actionLoading[policy.policyId] === 'delete' ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPoliciesPage;
