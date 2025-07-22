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
        console.log(claimsRes.data)
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
  const totalPolicies = policies?.length | 0;
  const activePolicies = Array.isArray(policies) 
  ? policies.filter((policy: any) => policy.status === "approved").length 
  : 0;
  const pendingClaims = claims.filter(
    (claim: any) => claim.status === "pending"
  ).length;

  console.log(pendingClaims);
  const approvedClaims = claims.filter(
    (claim: any) => claim.status === "Approved"
  ).length ;

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
        {/* <AppSidebar /> */}
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
                {greeting}, {user?.fullName || "User"}
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
          <div className="col-span-12 space-y-8 xl:col-span-7">
  {/* User Metrics */}
  <div
      className={`rounded-lg border ${
        theme === "dark"
          ? "border-gray-700 bg-gray-800"
          : "border-gray-200 bg-white"
      } p-6 shadow-sm`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className={`text-xl font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } flex items-center`}
        >
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
            <FiActivity className="text-white text-sm" />
          </div>
          Insurance Overview
        </h3>
        <div className={`px-3 py-1 rounded-md text-xs font-medium ${
          theme === "dark" 
            ? "bg-blue-900 text-blue-200" 
            : "bg-blue-50 text-blue-700"
        }`}>
          Live Data
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Policies Card */}
        <div
          onClick={navigateToPolicies}
          className={`${
            theme === "dark"
              ? "bg-gray-750 border-gray-600 hover:bg-gray-700"
              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
          } rounded-lg p-4 border cursor-pointer transition-colors duration-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                theme === "dark" 
                  ? "bg-blue-900 text-blue-300" 
                  : "bg-blue-100 text-blue-600"
              }`}>
                <FiFileText className="text-lg" />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                  Total Policies
                </p>
                <p className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {totalPolicies}
                </p>
              </div>
            </div>
            <svg className={`w-5 h-5 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Active Policies Card */}
        <div
          onClick={navigateToPolicies}
          className={`${
            theme === "dark"
              ? "bg-gray-750 border-gray-600 hover:bg-gray-700"
              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
          } rounded-lg p-4 border cursor-pointer transition-colors duration-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                theme === "dark" 
                  ? "bg-green-900 text-green-300" 
                  : "bg-green-100 text-green-600"
              }`}>
                <FiCheckCircle className="text-lg" />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                  Active Policies
                </p>
                <p className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {activePolicies}
                </p>
              </div>
            </div>
            <svg className={`w-5 h-5 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Pending Claims Card */}
        <div
          onClick={navigateToClaims}
          className={`${
            theme === "dark"
              ? "bg-gray-750 border-gray-600 hover:bg-gray-700"
              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
          } rounded-lg p-4 border cursor-pointer transition-colors duration-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                theme === "dark" 
                  ? "bg-yellow-900 text-yellow-300" 
                  : "bg-yellow-100 text-yellow-600"
              }`}>
                <FiClock className="text-lg" />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                  Pending Claims
                </p>
                <p className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {pendingClaims}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {pendingClaims > 0 && (
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              )}
              <svg className={`w-5 h-5 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Approved Claims Card */}
        <div
          onClick={navigateToClaims}
          className={`${
            theme === "dark"
              ? "bg-gray-750 border-gray-600 hover:bg-gray-700"
              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
          } rounded-lg p-4 border cursor-pointer transition-colors duration-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                theme === "dark" 
                  ? "bg-indigo-900 text-indigo-300" 
                  : "bg-indigo-100 text-indigo-600"
              }`}>
                <FiThumbsUp className="text-lg" />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                  Approved Claims
                </p>
                <p className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {approvedClaims}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <svg className={`w-5 h-5 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

  {/* Claims Trend Chart */}
  <div
  className={`
    group relative overflow-hidden rounded-3xl border transition-all duration-700 hover:shadow-4xl
    ${theme === "dark"
      ? "border-gray-700/40 bg-gradient-to-br from-gray-800/90 via-gray-850/90 to-gray-900/90 backdrop-blur-md shadow-2xl hover:border-gray-600/50"
      : "border-gray-200/40 bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95 backdrop-blur-md shadow-2xl hover:border-gray-300/50"
    }
    p-6 sm:p-8 hover:scale-[1.01] transform-gpu
  `}
