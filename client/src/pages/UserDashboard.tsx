import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import {
  User,
  FileText,
  CheckCircle,
  XCircle,
  ClipboardList,
  ShieldCheck,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { getAllPolicies } from "../services/policyService";
import { getAllClaims } from "../services/claimService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const UserDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sign-out handler
  const handleSignOut = () => {
    logout(); // clear auth state & tokens
    navigate("/login", { replace: true });
  };

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      setLoading(true);
      setError(null);
      try {
        const [policiesRes, claimsRes] = await Promise.all([
          getAllPolicies(),
          getAllClaims(),
        ]);
        const policiesData = policiesRes.data || [];
        console.log();
        const claimsData = claimsRes.data || [];

        // Compute stats
        const stats = {
          totalPolicies: policiesData.length,
          pendingPolicies: policiesData.filter(
            (p: any) => p.status?.toLowerCase() === "pending"
          ).length,
          approvedPolicies: policiesData.filter(
            (p: any) => p.status?.toLowerCase() === "approved"
          ).length,
          rejectedPolicies: policiesData.filter(
            (p: any) => p.status?.toLowerCase() === "rejected"
          ).length,
          totalClaims: claimsData.length,
          approvedClaims: claimsData.filter(
            (c: any) => c.status?.toLowerCase() === "approved"
          ).length,
          rejectedClaims: claimsData.filter(
            (c: any) => c.status?.toLowerCase() === "rejected"
          ).length,
        };
        setStats(stats);

        // Recent activity items
        const policies = policiesData.map((p: any) => ({
          type: "Policy",
          action: p.status.charAt(0).toUpperCase() + p.status.slice(1),
          detail: `Policy #${p.policyNumber}`,
          date: p.createdAt,
        }));
        const claims = claimsData.map((c: any) => ({
          type: "Claim",
          action: c.status.charAt(0).toUpperCase() + c.status.slice(1),
          detail: `Claim #${c.claimNumber}`,
          date: c.createdAt,
        }));

        // Merge & sort
        const merged = [...policies, ...claims].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setRecentActivity(merged.slice(0, 5));
      } catch {
        setError("Failed to load recent activity");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        {/* Header with Sign Out */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-gray-500">
              Here’s an overview of your insurance activity.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0 relative">
            {/* Profile dropdown trigger */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-4 hover:bg-gray-100 rounded-lg p-1 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">
                  {user?.firstName}
                </div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-16 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {loading ? (
            <div className="col-span-4 text-center text-gray-500 py-8">
              Loading stats...
            </div>
          ) : error ? (
            <div className="col-span-4 text-center text-red-500 py-8">
              {error}
            </div>
          ) : stats ? (
            <>
              {/* Policies */}
              <div
                className="rounded-2xl shadow-md p-6 bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-start hover:shadow-xl transition group cursor-pointer"
                onClick={() => navigate("/user/policies")}
                title="Go to Policies"
              >
                <ShieldCheck className="w-8 h-8 text-blue-500 mb-4" />
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition">
                  {stats.totalPolicies}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Total Policies
                </div>
              </div>
              <div
                className="rounded-2xl shadow-md p-6 bg-gradient-to-br from-yellow-100 to-yellow-300 flex flex-col items-start hover:shadow-xl transition group cursor-pointer"
                onClick={() => navigate("/user/policies")}
                title="Pending Policies"
              >
                <ClipboardList className="w-8 h-8 text-yellow-500 mb-4" />
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-yellow-700 transition">
                  {stats.pendingPolicies}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Pending Policies
                </div>
              </div>
              <div
                className="rounded-2xl shadow-md p-6 bg-gradient-to-br from-green-100 to-green-300 flex flex-col items-start hover:shadow-xl transition group cursor-pointer"
                onClick={() => navigate("/user/policies")}
                title="Approved Policies"
              >
                <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-green-700 transition">
                  {stats.approvedPolicies}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Approved Policies
                </div>
              </div>
              <div
                className="rounded-2xl shadow-md p-6 bg-gradient-to-br from-red-100 to-red-300 flex flex-col items-start hover:shadow-xl transition group cursor-pointer"
                onClick={() => navigate("/user/policies")}
                title="Rejected Policies"
              >
                <XCircle className="w-8 h-8 text-red-500 mb-4" />
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-red-700 transition">
                  {stats.rejectedPolicies}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Rejected Policies
                </div>
              </div>

              {/* Claims */}
              <div
                className="rounded-2xl shadow-md p-6 bg-gradient-to-br from-indigo-100 to-indigo-300 flex flex-col items-start hover:shadow-xl transition group cursor-pointer"
                onClick={() => navigate("/user/claims")}
                title="Total Claims"
              >
                <FileText className="w-8 h-8 text-indigo-500 mb-4" />
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-indigo-700 transition">
                  {stats.totalClaims}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Total Claims
                </div>
              </div>
              <div
                className="rounded-2xl shadow-md p-6 bg-gradient-to-br from-green-100 to-green-400 flex flex-col items-start hover:shadow-xl transition group cursor-pointer"
                onClick={() => navigate("/user/claims")}
                title="Approved Claims"
              >
                <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-green-700 transition">
                  {stats.approvedClaims}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Approved Claims
                </div>
              </div>
              <div
                className="rounded-2xl shadow-md p-6 bg-gradient-to-br from-red-100 to-red-400 flex flex-col items-start hover:shadow-xl transition group cursor-pointer"
                onClick={() => navigate("/user/claims")}
                title="Rejected Claims"
              >
                <AlertTriangle className="w-8 h-8 text-red-600 mb-4" />
                <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-red-700 transition">
                  {stats.rejectedClaims}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Rejected Claims
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Activity
            </h2>
            <a
              href="#"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              View all
            </a>
          </div>
          {loading ? (
            <div className="text-gray-500 py-8 text-center">
              Loading recent activity...
            </div>
          ) : error ? (
            <div className="text-red-500 py-8 text-center">{error}</div>
          ) : recentActivity.length === 0 ? (
            <div className="text-gray-400 py-8 text-center">
              No recent activity found.
            </div>
          ) : (
            <ul>
              {recentActivity.map((activity, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-3 border-b last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    {activity.type === "Policy" ? (
                      <ShieldCheck className="w-5 h-5 text-blue-400" />
                    ) : (
                      <FileText className="w-5 h-5 text-indigo-400" />
                    )}
                    <span className="font-medium text-gray-700">
                      {activity.detail}
                    </span>
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      {activity.action}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
