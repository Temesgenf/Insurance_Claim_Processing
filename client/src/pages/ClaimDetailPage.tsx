import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiFileText,
  FiCalendar,
  FiClock,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";
import AppSidebar from "../components/layout/AppSidebar";
import { getClaimById } from "../services/claimService";
import { useTheme } from "../Context/ThemeContext";
import PageMeta from "../components/common/PageMeta";
interface Claim {
  claimId: number;
  claimNumber: string;
  policyId: string;
  status: string;
  treatmentDetails?: string;
  amountRequested: number;
  lossDate: string;
  lossTime: string;
  createdAt: string;
  updatedAt: string;
}

const ClaimDetailPage = () => {
  const { claimNumber } = useParams<{ claimNumber: string }>();
  const [claim, setClaim] = useState<Claim | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        setLoading(true);
        if (!claimNumber) return setClaim(undefined);
        const { data } = await getClaimById(claimNumber);
        setClaim(data as Claim);
      } catch (error) {
        setClaim(undefined);
      } finally {
        setLoading(false);
      }
    };

    if (claimNumber) fetchClaim();
  }, [claimNumber]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return theme === "dark"
          ? "bg-green-900 text-green-200 border-green-700"
          : "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return theme === "dark"
          ? "bg-yellow-900 text-yellow-200 border-yellow-700"
          : "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return theme === "dark"
          ? "bg-red-900 text-red-200 border-red-700"
          : "bg-red-100 text-red-800 border-red-200";
      default:
        return theme === "dark"
          ? "bg-gray-700 text-gray-300 border-gray-600"
          : "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main
        className={`flex min-h-screen ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        <AppSidebar />
        <div className="flex-1 p-6 md:p-8 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 mb-4 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Loading claim details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (claim === undefined) {
    return (
      <main
        className={`flex min-h-screen ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        <AppSidebar />
        <div className="flex-1 p-6 md:p-8 flex justify-center items-center">
          <div
            className={`max-w-md p-6 rounded-lg shadow-lg ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center mb-4">
              <FiAlertCircle
                className={`w-8 h-8 mr-3 ${
                  theme === "dark" ? "text-red-400" : "text-red-500"
                }`}
              />
              <h2 className="text-xl font-bold">Claim Not Found</h2>
            </div>
            <p
              className={`mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              We couldn't find the claim you're looking for. It may have been
              removed or the claim number is incorrect.
            </p>
            <button
              onClick={() => navigate("/user/claims")}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Return to Claims
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <PageMeta
        title={`Claim #${claim?.claimNumber} | Insurance Portal`}
        description="View details of your insurance claim"
      />
      <main
        className={`flex min-h-screen ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        <AppSidebar />
        <div className="flex-1 p-6 md:p-8">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/user/claims")}
              className={`mr-4 p-2 rounded-full ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
              } transition-colors`}
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Claim Details</h1>
              <p
                className={`mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                View information about your insurance claim
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Claim Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`lg:col-span-3 rounded-xl shadow-md overflow-hidden ${
                theme === "dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div
                className={`p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between border-b ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`p-3 rounded-full mr-4 ${
                      theme === "dark" ? "bg-blue-900" : "bg-blue-100"
                    }`}
                  >
                    <FiFileText
                      className={`w-6 h-6 ${
                        theme === "dark" ? "text-blue-300" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      Claim #{claim?.claimNumber}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          claim?.status
                        )}`}
                      >
                        {claim?.status.charAt(0).toUpperCase() +
                          claim?.status.slice(1)}
                      </span>
                      <span
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Submitted on {formatDate(claim?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`mt-4 md:mt-0 p-4 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Amount Requested
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    {formatCurrency(claim?.amountRequested)}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Policy & Dates Section */}
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-4 flex items-center ${
                        theme === "dark" ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <FiInfo className="mr-2" />
                      Policy & Dates
                    </h3>
                    <div
                      className={`space-y-4 p-4 rounded-lg ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Policy ID
                        </span>
                        <span
                          className={`mt-1 ${
                            theme === "dark" ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {claim?.policyId}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span
                          className={`text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Loss Date
                        </span>
                        <span
                          className={`mt-1 flex items-center ${
                            theme === "dark" ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          <FiCalendar className="mr-1 w-4 h-4" />
                          {formatDate(claim?.lossDate)}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span
                          className={`text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Loss Time
                        </span>
                        <span
                          className={`mt-1 flex items-center ${
                            theme === "dark" ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          <FiClock className="mr-1 w-4 h-4" />
                          {formatTime(claim?.lossTime)}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <span
                          className={`text-xs font-medium ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Last Updated
                        </span>
                        <span
                          className={`mt-1 ${
                            theme === "dark" ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {formatDate(claim?.updatedAt)} at{" "}
                          {formatTime(claim?.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Treatment Details Section */}
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-4 flex items-center ${
                        theme === "dark" ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <FiFileText className="mr-2" />
                      Treatment Details
                    </h3>
                    <div
                      className={`p-4 rounded-lg min-h-[200px] ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      {claim?.treatmentDetails ? (
                        <p
                          className={
                            theme === "dark" ? "text-gray-200" : "text-gray-800"
                          }
                        >
                          {claim?.treatmentDetails}
                        </p>
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <span
                            className={`text-sm italic ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            No treatment details provided
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div
                className={`p-6 md:p-8 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Claim Status
                </h3>
                <div className="relative">
                  <div
                    className={`absolute left-4 top-0 bottom-0 w-0.5 ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                  <div className="space-y-6">
                    <div className="relative flex items-start">
                      <div
                        className={`absolute left-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center ${
                          theme === "dark"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <FiFileText className="w-4 h-4" />
                      </div>
                      <div className="ml-12">
                        <h4
                          className={`text-md font-medium ${
                            theme === "dark" ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          Claim Submitted
                        </h4>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {formatDate(claim?.createdAt)} at{" "}
                          {formatTime(claim?.createdAt)}
                        </p>
                      </div>
                    </div>

                    {claim?.status.toLowerCase() !== "pending" && (
                      <div className="relative flex items-start">
                        <div
                          className={`absolute left-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center ${
                            claim?.status.toLowerCase() === "approved"
                              ? theme === "dark"
                                ? "bg-green-900 text-green-300"
                                : "bg-green-100 text-green-600"
                              : theme === "dark"
                              ? "bg-red-900 text-red-300"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {claim?.status.toLowerCase() === "approved" ? (
                            <FiCheckCircle className="w-4 h-4" />
                          ) : (
                            <FiXCircle className="w-4 h-4" />
                          )}
                        </div>
                        <div className="ml-12">
                          <h4
                            className={`text-md font-medium ${
                              theme === "dark"
                                ? "text-gray-200"
                                : "text-gray-800"
                            }`}
                          >
                            Claim{" "}
                            {claim?.status.charAt(0).toUpperCase() +
                              claim?.status.slice(1)}
                          </h4>
                          <p
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {formatDate(claim?.updatedAt)} at{" "}
                            {formatTime(claim?.updatedAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`p-6 md:p-8 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/user/claims")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    Back to Claims
                  </motion.button>

                  {claim?.status.toLowerCase() === "pending" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        theme === "dark"
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      Cancel Claim
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClaimDetailPage;
