import React from "react";
import AdminSidebar from "../components/layout/AdminSidebar";
import Swal from 'sweetalert2';

import { getAllClaims, approveClaim, rejectClaim, deleteClaim } from "../services/claimService";
import { getAllUsers } from "../services/userService";
import { getAllPolicies } from "../services/policyService";

const AdminClaimsPage: React.FC = () => {
  const [claims, setClaims] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [approvingId, setApprovingId] = React.useState<number | null>(null);
  const [rejectingId, setRejectingId] = React.useState<number | null>(null);
  const [viewClaim, setViewClaim] = React.useState<any | null>(null);
  const [users, setUsers] = React.useState<any[]>([]);
  const [policies, setPolicies] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [claimsRes, usersRes, policiesRes] = await Promise.all([
          getAllClaims(),
          getAllUsers(),
          getAllPolicies(),
        ]);
        setClaims(claimsRes.data);
        setUsers(usersRes.data);
        setPolicies(policiesRes.data);
      } catch (err) {
        setError("Failed to fetch claims, users, or policies");
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Claims</h1>
        <div className="overflow-x-auto">
          {loading && <div className="text-center py-4">Loading claims...</div>}
          {error && <div className="text-center py-4 text-red-600">{error}</div>}
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-[#1a2b3c] text-white">
              <tr>
                <th className="py-3 px-6 text-left">Claim Number</th>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Treatment Details</th>
                <th className="py-3 px-6 text-left">Amount Requested</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Updated At</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.claimId} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-6">{claim.claimNumber}</td>
                  <td className="py-3 px-6">{claim.userId}</td>
                  <td className="py-3 px-6">{claim.treatmentDetails}</td>
                  <td className="py-3 px-6">{claim.amountRequested}</td>
                  <td className="py-3 px-6">{claim.createdAt ? new Date(claim.createdAt).toLocaleString() : ''}</td>
                  <td className="py-3 px-6">{claim.updatedAt ? new Date(claim.updatedAt).toLocaleString() : ''}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded text-xs font-semibold
                      ${claim.status === 'Approved' ? 'bg-green-200 text-green-800' :
                        claim.status === 'Rejected' ? 'bg-red-200 text-red-800' :
                        'bg-yellow-200 text-yellow-800'}`}>{claim.status}</span>
                  </td>
                  <td className="py-3 px-6 flex gap-2 justify-center">
                    <button
  className={`bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs ${claim.status === 'Approved' ? 'opacity-50 cursor-not-allowed' : ''}`}
  onClick={async () => {
    setApprovingId(claim.claimId);
    try {
      await approveClaim(claim.claimId);
      setClaims((prev) => prev.map(c => c.claimId === claim.claimId ? { ...c, status: 'Approved' } : c));
    } catch {
      alert('Failed to approve claim');
    }
    setApprovingId(null);
  }}
  disabled={claim.status === 'Approved' || approvingId === claim.claimId}
>
  {approvingId === claim.claimId ? 'Approving...' : 'Approve'}
</button>
                    <button
  className={`bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs ${claim.status === 'Rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}
  onClick={async () => {
    setRejectingId(claim.claimId);
    try {
      await rejectClaim(claim.claimId);
      setClaims((prev) => prev.map(c => c.claimId === claim.claimId ? { ...c, status: 'Rejected' } : c));
    } catch {
      alert('Failed to reject claim');
    }
    setRejectingId(null);
  }}
  disabled={claim.status === 'Rejected' || rejectingId === claim.claimId}
>
  {rejectingId === claim.claimId ? 'Rejecting...' : 'Reject'}
</button>
                    <button
  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
  onClick={() => setViewClaim(claim)}
>
  View
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {viewClaim && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setViewClaim(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Claim Details</h2>
            <div className="space-y-2 grid grid-cols-2 gap-x-8">
              <div><strong>Claim Number:</strong> {viewClaim.claimNumber}</div>
              <div><strong>User Name:</strong> {(() => {
                const user = users.find(u => u.userId === viewClaim.userId);
                return user ? user.fullName || user.name || user.username || user.email : viewClaim.userId;
              })()}</div>
              <div><strong>Treatment Details:</strong> {viewClaim.treatmentDetails}</div>
              <div><strong>Amount Requested:</strong> {viewClaim.amountRequested}</div>
              <div><strong>Status:</strong> {viewClaim.status}</div>
              <div><strong>Created At:</strong> {viewClaim.createdAt ? new Date(viewClaim.createdAt).toLocaleString() : ''}</div>
              <div><strong>Updated At:</strong> {viewClaim.updatedAt ? new Date(viewClaim.updatedAt).toLocaleString() : ''}</div>
              {/* Policy details */}
              <div className="col-span-2 mt-4">
                <h3 className="text-lg font-semibold mb-2">Policy Details</h3>
                <div className="space-y-1">
                  {(() => {
                    const policy = policies.find(p => p.policyId === viewClaim.policyId);
                    if (!policy) return <div>Policy not found</div>;
                    return (
                      <>
                        <div><strong>Policy Number:</strong> {policy.policyNumber || policy.policyId}</div>
                        <div><strong>Policy Type:</strong> {policy.policyType || policy.type || '-'}</div>
                        <div><strong>Coverage:</strong> {policy.coverage || '-'}</div>
                        <div><strong>Start Date:</strong> {policy.startDate ? new Date(policy.startDate).toLocaleDateString() : '-'}</div>
                        <div><strong>End Date:</strong> {policy.endDate ? new Date(policy.endDate).toLocaleDateString() : '-'}</div>
                        {/* Add more policy fields as needed */}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm shadow"
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
                  try {
                    await deleteClaim(viewClaim.claimId);
                    setClaims((prev) => prev.filter((c) => c.claimId !== viewClaim.claimId));
                    setViewClaim(null);
                    await Swal.fire('Deleted!', 'Claim has been deleted.', 'success');
                  } catch (err) {
                    await Swal.fire('Error', 'Failed to delete claim', 'error');
                  }
                }}
              >
                Delete Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClaimsPage;
