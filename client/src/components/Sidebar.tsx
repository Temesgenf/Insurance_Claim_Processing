import React, { useState } from 'react';
import {
  HomeIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';


const Sidebar: React.FC = () => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-green-500 to-green-700 text-white shadow-lg flex flex-col">
      <nav className="flex-1">
        <ul className="py-6 space-y-2">
          <li>
            <a
              href="/dashboard"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-green-300 transition-colors duration-200 font-medium"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </a>
          </li>
          <li className="relative">
            <button
              className="flex items-center w-full px-6 py-3 rounded-lg hover:bg-green-300 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setProductsOpen((open) => !open)}
              aria-expanded={productsOpen}
            >
              <BuildingStorefrontIcon className="h-5 w-5 mr-3" />
              Products
              <svg
                className={`ml-auto w-5 h-5 transform transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {productsOpen && (
              <ul className="absolute left-0 mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-lg z-10 animate-fade-in">
                <li>
                  <a
                    href="/products/life"
                    className="block px-6 py-3 hover:bg-blue-100 rounded-t-lg transition-colors duration-150"
                  >
                    Life Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="/products/health"
                    className="block px-6 py-3 hover:bg-blue-100 transition-colors duration-150"
                  >
                    Health Insurance
                  </a>
                </li>
                <li>
                  <a
                    href="/products/auto"
                    className="block px-6 py-3 hover:bg-blue-100 rounded-b-lg transition-colors duration-150"
                  >
                    Auto Insurance
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
              href="/claims"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-green-300 transition-colors duration-200 font-medium"
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
