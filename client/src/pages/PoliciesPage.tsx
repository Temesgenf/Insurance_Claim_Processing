import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiPlus,
  FiFilter,
  FiSearch,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiInfo,
} from "react-icons/fi";
import { getAllPolicies } from "../services/policyService";
import { useTheme } from "../Context/ThemeContext";
import AppSidebar from "../components/layout/AppSidebar";
import PageMeta from "../components/common/PageMeta";

const columns = [
  "Policy Number",
  "Product ID",
  "Status",
  "Start Date",
  "End Date",
  "Actions",
];

export interface Policy {
  policyId: string;
  policyNumber: string;
  productId: string;
  status: string;
  startDate: Date | string;
  endDate: Date | string;
  premiumAmount?: number;
  deductibleAmount?: number;
  coverageLimit?: number;
}

const PoliciesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Helper to get status from query string
  const getStatusFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("status")?.toLowerCase() || null;
  };

  useEffect(() => {
    const statusFilter = getStatusFromQuery();
    if (statusFilter) {
      setSelectedStatus(statusFilter);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      try {
        const response = await getAllPolicies();
        const policiesData = response.data;
        console.log("Policies data:", policiesData);
        const mappedPolicies = policiesData.map((policy: any) => ({
          policyId: policy.policyId,
          policyNumber: policy.policyNumber,
          productId: policy.productId,
          status: policy.status,
          startDate: policy.startDate,
          endDate: policy.endDate,
        }));
        setPolicies(mappedPolicies);
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, [location.search]);

  // Status color and icon logic
  const getStatusInfo = (status: string) => {
    const statusLower = (status || "").toLowerCase();
    switch (statusLower) {
      case "approved":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          darkColor:
            "dark:bg-green-900 dark:text-green-200 dark:border-green-800",
          icon: <FiCheckCircle className="w-4 h-4 mr-1" />,
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          darkColor:
            "dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800",
          icon: <FiClock className="w-4 h-4 mr-1" />,
        };
      case "rejected":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          darkColor: "dark:bg-red-900 dark:text-red-200 dark:border-red-800",
          icon: <FiXCircle className="w-4 h-4 mr-1" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          darkColor: "dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700",
          icon: <FiFileText className="w-4 h-4 mr-1" />,
        };
    }
  };

  // Handle view policy details
  const handleViewPolicy = (policyId: string) => {
    // Navigate to policy details page when implemented
    console.log(`View policy ${policyId}`);
  };

  // Filter policies based on search term and status
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      !searchTerm ||
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.productId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      !selectedStatus ||
      policy.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <PageMeta
        title="Insurance Policies | Manage Your Policies"
        description="View and manage your insurance policies"
      />
      <main className="flex min-h-screen">
        <AppSidebar />
        <div
          className={`flex-1 p-6 md:p-8 ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-50 text-gray-800"
          }`}
        >
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Policy Management
              </h1>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                View and manage all your insurance policies in one place
              </p>
            </div>
            <button
              onClick={() => navigate("/user/new-policy")}
              className={`mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
              <FiPlus className="w-5 h-5" />
              Create New Policy
            </button>
          </div>

          {/* Filters and search section */}
          <div
            className={`mb-6 p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } shadow`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div
                  className={`flex items-center px-3 py-2 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <FiSearch
                    className={`w-5 h-5 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search policies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`ml-2 w-full bg-transparent border-none focus:outline-none ${
                      theme === "dark"
                        ? "text-white placeholder-gray-400"
                        : "text-gray-800 placeholder-gray-500"
                    }`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <FiFilter className="w-5 h-5 mr-2" />
                  <span>Status:</span>
                </div>
                <select
                  value={selectedStatus || ""}
                  onChange={(e) => setSelectedStatus(e.target.value || null)}
                  className={`px-3 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Policies table */}
          <div
            className={`rounded-lg shadow overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white"
            }`}
          >
            {loading ? (
              <div
                className={`flex justify-center items-center py-20 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading policies...
              </div>
            ) : filteredPolicies.length === 0 ? (
              <div
                className={`flex flex-col items-center justify-center py-16 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <FiFileText className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No policies found</p>
                <p className="text-sm">
                  {searchTerm || selectedStatus
                    ? "Try adjusting your search or filters"
                    : "Create your first policy to get started"}
                </p>
                {!searchTerm && !selectedStatus && (
                  <button
                    onClick={() => navigate("/user/new-policy")}
                    className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                      ${
                        theme === "dark"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                  >
                    <FiPlus className="w-5 h-5" />
                    Create New Policy
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead
                    className={theme === "dark" ? "bg-gray-700" : "bg-gray-50"}
                  >
                    <tr>
                      {columns.map((col) => (
                        <th
                          key={col}
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                            ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-500"
                            }`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      theme === "dark" ? "divide-gray-700" : "divide-gray-200"
                    }`}
                  >
                    {filteredPolicies.map((policy, idx) => (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          theme === "dark"
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            theme === "dark" ? "text-blue-400" : "text-blue-600"
                          } font-medium`}
                        >
                          {policy.policyNumber}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            theme === "dark" ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {policy.productId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(() => {
                            const { color, darkColor, icon } = getStatusInfo(
                              policy.status
                            );
                            return (
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${color} ${darkColor}`}
                              >
                                {icon}
                                {policy.status.charAt(0).toUpperCase() +
                                  policy.status.slice(1).toLowerCase()}
                              </span>
                            );
                          })()}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            theme === "dark" ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {policy.startDate
                            ? new Date(policy.startDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            theme === "dark" ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {policy.endDate
                            ? new Date(policy.endDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleViewPolicy(policy.policyId)}
                            className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors
                              ${
                                theme === "dark"
                                  ? "bg-gray-700 hover:bg-gray-600 text-blue-400 border border-gray-600"
                                  : "bg-gray-100 hover:bg-gray-200 text-blue-600 border border-gray-200"
                              }`}
                          >
                            <FiInfo className="w-4 h-4 mr-1" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default PoliciesPage;
