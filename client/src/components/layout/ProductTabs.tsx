import React, { useState } from "react";
import {
  FaShieldAlt,
  FaMoneyBillWave,
  FaListUl,
  FaCheckCircle,
} from "react-icons/fa";
import type { Product } from "../../../../types/product.enum";

const TAB_LIST = [
  { key: "overview", label: "Overview" },
  { key: "coverages", label: "Coverages" },
  { key: "keyFeatures", label: "Key Features" },
];

interface ProductTabsProps {
  product: Product; // Replace 'any' with actual Product type if available
}

const formatCurrency = (value: number) =>
  value
    ? value.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "-";

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const safeBenefits = Array.isArray(product.keyBenefits)
    ? product.keyBenefits
    : [];

  return (
    <div className=" mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header Card */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-gradient-to-r from-green-50 to-yellow-50 border-b">
        <div className="flex items-center gap-4">
          <FaShieldAlt className="text-[#154654] text-4xl" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {product.productName}
            </h1>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span className="bg-green-100 px-2 py-1 rounded font-semibold">
                Code: {product.productCode}
              </span>
              <span className="bg-yellow-100 px-2 py-1 rounded font-semibold">
                ID: {product.productId}
              </span>
              <span className="bg-blue-100 px-2 py-1 rounded font-semibold">
                Premium Rate: {product.premiumRate}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-w-[180px]">
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-400" />
            <span className="text-gray-700 font-medium">Sum Insured:</span>
            <span className="font-bold text-lg text-green-700">
              {formatCurrency(product.sumInsured)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-yellow-400" />
            <span className="text-gray-700 font-medium">Base Premium:</span>
            <span className="font-bold text-lg text-yellow-700">
              {formatCurrency(product.basePremium)}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-yellow-400 bg-white rounded-t-xl overflow-x-auto px-4 pt-4">
        {TAB_LIST.map((tab) => (
          <button
            key={tab.key}
            className={`px-6 py-2 text-base font-semibold focus:outline-none transition-colors duration-200 mr-2 mb-2 rounded-t-xl
              ${
                activeTab === tab.key
                  ? "bg-[#154654] text-white shadow-sm"
                  : "bg-white text-black hover:bg-blue-100 hover:text-[#154654]"
              }
            `}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaListUl className="text-green-400" /> Product Overview
            </h2>
            <p className="text-gray-800 text-lg mb-6">{product.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-4 flex flex-col gap-2 border border-green-100">
                <span className="text-gray-600 font-semibold">
                  Product Code
                </span>
                <span className="text-xl font-bold">{product.productCode}</span>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 flex flex-col gap-2 border border-yellow-100">
                <span className="text-gray-600 font-semibold">
                  Premium Rate
                </span>
                <span className="text-xl font-bold">{product.premiumRate}</span>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 flex flex-col gap-2 border border-blue-100">
                <span className="text-gray-600 font-semibold">Sum Insured</span>
                <span className="text-xl font-bold">
                  {formatCurrency(product.sumInsured)}
                </span>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 flex flex-col gap-2 border border-orange-100">
                <span className="text-gray-600 font-semibold">
                  Base Premium
                </span>
                <span className="text-xl font-bold">
                  {formatCurrency(product.basePremium)}
                </span>
              </div>
            </div>
          </div>
        )}
        {activeTab === "coverages" && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-green-400" /> Coverages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(product.coverages) && product.coverages.length > 0 ? (
                product.coverages.map((c: string, i: number) => (
                  <div
                    key={i}
                    className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-gray-800">{c}</span>
                  </div>
                ))
              ) : (
                <span className="text-gray-500">
                  No coverage details available.
                </span>
              )}
            </div>
          </div>
        )}
        {activeTab === "keyFeatures" && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaListUl className="text-yellow-400" /> Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safeBenefits.length > 0 ? (
                safeBenefits.map((f: string, i: number) => (
                  <div
                    key={i}
                    className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-yellow-500" />
                    <span className="text-gray-800">{f}</span>
                  </div>
                ))
              ) : (
                <span className="text-gray-500">
                  No key features available.
                </span>
              )}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ProductTabs;
