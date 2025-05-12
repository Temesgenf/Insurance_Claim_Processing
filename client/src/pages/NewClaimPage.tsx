import { useState } from "react";
import ClaimInfoCard from "../components/layout/ClaimInfoCard";
import Sidebar from "../components/layout/Sidebar";
import { createClaim } from "../services/claimService";
import { useNavigate } from "react-router-dom";
import type { Policy } from "./PoliciesPage";
import { getPolicyByPolicyNumber } from "../services/policyService";
import { getProductById } from "../services/productService";
import type { Product } from "../types/product";

export const NewClaimPage = () => {
  const [showDetails, setShowDetails] = useState(false);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    policyId: "",
    treatmentDetails: "",
    amountRequested: 0,
    lossDate: "",
    lossTime: "",
    policyNumber: "",
  });
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Image upload state
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Handle image upload and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
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
    try {
      const response = await getPolicyByPolicyNumber(form.policyNumber);
      if (!response.data) {
        setError("Policy not found.");
        return;
      }
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
      if (!response.data) {
        setError("Policy not found.");
      }
    } catch {
      setError("Policy not found.");
      setPolicy(null);
      setProduct(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createClaim({
        policyId: policy?.policyId || "",
        amountRequested: form.amountRequested,
        lossDate: new Date(form.lossDate),
        lossTime: new Date(`1970-01-01T${form.lossTime}:00Z`),
        treatmentDetails: form.treatmentDetails,
      });
      navigate("/user/claims");
    } catch (err: any) {
      setError(err?.message || "Failed to create policy");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "unsubmitted":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="flex flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen p-10">
        <h1 className="text-[2rem]">File a claim</h1>
        {!showDetails ? (
          <section className="flex flex-row mt-10 gap-5">
            <div className="flex-1">
              <div className="border border-gray-200 shadow-md p-8 rounded-lg bg-white">
                <h2 className="text-xl font-bold mb-4">Search for a Policy</h2>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Enter Policy Number"
                    className="px-4 py-2 border border-gray-300 rounded-md text-base"
                    value={form.policyNumber}
                    onChange={(e) =>
                      setForm({ ...form, policyNumber: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#154654] text-white rounded-md hover:bg-[#0e2c38] font-semibold"
                    onClick={handlePolicySearch}
                  >
                    Search
                  </button>
                  {error && (
                    <div className="text-red-600 font-medium mt-2">{error}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <ClaimInfoCard />
            </div>
          </section>
        ) : (
          <section className="flex flex-row mt-5 gap-5">
            {/* Policy Information */}
            <div className="flex-1 border border-gray-200 shadow-md min-h-[10rem]">
              <div className="bg-gray-100 p-2 px-4">
                <h1 className="font-bold">Policy Information</h1>
              </div>
              <div className="p-4 gap-3 flex flex-col">
                {error && (
                  <div className="mb-2 text-red-600 font-medium">{error}</div>
                )}
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Policy Search</p>
                  <div className="flex flex-row gap-2">
                    <input
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setForm({ ...form, policyNumber: e.target.value })
                      }
                      value={form.policyNumber}
                      className=" px-4 text-sm text-gray-700 placeholder-gray-400
                bg-white border border-gray-300 rounded-md transition-all duration-200
                hover:border-[#154654] focus:outline-none focus:ring-2
                focus:ring-[#154654]/20 focus:border-[#154654]"
                      placeholder="Policy Number"
                    />
                    <button
                      type="button"
                      onClick={handlePolicySearch}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Policy Number
                  </label>
                  <div className="text-[#099ab3] font-bold">
                    {policy?.policyNumber}
                  </div>
                </div>
                {product && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium">
                      Product Details
                    </label>
                    <div className="text-gray-700 text-sm">
                      <div>
                        <b>Name:</b> {product.productName}
                      </div>
                      <div>
                        <b>Code:</b> {product.productCode}
                      </div>
                      <div>
                        <b>Sum Insured:</b> {product.sumInsured}
                      </div>
                      <div>
                        <b>Base Premium:</b> {product.basePremium}
                      </div>
                      <div>
                        <b>Premium Rate:</b> {product.premiumRate}
                      </div>
                      <div>
                        <b>Description:</b> {product.description}
                      </div>
                    </div>
                  </div>
                )}
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Policy Status
                  </label>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      "active"
                    )}`}
                  >
                    {policy?.status}
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    {policy?.startDate}
                  </label>
                  <div>2022-08-09</div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    {policy?.endDate}
                  </label>
                  <div>2023-08-09</div>
                </div>
              </div>
            </div>
            {/* Claim Information */}
            <div className="flex-1 border border-gray-200 shadow-md min-h-[10rem]">
              <div className="bg-gray-100 p-2 px-4">
                <h1 className="font-bold">Claim Information</h1>
              </div>{" "}
              <div className="p-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17v-2a4 4 0 014-4h3m4 4v6a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h5"
                    />
                  </svg>
                  Claim Information
                </h2>
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  onSubmit={handleSubmit}
                >
                  {/* Loss Date */}
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-400 pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10m-9 8h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <input
                      type="date"
                      id="lossDate"
                      name="lossDate"
                      placeholder=" "
                      className="peer block w-full rounded-lg border border-gray-300 px-10 pt-4 pb-1 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={form.lossDate}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="lossDate"
                      className="absolute left-10 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                    >
                      Loss Date
                    </label>
                  </div>
                  {/* Loss Time */}
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-400 pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <input
                      type="time"
                      id="lossTime"
                      name="lossTime"
                      placeholder=" "
                      className="peer block w-full rounded-lg border border-gray-300 px-10 pt-4 pb-1 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={form.lossTime}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="lossTime"
                      className="absolute left-10 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                    >
                      Loss Time
                    </label>
                  </div>
                  {/* Amount Requested */}
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-gray-400 pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8"
                        />
                      </svg>
                    </span>
                    <input
                      type="number"
                      id="amountRequested"
                      name="amountRequested"
                      min="0"
                      step="0.01"
                      placeholder=" "
                      className="peer block w-full rounded-lg border border-gray-300 px-10 pt-4 pb-1 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      value={form.amountRequested}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="amountRequested"
                      className="absolute left-10 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                    >
                      Amount Requested
                    </label>
                  </div>
                  {/* Treatment Details */}
                  <div className="relative md:col-span-2">
                    <textarea
                      id="treatmentDetails"
                      name="treatmentDetails"
                      rows={3}
                      placeholder=" "
                      className="peer block w-full rounded-lg border border-gray-300 px-4 pt-6 pb-2 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none"
                      value={form.treatmentDetails}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="treatmentDetails"
                      className="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                    >
                      Treatment Details
                    </label>
                  </div>
                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Upload Supporting Images (optional)
                    </label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#154654] rounded-lg p-6 bg-white hover:bg-[#e8f1f5] transition cursor-pointer">
                      <svg
                        className="w-12 h-12 mb-2"
                        style={{ color: "#154654" }}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16l-4-4m0 0l4-4m-4 4h18"
                        />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="imageUpload"
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor="imageUpload"
                        className="font-medium cursor-pointer"
                        style={{ color: "#154654" }}
                      >
                        Click to upload or drag & drop
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, JPEG up to 10MB each
                      </p>
                      {/* Image preview container */}
                      {imagePreviews.length > 0 && (
                        <div
                          className="flex flex-wrap gap-2 mt-4"
                          id="imagePreviewContainer"
                        >
                          {imagePreviews.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt={`preview-${idx}`}
                              className="w-20 h-20 object-cover rounded shadow"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Submit Button */}
                  <div className="md:col-span-2 flex justify-center mt-8">
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-2 bg-[#154654] text-white rounded-lg shadow hover:bg-[#0e2c38] transition disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-base"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
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
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                      ) : null}
                      Submit Claim
                    </button>
                  </div>
                  {error && (
                    <div className="md:col-span-2 mt-4 text-red-600 font-medium">
                      {error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default NewClaimPage;
