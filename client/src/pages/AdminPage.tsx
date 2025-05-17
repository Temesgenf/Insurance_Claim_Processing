import React from "react";
import AdminSidebar from "../components/layout/AdminSidebar";
import {
  UsersIcon,
  DocumentTextIcon,
  ClipboardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CubeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { getAllUsers } from "../services/userService";
import { getAllPolicies } from "../services/policyService";
import { getAllProducts } from "../services/productService";
import { getAllClaims } from "../services/claimService";

const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const adminCardData = [
    {
      title: "Total Users",
      value: users.length,
      icon: <UsersIcon className="w-8 h-8 text-blue-500" />,
      color: "from-blue-100 to-blue-300",
      link: "/admin/users",
    },
    {
      title: "Total Products",
      value: products.length,
      icon: <CubeIcon className="w-8 h-8 text-pink-500" />,
      color: "from-pink-100 to-pink-300",
      link: "/admin/products",
    },
    {
      title: "Total Policies",
      value: policies.length,
      icon: <DocumentTextIcon className="w-8 h-8 text-green-500" />,
      color: "from-green-100 to-green-300",
      link: "/admin/policies",
    },
    {
      title: "Total Claims",
      value: claims.length,
      icon: <ClipboardIcon className="w-8 h-8 text-indigo-500" />,
      color: "from-indigo-100 to-indigo-300",
      link: "/admin/claims",
    },
    {
      title: "Pending Claims",
      value: claims.filter((claim) => claim.status === "Pending").length,
      icon: <ClipboardIcon className="w-8 h-8 text-yellow-500" />,
      color: "from-yellow-100 to-yellow-300",
      link: "/admin/claims",
    },
    {
      title: "Approved Claims",
      value: claims.filter((claim) => claim.status === "Approved").length,
      icon: <CheckCircleIcon className="w-8 h-8 text-green-600" />,
      color: "from-green-100 to-green-400",
      link: "/admin/claims",
    },
    {
      title: "Rejected Claims",
      value: claims.filter((claim) => claim.status === "Rejected").length,
      icon: <XCircleIcon className="w-8 h-8 text-red-600" />,
      color: "from-red-100 to-red-400",
      link: "/admin/claims",
    },
    {
      title: "Analytics",
      value: "--",
      icon: <ChartBarIcon className="w-8 h-8 text-purple-500" />,
      color: "from-purple-100 to-purple-300",
      link: "/admin/analytics",
    },
    {
      title: "Settings",
      value: "",
      icon: <Cog6ToothIcon className="w-8 h-8 text-gray-500" />,
      color: "from-gray-100 to-gray-300",
      link: "/admin/settings",
    },
  ];

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      // console.log(response.data);
    } catch (err: any) {
      setError("Failed to fetch users");
    }
    setLoading(false);
  };

  const fetchClaims = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllClaims();
      setClaims(response.data);

      console.log(response.data);
    } catch (err: any) {
      setError("Failed to fetch users");
    }
    setLoading(false);
  };
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProducts();
      setProducts(response.data);
      // console.log(response.data);
    } catch (err: any) {
      setError("Failed to fetch users");
    }
    setLoading(false);
  };

  const fetchPolicies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllPolicies();
      setPolicies(response.data);
      // console.log(response.data);
    } catch (err: any) {
      setError("Failed to fetch users");
    }
    setLoading(false);
  };

  const handleSignOut = () => {
    logout(); // clear auth state & tokens
    navigate("/login", { replace: true });
  };

  React.useEffect(() => {
    fetchUsers();
    fetchClaims();
    fetchProducts();
    fetchPolicies();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12 ml-64">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome, {user?.firstName}
            </h1>
            <p className="text-gray-500">
              Overview & management panel for your insurance system.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0 relative">
            {/* Profile dropdown trigger */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-4 hover:bg-gray-100 rounded-lg p-1 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">
                  {user?.firstName}
                </div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-16 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {adminCardData.map((card, idx) => (
            <div
              key={idx}
              onClick={() =>
                card.link && navigate(`${card.link}?status=${card.title}`)
              }
              className={`rounded-2xl shadow-md p-8 bg-gradient-to-br ${card.color} flex flex-col items-start hover:shadow-xl transition group cursor-pointer hover:scale-105`}
              title={card.title}
            >
              <div className="mb-4">{card.icon}</div>
              <div className="text-3xl font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition">
                {card.value}
              </div>
              <div className="text-gray-700 text-base font-medium">
                {card.title}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
