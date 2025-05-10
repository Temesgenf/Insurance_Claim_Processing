import React, { useState } from "react";
import AdminSidebar from "../components/layout/AdminSidebar";

const initialSettings = {
  approvalThreshold: 10000,
  notifications: true,
  adminEmail: "admin@email.com",
  maintenanceMode: false,
};

const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState(initialSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    alert("Settings saved (simulation)");
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 ml-64">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Settings</h1>
        <form onSubmit={handleSubmit} className="max-w-xl bg-white p-8 rounded-xl shadow space-y-6">
          <div>
            <label className="block font-semibold mb-2">Claim Approval Threshold (ETB)</label>
            <input
              type="number"
              name="approvalThreshold"
              value={settings.approvalThreshold}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="font-semibold">Enable Notifications</label>
          </div>
          <div>
            <label className="block font-semibold mb-2">Admin Email</label>
            <input
              type="email"
              name="adminEmail"
              value={settings.adminEmail}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="font-semibold">Enable Maintenance Mode</label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mt-4"
          >
            Save Settings
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminSettingsPage;
