import Sidebar from "../components/layout/Sidebar";
import Button from "../components/ui/Button";
import { useEffect, useState } from "react";
import { getAllClaims } from "../services/claimService";
import { useNavigate } from "react-router-dom";
import { useAnimation } from "framer-motion";

const columns = [
  "Claim Number",
  "Policy ID",
  "Status",
  "Amount Requested",
  "Loss Date",
  "Loss Time",
  "",
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "submitted":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export interface Claim {
  policyId: string;
  treatmentDetails: string;
  amountRequested: number;
  lossDate: string;
  lossTime: string;
  createdAt: string;
  user: object;
}

const ClaimsPage = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await getAllClaims();
        const claimsData = response.data;
        console.log("Fetched claims:", claimsData);
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
      }
    };
    fetchClaims();
  }, []);

  // Status color logic from Table.tsx
  const getStatusColor = (status: string) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle click for See Detail
  const handleSeeDetail = (claimId: string) => {
    navigate(`/user/claims/${claimId}`);
  };

  return (
    <main className="flex flex-claim">
      <div>
        <Sidebar />
      </div>
      <div className=" w-screen p-10">
        <h1 className="font-bold text-[1.5rem]">Claims</h1>
        <div className="mt-5">
          <Button
            onClick={() => navigate("/user/new-claim")}
            text="Create a New Claim"
          />
        </div>
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claims.map((claim, idx) => (
                <tr key={idx}>
                  {columns.map((col, colIdx) => {
                    // Add a button at the end for 'See Detail'
                    if (col === "") {
                      return (
                        <td
                          key={colIdx}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          <button
                            className="bg-[#154654] opacity-50 hover:bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded"
                            onClick={() => handleSeeDetail(claim.claimId)}
                          >
                            See Detail
                          </button>
                        </td>
                      );
                    }
                    // Map UI column names to backend field names
                    const fieldMap: Record<string, string> = {
                      "Claim Number": "claimNumber",
                      "Policy ID": "policyId",
                      Status: "status",
                      "Amount Requested": "amountRequested",
                      "Loss Date": "lossDate",
                      "Loss Time": "lossTime",
                    };
                    const field =
                      fieldMap[col] || col.toLowerCase().replace(/ /g, "_");
                    let value = claim[field as keyof Claim];
                    // Format dates for readability
                    if (
                      [
                        "lossDate",
                        "lossTime",
                        "createdAt",
                        "updatedAt",
                      ].includes(field) &&
                      value
                    ) {
                      value = new Date(value as string).toLocaleString();
                    }
                    // Format amount
                    if (field === "amountRequested" && value !== undefined) {
                      value = `$${Number(value).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}`;
                    }
                    return (
                      <td
                        key={col}
                        className={
                          field === "status"
                            ? "px-6 py-4 whitespace-nowrap"
                            : field === "claimNumber"
                            ? "px-6 py-4 whitespace-nowrap text-sm font-medium text-[#099ab3]"
                            : "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        }
                      >
                        {field === "status" ? (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              claim.status
                            )}`}
                          >
                            {claim.status}
                          </span>
                        ) : (
                          (value as string)
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ClaimsPage;

// const ClaimsPage = () => {
//   const navigate = useNavigate();
//   return (
//     <main className="flex flex-claim">
//       <div>
//         <Sidebar />
//       </div>
//       <div className=" w-screen p-10">
//         <h1 className="font-bold text-[1.5rem]">Claims</h1>
//         <div className="mt-5">
//           <Button
//             onClick={() => navigate("/user/new-claim")}
//             text="Create a New Claim"
//           />
//         </div>
//         <div>
//           <Table columns={columns} data={claims} />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ClaimsPage;
