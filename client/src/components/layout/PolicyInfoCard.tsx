import React from "react";

interface PolicyInfoCardProps {
  onSearch?: () => void;
}

const PolicyInfoCard: React.FC<PolicyInfoCardProps> = ({ onSearch }) => {
  return (
    <div className="flex flex-col border border-gray-200 shadow-md min-h-[10rem]">
      <div className="bg-gray-100 p-2">
        <h1 className="font-bold">Policy Information</h1>
      </div>
      <div className="p-2 pb-8 pt-4 space-y-2">
        <p>Policy Search</p>
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
            onClick={onSearch}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Search
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default PolicyInfoCard;
