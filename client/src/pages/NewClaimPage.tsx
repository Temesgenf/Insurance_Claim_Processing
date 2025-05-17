import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import { createClaim } from "../services/claimService";
import { getPolicyByPolicyNumber } from "../services/policyService";
import { getProductById } from "../services/productService";
import type { Policy } from "./PoliciesPage";
import type { Product } from "../types/product";
import AppSidebar from "../components/layout/AppSidebar";
import ClaimInfoCard from "../components/layout/ClaimInfoCard";
import PageMeta from "../components/common/PageMeta";
import {
  FiSearch,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiUpload,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiFileText,
  FiInfo,
  FiX,
} from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
const NewClaimPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  console.log(user);

  const [form, setForm] = useState({
    policyId: "",
    treatmentDetails: "",
    amountRequested: 0,
    lossDate: null as Date | null,
    lossTime: null as Date | null,
    policyNumber: "",
  });
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Helper functions
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || "";
    if (theme === "dark") {
      switch (statusLower) {
        case "active":
          return "bg-green-900 text-green-200 border-green-800";
        case "pending":
          return "bg-yellow-900 text-yellow-200 border-yellow-800";
        case "inactive":
          return "bg-red-900 text-red-200 border-red-800";
        default:
          return "bg-gray-800 text-gray-200 border-gray-700";
      }
    } else {
      switch (statusLower) {
        case "active":
          return "bg-green-100 text-green-800 border-green-200";
        case "pending":
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "inactive":
          return "bg-red-100 text-red-800 border-red-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    }
  };

  // Fetch policy only when user searches
  const handlePolicySearch = async () => {
    setError("");
    setPolicy(null);
    setProduct(null);
    if (!form.policyNumber) {
      setError("Please enter a policy number.");
      return;
    }

    setLoading(true);
    try {
      const response = await getPolicyByPolicyNumber(form.policyNumber);
      if (!response.data) {
        setError("Policy not found.");
        return;
      }

      // Animate transition to details view
      setShowDetails(true);
      setPolicy(response.data);

      if (response.data && response.data.productId) {
        try {
          const prodRes = await getProductById(Number(response.data.productId));
          setProduct(prodRes.data);
        } catch {
          setProduct(null);
        }
      } else {
        setProduct(null);
      }
    } catch {
      setError("Policy not found.");
      setPolicy(null);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setForm({ ...form, lossDate: date });
  };

  const handleTimeChange = (time: Date | null) => {
    setForm({ ...form, lossTime: time });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setForm({ ...form, amountRequested: parseFloat(value) || 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Validation
    if (!form.treatmentDetails) {
      setError("Please provide treatment details.");
      setSubmitting(false);
      return;
    }

    if (!form.lossDate) {
      setError("Please select a loss date.");
      setSubmitting(false);
      return;
    }

    if (!form.lossTime) {
      setError("Please select a loss time.");
      setSubmitting(false);
      return;
    }

    if (!form.amountRequested || form.amountRequested <= 0) {
      setError("Please enter a valid amount.");
      setSubmitting(false);
      return;
    }

    try {
      await createClaim({
        policyId: policy?.policyId || "",
        amountRequested: form.amountRequested,
        lossDate: form.lossDate as Date,
        lossTime: form.lossTime as Date,
        treatmentDetails: form.treatmentDetails,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/user/claims");
      }, 2000);
    } catch (err: any) {
      setError(err?.message || "Failed to create claim");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (showDetails) {
      setShowDetails(false);
    } else {
      navigate("/user/claims");
    }
  };

  return (
    <>
      <PageMeta
        title="File a New Claim | Insurance Portal"
        description="Submit a new insurance claim for your policy"
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
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className={`mr-4 p-2 rounded-full ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
              } transition-colors`}
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                File a New Claim
              </h1>
              <p
                className={`mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Submit a claim for your existing insurance policy
              </p>
            </div>
          </div>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-6 p-4 rounded-lg flex items-center ${
                  theme === "dark"
                    ? "bg-green-900 text-green-200"
                    : "bg-green-100 text-green-800"
                }`}
              >
                <FiCheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>
                  Your claim has been submitted successfully! Redirecting to
                  claims page...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-6 p-4 rounded-lg flex items-center ${
                  theme === "dark"
                    ? "bg-red-900 text-red-200"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <FiAlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!showDetails ? (
              <motion.div
                key="policy-search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div
                  className={`rounded-xl shadow-md overflow-hidden ${
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div
                    className={`p-5 border-b ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <h2 className="text-xl font-semibold flex items-center">
                      <FiSearch className="mr-2" />
                      Find Your Policy
                    </h2>
                  </div>
                  <div className="p-6">
                    <p
                      className={`mb-4 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Enter your policy number to begin filing a claim. You can
                      find your policy number on your insurance documents.
                    </p>

                    <div className="space-y-4">
                      <div className="relative">
                        <div
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <FiFileText className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Policy Number"
                          className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                            theme === "dark"
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600"
                          } border transition-colors`}
                          value={form.policyNumber}
                          onChange={(e) =>
                            setForm({ ...form, policyNumber: e.target.value })
                          }
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex justify-center items-center ${
                          theme === "dark"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                        onClick={handlePolicySearch}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                            Searching...
                          </>
                        ) : (
                          <>Search Policy</>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-xl shadow-md overflow-hidden ${
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <ClaimInfoCard />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="claim-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Policy Information Card */}
                <div
                  className={`rounded-xl shadow-md overflow-hidden ${
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div
                    className={`p-5 border-b ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <h2 className="text-xl font-semibold flex items-center">
                      <FiFileText className="mr-2" />
                      Policy Information
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Policy Search */}
                    <div className="flex flex-col space-y-2">
                      <label
                        className={`text-sm font-medium ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Policy Search
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <div
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            <FiFileText className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={form.policyNumber}
                            onChange={(e) =>
                              setForm({ ...form, policyNumber: e.target.value })
                            }
                            className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm ${
                              theme === "dark"
                                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600"
                            } border transition-colors`}
                            placeholder="Policy Number"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handlePolicySearch}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            theme === "dark"
                              ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                          } transition-colors`}
                          disabled={loading}
                        >
                          {loading ? "..." : "Search"}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Policy Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6"
                  >
                    {policy && (
                      <div
                        className={`p-4 rounded-lg ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              className={`block text-xs font-medium ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              Policy Number
                            </label>
                            <div
                              className={`mt-1 font-semibold ${
                                theme === "dark"
                                  ? "text-blue-400"
                                  : "text-blue-600"
                              }`}
                            >
                              {policy?.policyNumber || "N/A"}
                            </div>
                          </div>

                          <div>
                            <label
                              className={`block text-xs font-medium ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              Status
                            </label>
                            <div className="mt-1">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                  policy?.status || "unknown"
                                )}`}
                              >
                                {policy?.status || "Unknown"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label
                              className={`block text-xs font-medium ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              Start Date
                            </label>
                            <div
                              className={`mt-1 ${
                                theme === "dark"
                                  ? "text-gray-300"
                                  : "text-gray-700"
                              }`}
                            >
                              {policy?.startDate
                                ? new Date(
                                    policy.startDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </div>
                          </div>

                          <div>
                            <label
                              className={`block text-xs font-medium ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              End Date
                            </label>
                            <div
                              className={`mt-1 ${
                                theme === "dark"
                                  ? "text-gray-300"
                                  : "text-gray-700"
                              }`}
                            >
                              {policy?.endDate
                                ? new Date(policy.endDate).toLocaleDateString()
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Product Details */}
                  {product && (
                    <div className="p-6">
                      <h3
                        className={`text-md font-medium mb-2 ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        Product Details
                      </h3>
                      <div
                        className={`p-4 rounded-lg ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                        } space-y-2`}
                      >
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div>
                            <label
                              className={`block text-xs font-medium ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              Product Name
                            </label>
                            <div
                              className={`mt-1 ${
                                theme === "dark"
                                  ? "text-gray-300"
                                  : "text-gray-700"
                              }`}
                            >
                              {product.productName}
                            </div>
                          </div>

                          <div>
                            <label
                              className={`block text-xs font-medium ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              Product Type
                            </label>
                            <div
                              className={`mt-1 ${
                                theme === "dark"
                                  ? "text-gray-300"
                                  : "text-gray-700"
                              }`}
                            >
                              {product.productType || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Claim Form Card */}
                <div
                  className={`rounded-xl shadow-md overflow-hidden ${
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div
                    className={`p-5 border-b ${
                      theme === "dark"
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <h2 className="text-xl font-semibold flex items-center">
                      <FiFileText className="mr-2" />
                      Claim Details
                    </h2>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Loss Date */}
                    <div>
                      <label
                        htmlFor="lossDate"
                        className={`block text-sm font-medium mb-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Date of Loss <span className="text-red-500">*</span>
                      </label>
                      <DatePicker
                        selected={form.lossDate}
                        onChange={handleDateChange}
                        dateFormat="MMMM d, yyyy"
                        className={`w-full p-3 rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600"
                        } border transition-colors`}
                        placeholderText="Select date of loss"
                      />
                    </div>

                    {/* Loss Time */}
                    <div>
                      <label
                        htmlFor="lossTime"
                        className={`block text-sm font-medium mb-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Time of Loss <span className="text-red-500">*</span>
                      </label>
                      <DatePicker
                        selected={form.lossTime}
                        onChange={handleTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className={`w-full p-3 rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600"
                        } border transition-colors`}
                        placeholderText="Select time of loss"
                      />
                    </div>

                    {/* Amount Requested */}
                    <div>
                      <label
                        htmlFor="amountRequested"
                        className={`block text-sm font-medium mb-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Amount Requested <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <FiDollarSign className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          name="amountRequested"
                          id="amountRequested"
                          value={
                            form.amountRequested > 0
                              ? form.amountRequested.toString()
                              : ""
                          }
                          onChange={handleAmountChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                            theme === "dark"
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600"
                          } border transition-colors`}
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Treatment Details */}
                    <div>
                      <label
                        htmlFor="treatmentDetails"
                        className={`block text-sm font-medium mb-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Treatment Details / Incident Description{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="treatmentDetails"
                        id="treatmentDetails"
                        rows={4}
                        value={form.treatmentDetails}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg ${
                          theme === "dark"
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600 focus:border-blue-600"
                        } border transition-colors resize-none`}
                        placeholder="Describe the incident and treatment received..."
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Upload Supporting Documents (Optional)
                      </label>
                      <div
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                          theme === "dark"
                            ? "border-gray-600 hover:border-gray-500"
                            : "border-gray-300 hover:border-gray-400"
                        } border-dashed rounded-md transition-colors`}
                      >
                        <div className="space-y-1 text-center">
                          <FiUpload
                            className={`mx-auto h-12 w-12 ${
                              theme === "dark"
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className={`relative cursor-pointer rounded-md font-medium ${
                                theme === "dark"
                                  ? "text-blue-400 hover:text-blue-300"
                                  : "text-blue-600 hover:text-blue-500"
                              } focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500`}
                            >
                              <span>Upload files</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleImageChange}
                                multiple
                              />
                            </label>
                            <p
                              className={`pl-1 ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              or drag and drop
                            </p>
                          </div>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-500"
                                : "text-gray-500"
                            }`}
                          >
                            PNG, JPG, PDF up to 10MB
                          </p>
                        </div>
                      </div>
                      {imagePreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview}
                                alt={`preview ${index}`}
                                className="h-32 w-full object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Remove image"
                              >
                                <FiX className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex justify-center items-center ${
                        submitting
                          ? theme === "dark"
                            ? "bg-gray-600 text-gray-400"
                            : "bg-gray-400 text-gray-200"
                          : theme === "dark"
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5"
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
                          Submitting...
                        </>
                      ) : (
                        "Submit Claim"
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Add custom styles for date picker based on theme */}
      <style>{`
        .date-picker-dark .react-datepicker {
          background-color: #1f2937;
          border-color: #4b5563;
        }
        .date-picker-dark .react-datepicker__header {
          background-color: #111827;
          border-color: #4b5563;
        }
        .date-picker-dark.react-datepicker__day-name,
       .date-picker-dark.react-datepicker__day {
          color: #f3f4f6;
        }
       .date-picker-dark.react-datepicker__day--selected,
       .date-picker-dark.react-datepicker__day--in-selecting-range,
       .date-picker-dark.react-datepicker__day--in-range,
      .date-picker-dark.react-datepicker__month-text--selected,
      .date-picker-dark.react-datepicker__month-text--in-selecting-range,
      .date-picker-dark.react-datepicker__month-text--in-range,
      .date-picker-dark.react-datepicker__quarter-text--selected,
     .date-picker-dark.react-datepicker__quarter-text--in-selecting-range,
     .date-picker-dark.react-datepicker__quarter-text--in-range,
     .date-picker-dark.react-datepicker__year-text--selected,
     .date-picker-dark.react-datepicker__year-text--in-selecting-range,
    .date-picker-dark.react-datepicker__year-text--in-range {
          background-color: #4b5563;
          border-color: #4b5563;
          color: #f3f4f6;
        }
      `}</style>
    </>
  );
};

export default NewClaimPage;
