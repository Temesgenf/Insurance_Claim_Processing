import AppSidebar from "../components/layout/AppSidebar";
import { useEffect, useState } from "react";
import { getAllClaims } from "../services/claimService";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { FiPlus, FiFilter, FiSearch, FiFileText, FiEye, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import PageMeta from "../components/common/PageMeta";

const columns = [
  "Claim Number",
  "Policy ID",
  "Status",
  "Amount Requested",
  "Loss Date",
  "Actions",
];

export interface Claim {
  claimId: string;
  policyId: string;
  claimNumber: string;
  status: string;
  treatmentDetails: string;
  amountRequested: number;
  lossDate: string;
  lossTime: string;
  createdAt: string;
  user: object;
  updatedAt: string;
}

const ClaimsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [claims, setClaims] = useState<Claim[]>([]);
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
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const response = await getAllClaims();
        const claimsData = response.data;
        // If the backend fields are different, map them here
        const mappedClaims = claimsData.map((claim: any) => ({
          claimId: claim.claimId || claim.id || "",
          policyId: claim.policyId || claim.policyNumber || "",
          claimNumber:
            claim.claimNumber ||
            claim.claim_number ||
            claim.claimId ||
            claim.id ||
            "",
          status: claim.status || "",
          treatmentDetails: claim.treatmentDetails || "",
          amountRequested: claim.amountRequested || claim.claimAmount || 0,
          lossDate: claim.lossDate || claim.claimDate || "",
          lossTime: claim.lossTime || "",
          createdAt: claim.createdAt || "",
          updatedAt: claim.updatedAt || "",
        }));
        setClaims(mappedClaims);
      } catch (error) {
        console.error("Error fetching claims:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClaims();
  }, []);

  // Status color and icon logic
  const getStatusInfo = (status: string) => {
    const statusLower = (status || "").toLowerCase();
    switch (statusLower) {
      case "approved":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          darkColor: "dark:bg-green-900 dark:text-green-200 dark:border-green-800",
          icon: <FiCheckCircle className="w-4 h-4 mr-1" />
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          darkColor: "dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800",
          icon: <FiClock className="w-4 h-4 mr-1" />
        };
      case "rejected":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          darkColor: "dark:bg-red-900 dark:text-red-200 dark:border-red-800",
          icon: <FiXCircle className="w-4 h-4 mr-1" />
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          darkColor: "dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700",
          icon: <FiFileText className="w-4 h-4 mr-1" />
        };
    }
  };

  // Handle click for See Detail
  const handleSeeDetail = (claimId: string) => {
    navigate(`/user/claims/${claimId}`);
  };

  // Filter claims based on search term and status
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch = 
      !searchTerm || 
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      !selectedStatus || 
      claim.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <PageMeta
        title="Insurance Claims | Manage Your Claims"
        description="View and manage your insurance claims"
      />
      <main className="flex min-h-screen">
        <AppSidebar />
        <div className={`flex-1 p-6 md:p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Claims Management</h1>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                View and manage all your insurance claims in one place
              </p>
            </div>
            <button
              onClick={() => navigate("/user/new-claim")}
              className={`mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              <FiPlus className="w-5 h-5" />
              Create New Claim
            </button>
          </div>

          {/* Filters and search section */}
          <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className={`flex items-center px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <FiSearch className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search claims..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`ml-2 w-full bg-transparent border-none focus:outline-none ${theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FiFilter className="w-5 h-5 mr-2" />
                  <span>Status:</span>
                </div>
                <select
                  value={selectedStatus || ""}
                  onChange={(e) => setSelectedStatus(e.target.value || null)}
                  className={`px-3 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
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

          {/* Claims table */}
          <div className={`rounded-lg shadow overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            {loading ? (
              <div className={`flex justify-center items-center py-20 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading claims...
              </div>
            ) : filteredClaims.length === 0 ? (
              <div className={`flex flex-col items-center justify-center py-16 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <FiFileText className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No claims found</p>
                <p className="text-sm">
                  {searchTerm || selectedStatus 
                    ? "Try adjusting your search or filters" 
                    : "Create your first claim to get started"}
                </p>
                {!searchTerm && !selectedStatus && (
                  <button
                    onClick={() => navigate("/user/new-claim")}
                    className={`mt-6 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                      ${theme === 'dark' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    <FiPlus className="w-5 h-5" />
                    Create New Claim
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      {columns.map((col) => (
                        <th
                          key={col}
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                            ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {filteredClaims.map((claim, idx) => (
                      <tr 
                        key={idx} 
                        className={`transition-colors ${
                          theme === 'dark' 
                            ? 'hover:bg-gray-700' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                          {claim.claimNumber}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {claim.policyId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(() => {
                            const { color, darkColor, icon } = getStatusInfo(claim.status);
                            return (
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${color} ${darkColor}`}>
                                {icon}
                                {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                              </span>
                            );
                          })()}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          ${Number(claim.amountRequested).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {new Date(claim.lossDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleSeeDetail(claim.claimId)}
                            className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors
                              ${theme === 'dark' 
                                ? 'bg-gray-700 hover:bg-gray-600 text-blue-400 border border-gray-600' 
                                : 'bg-gray-100 hover:bg-gray-200 text-blue-600 border border-gray-200'}`}
                          >
                            <FiEye className="w-4 h-4 mr-1" />
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

export default ClaimsPage;
