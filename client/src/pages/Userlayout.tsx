// src/layouts/UserLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

const UserLayout: React.FC = () => (
  <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <Sidebar />
    <main className="flex-1 p-6 md:p-10">
      <Outlet />
    </main>
  </div>
);

export default UserLayout;
