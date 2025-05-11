import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Button from "../components/ui/Button";
import { getClaimById } from "../services/claimService";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        // getClaimById may need to accept claimNumber or claimId depending on your backend
        if (!claimNumber) return setClaim(undefined);
        const { data } = await getClaimById(claimNumber);
        setClaim(data as Claim);
      } catch {
        setClaim(undefined);
      }
    };
    if (claimNumber) fetchClaim();
  }, [claimNumber]);

  if (claim === undefined) {
    return <div className="p-10 text-red-500">Claim not found.</div>;
  }

  if (!claim) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <main className="flex flex-claim min-h-screen bg-gray-100">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 w-full p-8 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          {/* <Button text="Back to Claims" onClick={() => navigate(-1)} /> */}
          {/* <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-gray-100 rounded"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            onClick={() => navigate(-1)} // Add onClick method here
            className="cursor-pointer" // Optional: Add a pointer cursor for better UX
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="w-full max-w-3xl mt-6">
          {/* Claim Summary Card */}
          <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col md:flex-row items-center justify-between border-b-4 border-[#154654]">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M9 17H7a2 2 0 01-2-2v-5a2 2 0 012-2h10a2 2 0 012 2v5a2 2 0 01-2 2h-2M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  Claim #{claim.claimNumber}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      claim.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : claim.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : claim.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {claim.status.charAt(0).toUpperCase() +
                      claim.status.slice(1)}
                  </span>
                  <span className="text-gray-400 text-xs">
                    Last updated: {new Date(claim.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col items-end">
              <div className="text-sm text-gray-500">Amount Requested</div>
              <div className="text-3xl font-bold text-[#154654]">
                $
                {Number(claim.amountRequested).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-lg shadow p-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2M19.364 19.364l-1.414-1.414M12 22v-2M4.636 19.364l1.414-1.414M2 12h2M4.636 4.636l1.414 1.414"
                  />
                </svg>
                Policy & Dates
              </h2>
              <div className="mb-3 flex items-center">
                <span className="w-40 text-gray-500 font-medium">
                  Policy ID:
                </span>{" "}
                <span className="text-gray-900">{claim.policyId}</span>
              </div>
              <div className="mb-3 flex items-center">
                <span className="w-40 text-gray-500 font-medium">
                  Loss Date:
                </span>{" "}
                <span className="text-gray-900">
                  {new Date(claim.lossDate).toLocaleString()}
                </span>
              </div>
              <div className="mb-3 flex items-center">
                <span className="w-40 text-gray-500 font-medium">
                  Loss Time:
                </span>{" "}
                <span className="text-gray-900">
                  {new Date(claim.lossTime).toLocaleString()}
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 17l4 4 4-4m-4-5v9"
                  />
                </svg>
                Treatment Details
              </h2>
              <div className="bg-gray-50 rounded p-4 min-h-[80px] text-gray-700">
                {claim.treatmentDetails || (
                  <span className="text-gray-400">N/A</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClaimDetailPage;