>
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className={`absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-5 animate-pulse ${
      theme === "dark" ? "bg-emerald-400" : "bg-emerald-500"
    }`} />
    <div className={`absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-3 animate-pulse delay-1000 ${
      theme === "dark" ? "bg-teal-400" : "bg-teal-500"
    }`} />
    <div className={`absolute top-1/2 left-1/4 w-24 h-24 rounded-full opacity-2 animate-pulse delay-500 ${
      theme === "dark" ? "bg-cyan-400" : "bg-cyan-500"
    }`} />
  </div>

  {/* Header section with enhanced design */}
  <div className="relative z-10 mb-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Enhanced icon container */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <FiTrendingUp className="text-white text-xl" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping opacity-75"></div>
        </div>
        
        {/* Title with enhanced typography */}
        <div>
          <h3 className={`
            text-2xl font-bold tracking-tight transition-all duration-300
            ${theme === "dark" ? "text-white" : "text-gray-900"}
            group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600
          `}>
            Claims Trends
          </h3>
          <p className={`
            text-sm mt-1 transition-colors duration-300
            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
          `}>
            Performance analytics & insights
          </p>
        </div>
      </div>
      
      {/* Enhanced controls section */}
      <div className="flex items-center space-x-4">
        {/* Time period selector */}
        <div className={`
          px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105
          ${theme === "dark" 
            ? "bg-gradient-to-r from-emerald-900/60 to-teal-900/60 text-emerald-300 border border-emerald-700/50 hover:border-emerald-600/70" 
            : "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200/50 hover:border-emerald-300/70"
          }
          backdrop-blur-sm
        `}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Last 12 months</span>
          </div>
        </div>
        
        {/* Settings dropdown */}
        <div className={`
          relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110
          ${theme === "dark" 
            ? "bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 hover:border-gray-600/70" 
            : "bg-white/80 hover:bg-gray-50/80 border border-gray-200/50 hover:border-gray-300/70"
          }
          backdrop-blur-sm group/btn
        `}>
          <svg className={`w-5 h-5 transition-all duration-300 group-hover/btn:rotate-90 ${
            theme === "dark" ? "text-gray-400 group-hover/btn:text-gray-300" : "text-gray-600 group-hover/btn:text-gray-700"
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        {/* Export button */}
        <div className={`
          relative w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110
          ${theme === "dark" 
            ? "bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 hover:border-gray-600/70" 
            : "bg-white/80 hover:bg-gray-50/80 border border-gray-200/50 hover:border-gray-300/70"
          }
          backdrop-blur-sm group/btn
        `}>
          <svg className={`w-5 h-5 transition-all duration-300 group-hover/btn:-translate-y-0.5 ${
            theme === "dark" ? "text-gray-400 group-hover/btn:text-gray-300" : "text-gray-600 group-hover/btn:text-gray-700"
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  
  {/* Chart section with enhanced container */}
  <div className="relative z-10">
    <div className={`
      relative rounded-3xl p-6 transition-all duration-500 hover:scale-[1.01] transform-gpu
      ${theme === "dark" 
        ? "bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-gray-900/70 border border-gray-700/40 shadow-inner" 
        : "bg-gradient-to-br from-gray-50/70 via-white/70 to-gray-50/70 border border-gray-200/40 shadow-inner"
      }
      backdrop-blur-sm
    `}>
      {/* Chart loading shimmer */}
      <div className={`
        absolute inset-6 rounded-2xl animate-pulse opacity-30
        ${theme === "dark" 
          ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" 
          : "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
        }
      `} />
      
      {/* Chart component */}
      <div className="relative z-10 min-h-[400px]">
        <ClaimTrendsChart claims={claims} />
      </div>
      
      {/* Chart insights overlay */}
      <div className={`
        absolute bottom-6 left-6 right-6 rounded-2xl p-4 transition-all duration-300 opacity-0 hover:opacity-100
        ${theme === "dark" 
          ? "bg-gray-800/90 border border-gray-700/50" 
          : "bg-white/90 border border-gray-200/50"
        }
        backdrop-blur-md
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`text-sm font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Avg. Processing Time
            </div>
            <div className={`text-lg font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              2.3 days
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`text-sm font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Success Rate
            </div>
            <div className="text-lg font-bold text-emerald-500">
              94.2%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Gradient overlay for hover effect */}
  <div className={`
    absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
    ${theme === "dark" 
      ? "bg-gradient-to-br from-emerald-600/5 via-teal-600/5 to-cyan-600/5" 
      : "bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5"
    }
  `} />
</div>
</div>

<div className="col-span-12 xl:col-span-5">
  {/* Claim Status Distribution */}
  <div
    className={`
      group relative overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-2xl
      ${theme === "dark" 
        ? "border-gray-700/50 bg-gradient-to-br from-gray-800/90 to-gray-900/90 hover:border-gray-600/50" 
        : "border-gray-200/60 bg-gradient-to-br from-white to-gray-50/50 hover:border-gray-300/60"
      } 
      p-6 sm:p-8 h-full shadow-lg backdrop-blur-sm
    `}
  >
    {/* Decorative background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-5 ${
        theme === "dark" ? "bg-blue-400" : "bg-blue-500"
      }`} />
      <div className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-3 ${
        theme === "dark" ? "bg-purple-400" : "bg-purple-500"
      }`} />
    </div>
    
    {/* Header with enhanced styling */}
    <div className="relative z-10 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`
            p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110
            ${theme === "dark" 
              ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400" 
              : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600"
            }
          `}>
            <FiPieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`
              text-xl font-bold tracking-tight transition-colors duration-300
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}>
              Claim Status Distribution
            </h3>
            <p className={`
              text-sm mt-0.5 transition-colors duration-300
              ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
            `}>
              Current period overview
            </p>
          </div>
        </div>
        
        {/* Optional status indicator */}
        <div className={`
          px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
          ${theme === "dark" 
            ? "bg-green-900/30 text-green-300 border border-green-700/50" 
            : "bg-green-50 text-green-700 border border-green-200"
          }
        `}>
          Live Data
        </div>
      </div>
    </div>
    
    {/* Chart container with enhanced styling */}
    <div className="relative z-10">
      <div className={`
        relative rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]
        ${theme === "dark" 
          ? "bg-gray-900/50 border border-gray-700/30" 
          : "bg-gray-50/50 border border-gray-200/30"
        }
      `}>
        <div className="flex items-center justify-center h-[320px] relative">
          {/* Loading shimmer effect placeholder */}
          <div className={`
            absolute inset-4 rounded-xl animate-pulse
            ${theme === "dark" ? "bg-gray-700/20" : "bg-gray-200/30"}
          `} />
          
          {/* Actual chart component */}
          <div className="relative z-10 w-full h-full">
            <ClaimStatusPieChart />
          </div>
        </div>
        
        {/* Chart insights footer */}
        <div className={`
          mt-4 pt-4 border-t transition-colors duration-300
          ${theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"}
        `}>
          <div className="flex items-center justify-between text-sm">
            <span className={`
              font-medium transition-colors duration-300
              ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
            `}>
              Total Claims Processed
            </span>
            <span className={`
              font-bold transition-colors duration-300
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}>
              12,847
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className={`
              font-medium transition-colors duration-300
              ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
            `}>
              Processing Rate
            </span>
            <span className={`
              font-bold text-green-500 transition-colors duration-300
            `}>
              +5.2%
            </span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Hover effect overlay */}
    <div className={`
      absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
      ${theme === "dark" 
        ? "bg-gradient-to-r from-blue-600/5 to-purple-600/5" 
        : "bg-gradient-to-r from-blue-500/5 to-purple-500/5"
      }
    `} />
  </div>
</div>

            <div className="col-span-12">
              {/* User Growth Chart */}
              <div
  className={`
    rounded-xl 
    p-6 
    shadow-lg 
    transition-all 
    duration-300 
    hover:shadow-xl
    ${
      theme === "dark"
        ? "bg-gray-900 border-t-4 border-emerald-500"
        : "bg-white border-t-4 border-emerald-400"
    }
  `}
>
  {/* Card Header */}
  <div className="flex items-start justify-between mb-6">
    {/* Title and Subtitle */}
    <div>
      <h3
        className={`
          text-xl 
          font-bold 
          tracking-tight
          ${theme === "dark" ? "text-gray-100" : "text-gray-800"}
        `}
      >
        Policy Growth
      </h3>
      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        New policies created this month
      </p>
    </div>
    
    {/* Icon */}
    <div
      className={`
        flex
        items-center
        justify-center
        p-2 
        rounded-lg
        ${
          theme === "dark" 
            ? "bg-gray-800 text-emerald-400" 
            : "bg-emerald-50 text-emerald-500"
        }
      `}
    >
      <FiTrendingUp className="w-6 h-6" />
    </div>
  </div>
  
  {/* Chart Component */}
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
                  {policies?.length > 5 && (
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
                      ) : policies?.length > 0 ? (
                        policies
                          ?.slice(0, 5)
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
