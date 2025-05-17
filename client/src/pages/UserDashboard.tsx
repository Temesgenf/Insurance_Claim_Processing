import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiThumbsUp,
  FiTrendingUp,
  FiPieChart,
  FiActivity,
  FiList,
} from "react-icons/fi";
import AppSidebar from "../components/layout/AppSidebar";
import ClaimStatusPieChart from "../components/layout/ClaimStatusPieChart";
import ClaimTrendsChart from "../components/layout/ClaimTrendsChart";
import UserGrowthBarChart from "../components/layout/UserGrowthBarChart";
import PageMeta from "../components/common/PageMeta";
import { getAllClaims } from "../services/claimService";
import { getAllPolicies } from "../services/policyService";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [claims, setClaims] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const fetchData = async () => {
      try {
        const [claimsRes, policiesRes] = await Promise.all([
          getAllClaims(),
          getAllPolicies(),
        ]);
        setClaims(claimsRes.data);
        setPolicies(policiesRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate metrics
  const totalPolicies = policies.length;
  const activePolicies = policies.filter(
    (policy: any) => policy.status === "approved"
  ).length;
  const pendingClaims = claims.filter(
    (claim: any) => claim.status === "Pending"
  ).length;
  const approvedClaims = claims.filter(
    (claim: any) => claim.status === "Approved"
  ).length;

  // Navigation handlers
  const navigateToPolicies = () => {
    navigate("/user/policies");
  };

  const navigateToClaims = () => {
    navigate("/user/claims");
  };

  const navigateToPolicy = (policyId: string) => {
    navigate(`/user/policies/${policyId}`);
  };

  const navigateToClaim = (claimId: string) => {
    navigate(`/user/claims/${claimId}`);
  };

  // const navigateToNewClaim = () => {
  //   navigate('/user/new-claim');
  // };

  // const navigateToNewPolicy = () => {
  //   navigate('/user/new-policy');
  // };

  // // Get the current date for greeting
  // const getCurrentTimeGreeting = () => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) return "Good morning";
  //   if (hour < 18) return "Good afternoon";
  //   return "Good evening";
  // };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <>
      <PageMeta
        title="Insurance Dashboard | User Dashboard"
        description="User dashboard for insurance policy management and claims tracking"
      />
      <div className="flex">
        <AppSidebar />
        <div
          className={`flex-1 p-6 md:p-8 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {/* Header with greeting and date */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1
                className={`text-2xl md:text-3xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {greeting}, {user?.firstName || "User"}
              </h1>
              <p
                className={`mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div
              className={`mt-4 md:mt-0 px-4 py-2 rounded-lg ${
                theme === "dark"
                  ? "bg-blue-900 text-blue-200"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              <p className="text-sm font-medium">Your Insurance Portal</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
              {/* User Metrics */}
              <div
                className={`rounded-2xl border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                } p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  } mb-5 flex items-center`}
                >
                  <FiActivity className="mr-2" /> Your Insurance Overview
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  <div
                    onClick={navigateToPolicies}
                    className={`${
                      theme === "dark"
                        ? "bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700"
                        : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
                    } rounded-xl p-5 flex flex-col gap-3 border cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                      <FiFileText className="w-full h-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`${
                          theme === "dark" ? "text-blue-300" : "text-blue-700"
                        } font-semibold`}
                      >
                        Total Policies
                      </span>
                      <span
                        className={`text-3xl font-bold ${
                          theme === "dark" ? "text-blue-200" : "text-blue-800"
                        }`}
                      >
                        {totalPolicies}
                      </span>
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      } mt-1 flex items-center`}
                    >
                      <FiFileText className="mr-1" /> Click to view all policies
                    </div>
                  </div>
                  <div
                    onClick={navigateToPolicies}
                    className={`${
                      theme === "dark"
                        ? "bg-gradient-to-br from-green-900 to-green-800 border-green-700"
                        : "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
                    } rounded-xl p-5 flex flex-col gap-3 border cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                      <FiCheckCircle className="w-full h-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`${
                          theme === "dark" ? "text-green-300" : "text-green-700"
                        } font-semibold`}
                      >
                        Active Policies
                      </span>
                      <span
                        className={`text-3xl font-bold ${
                          theme === "dark" ? "text-green-200" : "text-green-800"
                        }`}
                      >
                        {activePolicies}
                      </span>
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "dark" ? "text-green-400" : "text-green-600"
                      } mt-1 flex items-center`}
                    >
                      <FiCheckCircle className="mr-1" /> Click to view active
                      policies
                    </div>
                  </div>
                  <div
                    onClick={navigateToClaims}
                    className={`${
                      theme === "dark"
                        ? "bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700"
                        : "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
                    } rounded-xl p-5 flex flex-col gap-3 border cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                      <FiClock className="w-full h-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`${
                          theme === "dark"
                            ? "text-yellow-300"
                            : "text-yellow-700"
                        } font-semibold`}
                      >
                        Pending Claims
                      </span>
                      <span
                        className={`text-3xl font-bold ${
                          theme === "dark"
                            ? "text-yellow-200"
                            : "text-yellow-800"
                        }`}
                      >
                        {pendingClaims}
                      </span>
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "dark" ? "text-yellow-400" : "text-yellow-600"
                      } mt-1 flex items-center`}
                    >
                      <FiClock className="mr-1" /> Click to view pending claims
                    </div>
                  </div>
                  <div
                    onClick={navigateToClaims}
                    className={`${
                      theme === "dark"
                        ? "bg-gradient-to-br from-indigo-900 to-indigo-800 border-indigo-700"
                        : "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200"
                    } rounded-xl p-5 flex flex-col gap-3 border cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                      <FiThumbsUp className="w-full h-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`${
                          theme === "dark"
                            ? "text-indigo-300"
                            : "text-indigo-700"
                        } font-semibold`}
                      >
                        Approved Claims
                      </span>
                      <span
                        className={`text-3xl font-bold ${
                          theme === "dark"
                            ? "text-indigo-200"
                            : "text-indigo-800"
                        }`}
                      >
                        {approvedClaims}
                      </span>
                    </div>
                    <div
                      className={`text-xs ${
                        theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                      } mt-1 flex items-center`}
                    >
                      <FiThumbsUp className="mr-1" /> Click to view approved
                      claims
                    </div>
                  </div>
                </div>
              </div>

              {/* Claims Trend Chart */}
              <div
                className={`rounded-2xl border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                } p-5 sm:p-6 shadow-md`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  } mb-4 flex items-center`}
                >
                  <FiTrendingUp className="mr-2" /> Claims Trends
                </h3>
                <ClaimTrendsChart />
              </div>
            </div>

            <div className="col-span-12 xl:col-span-5">
              {/* Claim Status Distribution */}
              <div
                className={`rounded-2xl border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                } p-5 sm:p-6 h-full shadow-md`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  } mb-4 flex items-center`}
                >
                  <FiPieChart className="mr-2" /> Claim Status Distribution
                </h3>
                <div className="flex items-center justify-center h-[300px]">
                  <ClaimStatusPieChart />
                </div>
              </div>
            </div>

            <div className="col-span-12">
              {/* User Growth Chart */}
              <div
                className={`rounded-2xl border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                } p-5 sm:p-6 shadow-md`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  } mb-4 flex items-center`}
                >
                  <FiTrendingUp className="mr-2" /> Policy Growth
                </h3>
                <UserGrowthBarChart />
              </div>
            </div>

            <div className="col-span-12 xl:col-span-5">
              {/* Recent Activity */}
              <div
                className={`rounded-2xl border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                } p-5 sm:p-6 shadow-md`}
              >
                <div className="flex justify-between items-center mb-5">
                  <h3
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    } flex items-center`}
                  >
                    <FiActivity className="mr-2" /> Recent Activity
                  </h3>
                  {claims.length > 5 && (
                    <button
                      onClick={navigateToClaims}
                      className={`text-xs px-3 py-1 rounded-full ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      View All
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {loading ? (
                    <div
                      className={`animate-pulse flex space-x-4 p-4 ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                      } rounded-lg`}
                    >
                      <div
                        className={`rounded-full ${
                          theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                        } h-10 w-10`}
                      ></div>
                      <div className="flex-1 space-y-2 py-1">
                        <div
                          className={`h-4 ${
                            theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                          } rounded w-3/4`}
                        ></div>
                        <div
                          className={`h-3 ${
                            theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                          } rounded w-5/6`}
                        ></div>
                      </div>
                    </div>
                  ) : claims.length > 0 ? (
                    claims.slice(0, 5).map((claim: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => navigateToClaim(claim.claimId)}
                        className={`flex items-center p-4 ${
                          theme === "dark"
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-50 hover:bg-gray-100"
                        } rounded-xl cursor-pointer transition-colors duration-200 border-l-4 ${
                          claim.status === "Approved"
                            ? theme === "dark"
                              ? "border-green-500"
                              : "border-green-500"
                            : claim.status === "Rejected"
                            ? theme === "dark"
                              ? "border-red-500"
                              : "border-red-500"
                            : theme === "dark"
                            ? "border-yellow-500"
                            : "border-yellow-500"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            claim.status === "Approved"
                              ? theme === "dark"
                                ? "bg-green-900 text-green-300"
                                : "bg-green-100 text-green-700"
                              : claim.status === "Rejected"
                              ? theme === "dark"
                                ? "bg-red-900 text-red-300"
                                : "bg-red-100 text-red-700"
                              : theme === "dark"
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {claim.status === "Approved" ? (
                            <FiCheckCircle />
                          ) : claim.status === "Rejected" ? (
                            <FiThumbsUp className="transform rotate-180" />
                          ) : (
                            <FiClock />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              theme === "dark" ? "text-white" : "text-gray-800"
                            }`}
                          >
                            Claim #{claim.claimNumber}
                          </p>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {claim.createdAt
                              ? formatDate(claim.createdAt)
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              claim.status === "Approved"
                                ? theme === "dark"
                                  ? "bg-green-900 text-green-300"
                                  : "bg-green-100 text-green-800"
                                : claim.status === "Rejected"
                                ? theme === "dark"
                                  ? "bg-red-900 text-red-300"
                                  : "bg-red-100 text-red-800"
                                : theme === "dark"
                                ? "bg-yellow-900 text-yellow-300"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {claim.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className={`flex flex-col items-center justify-center p-8 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <FiActivity className="w-12 h-12 mb-3 opacity-50" />
                      <p>No recent activity</p>
                      <button
                        onClick={navigateToClaims}
                        className={`mt-4 px-4 py-2 rounded-lg ${
                          theme === "dark"
                            ? "bg-blue-900 text-blue-300 hover:bg-blue-800"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        } transition-colors text-sm`}
                      >
                        File a New Claim
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-7">
              {/* Recent Policies */}
              <div
                className={`rounded-2xl border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                } p-5 sm:p-6 shadow-md`}
              >
                <div className="flex justify-between items-center mb-5">
                  <h3
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    } flex items-center`}
                  >
                    <FiList className="mr-2" /> Your Policies
                  </h3>
                  {policies.length > 5 && (
                    <button
                      onClick={navigateToPolicies}
                      className={`text-xs px-3 py-1 rounded-full ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      View All
                    </button>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table
                    className={`min-w-full divide-y ${
                      theme === "dark" ? "divide-gray-700" : "divide-gray-200"
                    }`}
                  >
                    <thead>
                      <tr>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Policy Number
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Product
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Status
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Start Date
                        </th>
                        <th
                          className={`px-4 py-3 text-left text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          End Date
                        </th>
                        <th
                          className={`px-4 py-3 text-right text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          } uppercase tracking-wider`}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={`${
                        theme === "dark" ? "bg-gray-800" : "bg-white"
                      } divide-y ${
                        theme === "dark" ? "divide-gray-700" : "divide-gray-200"
                      }`}
                    >
                      {loading ? (
                        <tr>
                          <td
                            colSpan={6}
                            className={`px-4 py-3 text-center ${
                              theme === "dark" ? "text-gray-400" : ""
                            }`}
                          >
                            <div className="flex justify-center items-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                              <span>Loading policies...</span>
                            </div>
                          </td>
                        </tr>
                      ) : policies.length > 0 ? (
                        policies
                          .slice(0, 5)
                          .map((policy: any, index: number) => (
                            <tr
                              key={index}
                              onClick={() => navigateToPolicy(policy.policyId)}
                              className={`${
                                theme === "dark"
                                  ? "hover:bg-gray-700"
                                  : "hover:bg-blue-50"
                              } transition-colors duration-200`}
                            >
                              <td
                                className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                                  theme === "dark"
                                    ? "text-blue-400"
                                    : "text-blue-600"
                                }`}
                              >
                                {policy.policyNumber}
                              </td>
                              <td
                                className={`px-4 py-3 whitespace-nowrap text-sm ${
                                  theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-500"
                                }`}
                              >
                                {policy.productId}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span
                                  className={`px-3 py-1 text-xs rounded-full ${
                                    policy.status === "approved"
                                      ? theme === "dark"
                                        ? "bg-green-900 text-green-300"
                                        : "bg-green-100 text-green-800"
                                      : policy.status === "rejected"
                                      ? theme === "dark"
                                        ? "bg-red-900 text-red-300"
                                        : "bg-red-100 text-red-800"
                                      : theme === "dark"
                                      ? "bg-yellow-900 text-yellow-300"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {policy.status}
                                </span>
                              </td>
                              <td
                                className={`px-4 py-3 whitespace-nowrap text-sm ${
                                  theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-500"
                                }`}
                              >
                                {policy.startDate
                                  ? new Date(
                                      policy.startDate
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td
                                className={`px-4 py-3 whitespace-nowrap text-sm ${
                                  theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-500"
                                }`}
                              >
                                {policy.endDate
                                  ? new Date(
                                      policy.endDate
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right">
                                <button
                                  onClick={() =>
                                    navigateToPolicy(policy.policyId)
                                  }
                                  className={`px-3 py-1 text-xs rounded-lg ${
                                    theme === "dark"
                                      ? "bg-blue-900/30 text-blue-400 hover:bg-blue-800/50"
                                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                  }`}
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className={`px-4 py-3 text-center ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            No policies found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
