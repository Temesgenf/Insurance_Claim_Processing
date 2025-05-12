const ClaimTable = () => {
  const policies = [
    {
      policyNumber: "Q-2020-139",
      namedInsured: "Joe Insured",
      policyType: "Commercial General Liability",
      status: "Active",
      effectiveDate: "03/30/2020",
      reviewState: "Not Requested",
    },
    {
      policyNumber: "Q-2020-138",
      namedInsured: "Anderson, Oberbrunner and Keeling",
      policyType: "Commercial General Liability",
      status: "Submitted",
      effectiveDate: "03/26/2020",
      reviewState: "Not Requested",
    },
    {
      policyNumber: "Q-2020-137",
      namedInsured: "Dicki Inc",
      policyType: "Commercial General Liability",
      status: "Unsubmitted",
      effectiveDate: "03/26/2020",
      reviewState: "Not Requested",
    },
    {
      policyNumber: "Q-2020-136",
      namedInsured: "Joe Insured",
      policyType: "Homeowners Form 2",
      status: "Submitted",
      effectiveDate: "03/26/2020",
      reviewState: "Not Requested",
    },
    {
      policyNumber: "P-2020-67",
      namedInsured: "Elchmann, Ritchie and Funk",
      policyType: "Workers Compensation",
      status: "Active",
      effectiveDate: "03/25/2020",
      reviewState: "Not Requested",
    },
    {
      policyNumber: "P-2020-68",
      namedInsured: "Jill Insured",
      policyType: "Homeowners Form 2",
      status: "Active",
      effectiveDate: "03/25/2020",
      reviewState: "Not Requested",
    },
    {
      policyNumber: "P-2020-66",
      namedInsured: "Mr. Randall Pacocha",
      policyType: "Dwelling Fire - Form 1",
      status: "Active",
      effectiveDate: "03/24/2020",
      reviewState: "Not Requested",
    },
    {
      policyNumber: "Q-2020-132",
      namedInsured: "",
      policyType: "Dwelling Fire - Form 1",
      status: "Unsubmitted",
      effectiveDate: "03/24/2020",
      reviewState: "Not Requested",
    },
  ];

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
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Policy Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Named Insured
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Policy Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Effective Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Review State
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {policies.map((policy, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {policy.policyNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {policy.namedInsured}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {policy.policyType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      policy.status
                    )}`}
                  >
                    {policy.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {policy.effectiveDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {policy.reviewState}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Activate
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Go to Settings
        </button>
      </div>
    </div>
  );
};

export default ClaimTable;
