import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import AppSidebar from "../components/layout/AppSidebar";
import ProfilePictureUpload from "../components/user/ProfilePictureUpload";
import axios from "axios";
import { FaCheck, FaSpinner } from "react-icons/fa";
import PageMeta from "../components/common/PageMeta";

const EditProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [pictureUpdated, setPictureUpdated] = useState(false);

  // Helper functions for theme-based styling
  const getBgColor = () => (theme === "dark" ? "bg-gray-900" : "bg-gray-50");
  const getCardBgColor = () => (theme === "dark" ? "bg-gray-800" : "bg-white");
  const getTextColor = () =>
    theme === "dark" ? "text-gray-100" : "text-gray-800";
  const getSubTextColor = () =>
    theme === "dark" ? "text-gray-300" : "text-gray-600";
  const getBorderColor = () =>
    theme === "dark" ? "border-gray-700" : "border-gray-200";
  const getInputBgColor = () => (theme === "dark" ? "bg-gray-700" : "bg-white");
  const getInputBorderColor = () =>
    theme === "dark" ? "border-gray-600" : "border-gray-300";
  const getInputTextColor = () =>
    theme === "dark" ? "text-gray-100" : "text-gray-900";

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        lastName: "", // Assuming lastName might be added to the user object
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(
        `http://localhost:3000/api/users/profile`,
        {
          firstName: form.fullName,
          lastName: form.lastName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 2000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to update profile information"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePictureSuccess = () => {
    setPictureUpdated(true);
    setTimeout(() => setPictureUpdated(false), 3000);
  };

  const handlePictureError = (errorMsg: string) => {
    setError(errorMsg);
  };

  return (
    <div className={`min-h-screen ${getBgColor()}`}>
      <PageMeta
        title="Edit Profile | Insurance Portal"
        description="Update your profile information and profile picture"
      />
      <div className="flex">
        <AppSidebar />
        <div className="flex-1 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-3xl font-bold ${getTextColor()} mb-2`}>
              Edit Profile
            </h1>
            <p className={getSubTextColor()}>
              Update your personal information and profile picture
            </p>

            {success && (
              <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 flex items-center">
                <FaCheck className="mr-3 text-green-500" />
                <div>
                  <p className="font-medium">Profile updated successfully!</p>
                  <p className="text-sm">Redirecting to dashboard...</p>
                </div>
              </div>
            )}

            {pictureUpdated && (
              <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 flex items-center">
                <FaCheck className="mr-3 text-green-500" />
                <p className="font-medium">
                  Profile picture updated successfully!
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Information Form */}
              <div
                className={`${getCardBgColor()} rounded-lg shadow-md p-6 border ${getBorderColor()}`}
              >
                <h3 className={`text-xl font-semibold ${getTextColor()} mb-4`}>
                  Personal Information
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className={`block text-sm font-medium ${getSubTextColor()} mb-1`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={form.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className={`block text-sm font-medium ${getSubTextColor()} mb-1`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium ${getSubTextColor()} mb-1`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      disabled
                      className={`w-full px-4 py-2 rounded-lg border ${getInputBorderColor()} ${getInputBgColor()} opacity-70 ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    />
                    <p className="text-xs mt-1 text-gray-500">
                      Email address cannot be changed
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      theme === "dark"
                        ? "bg-brand-600 hover:bg-brand-500"
                        : "bg-brand-500 hover:bg-brand-600"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 ${
                      loading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </form>
              </div>

              {/* Profile Picture Upload */}
              <ProfilePictureUpload
                onSuccess={handlePictureSuccess}
                onError={handlePictureError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
