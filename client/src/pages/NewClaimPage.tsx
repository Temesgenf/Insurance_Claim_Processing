import { useState } from "react";
import ClaimInfoCard from "../components/layout/ClaimInfoCard";
import PolicyInfoCard from "../components/layout/PolicyInfoCard";
import Sidebar from "../components/layout/Sidebar";

const NewClaimPage = () => {
  const [showDetails, setShowDetails] = useState(false);

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
      <main className="w-screen p-10">
        <h1 className="text-[2rem]">File a claim</h1>
        {!showDetails ? (
          <section className="flex flex-row mt-10 gap-5">
            <div className="flex-1">
              <PolicyInfoCard onSearch={() => setShowDetails(true)} />
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
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Policy Search</p>
                  <div className="flex flex-row gap-2">
                    <input
                      type="text"
                      className=" px-4 text-sm text-gray-700 placeholder-gray-400
                bg-white border border-gray-300 rounded-md transition-all duration-200
                hover:border-[#154654] focus:outline-none focus:ring-2
                focus:ring-[#154654]/20 focus:border-[#154654]"
                      placeholder="Policy Number"
                    />
                    <button
                      onClick={() => setShowDetails(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      Search
                    </button>{" "}
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Policy Number
                  </label>
                  <div className="text-[#099ab3] font-bold">P-2022-103</div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Policy Status
                  </label>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      "active"
                    )}`}
                  >
                    Active
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Term Effective Date
                  </label>
                  <div>2022-08-09</div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Term Expiration Date
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
              <div className="p-4">
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Claim Status
                  </label>
                  <div className="text-yellow-700 font-semibold">
                    Pending, Unsubmitted
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <div>
                    <label className="block text-sm font-medium">
                      Loss Date
                    </label>
                    <input
                      type="date"
                      className="border rounded px-2 py-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Loss Time
                    </label>
                    <input
                      type="time"
                      className="border rounded px-2 py-1 w-full"
                    />
                    <div className="flex gap-2 mt-1">
                      <label className="inline-flex items-center text-xs">
                        <input
                          type="radio"
                          name="am_pm"
                          value="am"
                          className="mr-1"
                        />
                        a.m.
                      </label>
                      <label className="inline-flex items-center text-xs">
                        <input
                          type="radio"
                          name="am_pm"
                          value="pm"
                          className="mr-1"
                        />
                        p.m.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Property</label>
                  <select className="border rounded px-2 py-1 w-full">
                    <option>Choose a Property</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Loss Cause(s)
                  </label>
                  <select className="border rounded px-2 py-1 w-full">
                    <option>Select Loss Cause</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Loss Description/Remarks
                  </label>
                  <textarea
                    className="border rounded px-2 py-1 w-full"
                    rows={2}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Additional Information
                  </label>
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    placeholder="(Example: Point-of-Contact Name/Phone)"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">
                    Police/Fire Dept. to Which Reported
                  </label>
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </main>
  );
};

export default NewClaimPage;
