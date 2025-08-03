import React, { useMemo, useCallback } from "react";

type TableProps = {
  columns: string[];
  data: Record<string, string>[];
};

const Table: React.FC<TableProps> = ({ columns, data }) => {
  // Memoize status color function
  const getStatusColor = useCallback((status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return "bg-green-100 text-green-800";
      case "submitted": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }, []);

  // Memoize processed data
  const processedData = useMemo(() => 
    data.map(row => ({
      ...row,
      processedRow: columns.map(col => ({
        key: col,
        value: row[col.toLowerCase().replace(/ /g, "_")],
        isStatus: col.toLowerCase() === "status",
        isClaimId: col.toLowerCase() === "claim id"
      }))
    })), [data, columns]);

  return (
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
          {processedData.map((row, idx) => (
            <tr key={idx}>
              {row.processedRow.map((item) => (
                <td
                  key={item.key}
                  className={`${
                    item.isStatus
                      ? `px-6 py-4 whitespace-nowrap`
                      : item.isClaimId
                      ? "px-6 py-4 whitespace-nowrap text-sm font-medium text-[#099ab3]"
                      : "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  }`}
                >
                  {item.isStatus ? (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        item.value
                      )}`}
                    >
                      {item.value}
                    </span>
                  ) : (
                    item.value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);
