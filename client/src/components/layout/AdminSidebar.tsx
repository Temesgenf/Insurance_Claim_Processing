import React from "react";
import { HomeIcon, UsersIcon, DocumentTextIcon, ClipboardIcon, ChartBarIcon, Cog6ToothIcon, CubeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#1a2b3c] text-white shadow-lg flex flex-col z-30">
      <nav className="flex-1">
        <ul className="py-6 space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#24344d] transition-colors duration-200 font-medium"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#24344d] transition-colors duration-200 font-medium"
            >
              <UsersIcon className="h-5 w-5 mr-3" />
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#24344d] transition-colors duration-200 font-medium"
            >
              <CubeIcon className="h-5 w-5 mr-3" />
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/policies"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#24344d] transition-colors duration-200 font-medium"
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Policies
            </Link>
          </li>
          <li>
            <Link
              to="/admin/claims"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#24344d] transition-colors duration-200 font-medium"
            >
              <ClipboardIcon className="h-5 w-5 mr-3" />
              Claims
            </Link>
          </li>
          <li>
            <Link
              to="/admin/analytics"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#24344d] transition-colors duration-200 font-medium"
            >
              <ChartBarIcon className="h-5 w-5 mr-3" />
              Analytics
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#24344d] transition-colors duration-200 font-medium"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
