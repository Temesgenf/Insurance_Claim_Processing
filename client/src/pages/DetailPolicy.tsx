import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import {
  FaArrowLeft,
  FaFileAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";
import { getPolicyById } from "../services/policyService";

interface Policy {
  policyId: number;
  policyNumber: string;
  policyType: string;
  coverageAmount: number;
  premium: number;
  startDate: string;
  endDate: string;
  coverageDetails: string;
  isActive: boolean;
  createdAt: string;
}

const DetailPolicy: React.FC = () => {
  const { theme } = useTheme();
  const { policyId } = useParams<{ policyId: string }>();
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper functions for theme-based styling
  const getBgColor = () => (theme === "dark" ? "bg-gray-900" : "bg-gray-50");
  const getCardBgColor = () => (theme === "dark" ? "bg-gray-800" : "bg-white");
  const getTextColor = () =>
    theme === "dark" ? "text-gray-100" : "text-gray-800";
  const getSubTextColor = () =>
    theme === "dark" ? "text-gray-300" : "text-gray-600";
  const getBorderColor = () =>
    theme === "dark" ? "border-gray-700" : "border-gray-200";
  const getHeaderBgColor = () =>
    theme === "dark" ? "bg-gray-700" : "bg-gray-50";
  const getIconColor = () =>
    theme === "dark" ? "text-brand-400" : "text-brand-500";

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);

        const response = await getPolicyById(policyId || "");
        console.log(response);
        setPolicy(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching policy:", err);
        setError("Failed to load policy details. Please try again later.");
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [policyId]);

  if (loading) {
    return (
      <div
        className={`min-h-screen ${getBgColor()} flex items-center justify-center`}
      >
        <div className="text-center">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
              theme === "dark" ? "border-brand-400" : "border-brand-500"
            } mx-auto`}
          ></div>
          <p className={`mt-4 ${getSubTextColor()}`}>
            Loading policy details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen ${getBgColor()} flex items-center justify-center`}
      >
        <div
          className={`${getCardBgColor()} p-8 rounded-lg shadow-md max-w-md w-full`}
        >
          <div className="text-red-500 text-center mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2
            className={`text-xl font-semibold text-center ${getTextColor()} mb-4`}
          >
            Error
          </h2>
          <p className={`${getSubTextColor()} text-center`}>{error}</p>
          <div className="mt-6 text-center">
            <Link
              to="/user/dashboard"
              className={`${
                theme === "dark" ? "text-brand-400" : "text-brand-500"
              } hover:${
                theme === "dark" ? "text-brand-300" : "text-brand-600"
              } font-medium`}
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div
        className={`min-h-screen ${getBgColor()} flex items-center justify-center`}
      >
        <div
          className={`${getCardBgColor()} p-8 rounded-lg shadow-md max-w-md w-full`}
        >
          <div className="text-yellow-500 text-center mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2
            className={`text-xl font-semibold text-center ${getTextColor()} mb-4`}
          >
            Policy Not Found
          </h2>
          <p className={`${getSubTextColor()} text-center`}>
            The policy you're looking for doesn't exist or you don't have
            permission to view it.
          </p>
          <div className="mt-6 text-center">
            <Link
              to="/dashboard"
              className={`${
                theme === "dark" ? "text-brand-400" : "text-brand-500"
              } hover:${
                theme === "dark" ? "text-brand-300" : "text-brand-600"
              } font-medium`}
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className={`min-h-screen ${getBgColor()} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/user/policies"
            className={`inline-flex items-center ${
              theme === "dark" ? "text-brand-400" : "text-brand-500"
            } hover:${theme === "dark" ? "text-brand-300" : "text-brand-600"}`}
          >
            <FaArrowLeft className="mr-2" />
            Back to Policies
          </Link>
        </div>

        <div
          className={`${getCardBgColor()} shadow-xl rounded-lg overflow-hidden ${getBorderColor()} border`}
        >
          {/* Policy Header */}
          <div
            className={`${
              theme === "dark" ? "bg-brand-800" : "bg-brand-600"
            } text-white px-6 py-4`}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                Policy #{policy.policyNumber}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  policy.isActive
                    ? theme === "dark"
                      ? "bg-green-900 text-green-200"
                      : "bg-green-100 text-green-800"
                    : theme === "dark"
                    ? "bg-red-900 text-red-200"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {policy.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-brand-100 mt-1">{policy.policyType} Insurance</p>
          </div>

          {/* Policy Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`${getHeaderBgColor()} p-4 rounded-lg ${getBorderColor()} border`}
              >
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className={`${getIconColor()} mr-2`} />
                  <h3 className={`text-lg font-semibold ${getTextColor()}`}>
                    Coverage Period
                  </h3>
                </div>
                <p className={`${getSubTextColor()}`}>
                  <span className="block">
                    From: {formatDate(policy.startDate)}
                  </span>
                  <span className="block">
                    To: {formatDate(policy.endDate)}
                  </span>
                </p>
              </div>

              <div
                className={`${getHeaderBgColor()} p-4 rounded-lg ${getBorderColor()} border`}
              >
                <div className="flex items-center mb-2">
                  <FaMoneyBillWave className={`${getIconColor()} mr-2`} />
                  <h3 className={`text-lg font-semibold ${getTextColor()}`}>
                    Financial Details
                  </h3>
                </div>
                <p className={`${getSubTextColor()}`}>
                  <span className="block">
                    Coverage Amount: {formatCurrency(policy.coverageAmount)}
                  </span>
                  <span className="block">
                    Premium: {formatCurrency(policy.premium)} / month
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-3">
                <FaShieldAlt className={`${getIconColor()} mr-2`} />
                <h3 className={`text-lg font-semibold ${getTextColor()}`}>
                  Coverage Details
                </h3>
              </div>
              <div
                className={`${getHeaderBgColor()} p-4 rounded-lg ${getBorderColor()} border`}
              >
                <p className={`${getSubTextColor()} whitespace-pre-line`}>
                  {policy.coverageDetails}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-3">
                <FaFileAlt className={`${getIconColor()} mr-2`} />
                <h3 className={`text-lg font-semibold ${getTextColor()}`}>
                  Policy Information
                </h3>
              </div>
              <div
                className={`${getHeaderBgColor()} p-4 rounded-lg ${getBorderColor()} border`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Policy ID
                    </p>
                    <p className={`${getTextColor()}`}>{policy.policyId}</p>
                  </div>
                  <div>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Policy Created
                    </p>
                    <p className={`${getTextColor()}`}>
                      {formatDate(policy.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to={`/policies/${policy.policyId}/file-claim`}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  theme === "dark"
                    ? "bg-brand-600 hover:bg-brand-500"
                    : "bg-brand-500 hover:bg-brand-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500`}
              >
                File a Claim
              </Link>
              <Link
                to={`/policies/${policy.policyId}/documents`}
                className={`inline-flex items-center px-4 py-2 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500`}
              >
                View Documents
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPolicy;
