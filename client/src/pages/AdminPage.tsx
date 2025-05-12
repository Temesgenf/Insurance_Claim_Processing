import React from 'react';
import AdminSidebar from '../components/layout/AdminSidebar';
import { UsersIcon, DocumentTextIcon, ClipboardIcon, ChartBarIcon, Cog6ToothIcon, CubeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const adminCardData = [
  { title: 'Total Users', value: 120, icon: <UsersIcon className="w-8 h-8 text-blue-500" />, color: 'from-blue-100 to-blue-300', link: '/admin/users' },
  { title: 'Total Products', value: 23, icon: <CubeIcon className="w-8 h-8 text-pink-500" />, color: 'from-pink-100 to-pink-300', link: '/admin/products' },
  { title: 'Total Policies', value: 45, icon: <DocumentTextIcon className="w-8 h-8 text-green-500" />, color: 'from-green-100 to-green-300', link: '/admin/policies' },
  { title: 'Total Claims', value: 230, icon: <ClipboardIcon className="w-8 h-8 text-indigo-500" />, color: 'from-indigo-100 to-indigo-300', link: '/admin/claims' },
  { title: 'Pending Claims', value: 15, icon: <ClipboardIcon className="w-8 h-8 text-yellow-500" />, color: 'from-yellow-100 to-yellow-300', link: '/admin/claims' },
  { title: 'Approved Claims', value: 200, icon: <CheckCircleIcon className="w-8 h-8 text-green-600" />, color: 'from-green-100 to-green-400', link: '/admin/claims' },
  { title: 'Rejected Claims', value: 15, icon: <XCircleIcon className="w-8 h-8 text-red-600" />, color: 'from-red-100 to-red-400', link: '/admin/claims' },
  { title: 'Analytics', value: '--', icon: <ChartBarIcon className="w-8 h-8 text-purple-500" />, color: 'from-purple-100 to-purple-300', link: '/admin/analytics' },
  { title: 'Settings', value: '', icon: <Cog6ToothIcon className="w-8 h-8 text-gray-500" />, color: 'from-gray-100 to-gray-300', link: '/admin/settings' },
];

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12 ml-64">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, Admin!</h1>
            <p className="text-gray-500">Overview & management panel for your insurance system.</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400 flex items-center justify-center">
              <UsersIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">Admin User</div>
              <div className="text-xs text-gray-500">admin@email.com</div>
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {adminCardData.map((card, idx) => (
            <div
              key={idx}
              onClick={() => card.link && navigate(card.link)}
              className={`rounded-2xl shadow-md p-8 bg-gradient-to-br ${card.color} flex flex-col items-start hover:shadow-xl transition group cursor-pointer hover:scale-105`}
              title={card.title}
            >
              <div className="mb-4">{card.icon}</div>
              <div className="text-3xl font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition">{card.value}</div>
              <div className="text-gray-700 text-base font-medium">{card.title}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
