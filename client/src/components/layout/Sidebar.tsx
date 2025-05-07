import React, { useState } from "react";
import {
  HomeIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  CurrencyDollarIcon,
  BugAntIcon,
  TruckIcon,
  UsersIcon,
  UserGroupIcon,
  GiftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <aside className="h-screen w-64 bg-[#154654] text-white shadow-lg flex flex-col">
      <nav className="flex-1">
        <ul className="py-6 space-y-2">
          <li>
            <a
              href="/user/dashboard"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#0a393f] transition-colors duration-200 font-medium"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </a>
          </li>
          <li className="relative">
            <button
              className="flex items-center w-full px-6 py-3 rounded-lg hover:bg-[#0a393f] transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setProductsOpen((open) => !open)}
              aria-expanded={productsOpen}
            >
              <BuildingStorefrontIcon className="h-5 w-5 mr-3" />
              Products
              <svg
                className={`ml-auto w-5 h-5 transform transition-transform duration-200 ${
                  productsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {productsOpen && (
              <ul className="absolute left-0 mt-2 w-72 bg-gray-300 text-gray-900 rounded-lg shadow-lg z-10 animate-fade-in">
                <li>
                  <a
                    href="/products/critical-care"
                    className="flex items-center gap-3 px-6 py-3 hover:bg-blue-100 rounded-t-lg transition-colors duration-150"
                  >
                    <HeartIcon className="h-5 w-5 text-red-500" />
                    Critical Care Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="/products/hospital-daily-cash"
                    className="flex items-center gap-3 px-6 py-1 hover:bg-blue-100 transition-colors duration-150"
                  >
                    <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                    Hospital Daily Cash Benefit Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="/products/vector-care"
                    className="flex items-center gap-3 px-6 py-1 hover:bg-blue-100 transition-colors duration-150"
                  >
                    <BugAntIcon className="h-5 w-5 text-purple-600" />
                    Vector Care Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="/products/ambulance-service"
                    className="flex items-center gap-3 px-6 py-1 hover:bg-blue-100 transition-colors duration-150"
                  >
                    <TruckIcon className="h-5 w-5 text-blue-500" />
                    Ambulance Service for Hospital Assistance Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="/products/family-health-protection"
                    className="flex items-center gap-3 px-6 py-1 hover:bg-blue-100 transition-colors duration-150"
                  >
                    <UsersIcon className="h-5 w-5 text-pink-600" />
                    Family Health Protection Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="/products/senior-citizen-health"
                    className="flex items-center gap-3 px-6 py-1 hover:bg-blue-100 transition-colors duration-150"
                  >
                    <UserGroupIcon className="h-5 w-5 text-yellow-600" />
                    Senior Citizen Health Cover Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="/products/maternity-child-care"
                    className="flex items-center gap-3 px-6 py-1 hover:bg-blue-100 transition-colors duration-150"
                  >
                    <GiftIcon className="h-5 w-5 text-pink-400" />
                    Maternity & Child Care Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="/products/personal-accident"
                    className="flex items-center gap-3 px-6 py-1 hover:bg-blue-100 transition-colors duration-150"
                  >
                    <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
                    Personal Accident Protection Insurance
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a
              href="/policies"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-green-300 transition-colors duration-200 font-medium"
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Policies
            </a>
          </li>
          <li>
            <a
              href="/user/claims"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#0a393f] transition-colors duration-200 font-medium"
            >
              <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
              Claims
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
