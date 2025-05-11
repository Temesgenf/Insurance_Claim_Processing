import Sidebar from "../components/layout/Sidebar";
import Button from "../components/ui/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPolicies } from "../services/policyService";

const columns = [
  "Policy Number",
  "Product Id",
  "Status",
  "Start Date",
  "End Date",
];

export interface Policy {
  policyId: string;
  policyNumber: string;
  productId: string;
  startDate: Date;
  endDate: Date;
}

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

const PoliciesPage = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await getAllPolicies();
        console.log("Policies response:", response.data);
        const policiesData = response.data;
        const mappedPolicies = policiesData.map((policy: any) => ({
          policyId: policy.policyId,
          policyNumber: policy.policyNumber,
          productId: policy.productId,
          status: policy.status,
          startDate: policy.startDate,
          endDate: policy.endDate,
        }));
        console.log("Mapped policies:", mappedPolicies);
        setPolicies(mappedPolicies);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchPolicies();
  }, []);

  return (
    <main className="flex flex-claim">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen p-10">
        <h1 className="font-bold text-[1.5rem]">Policies</h1>
        <div className="mt-5">
          <Button
            onClick={() => navigate("/user/new-policy")}
            text="Create a New Policy"
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
              {policies.map((policy, idx) => (
                <tr key={idx}>
                  {columns.map((col, colIdx) => {
                    if (col === "Status") {
                      return (
                        <td
                          key={colIdx}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              policy.status
                            )}`}
                          >
                            {policy.status}
                          </span>
                        </td>
                      );
                    }
                    const fieldMap: Record<string, string> = {
                      "Policy Number": "policyNumber",
                      "Product Id": "productId",
                      "Start Date": "startDate",
                      "End Date": "endDate",
                    };
                    const field =
                      fieldMap[col] || col.toLowerCase().replace(/ /g, "_");
                    const value = policy[field as keyof Policy];
                    return (
                      <td
                        key={colIdx}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {value}
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

export default PoliciesPage;
