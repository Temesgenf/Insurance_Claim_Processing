import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import AppSidebar from "../components/layout/AppSidebar";
import ProfilePictureUpload from "../components/user/ProfilePictureUpload";
import axios from "axios";
import { FaCheck, FaSpinner, FaEnvelope, FaCamera, FaEdit } from "react-icons/fa";
import PageMeta from "../components/common/PageMeta";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";

const EditProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [pictureUpdated, setPictureUpdated] = useState(false);
  const [isHoveringPicture, setIsHoveringPicture] = useState(false);

  // Enhanced theme-based styling
  const getBgColor = () => 
    theme === "dark" 
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
      : "bg-gradient-to-br from-gray-50 via-white to-gray-100";
  
  const getCardBgColor = () => 
    theme === "dark" 
      ? "bg-gray-800/80 backdrop-blur-sm" 
      : "bg-white/80 backdrop-blur-sm";
  
  const getTextColor = () =>
    theme === "dark" ? "text-gray-100" : "text-gray-800";
  
  const getSubTextColor = () =>
    theme === "dark" ? "text-gray-300" : "text-gray-600";
  
  const getBorderColor = () =>
    theme === "dark" ? "border-gray-700/50" : "border-gray-200/50";
  
  const getInputBgColor = () => 
    theme === "dark" ? "bg-gray-700/50" : "bg-gray-50/50";
  
  const getInputBorderColor = () =>
    theme === "dark" ? "border-gray-600/50" : "border-gray-300/50";
  
  const getInputTextColor = () =>
    theme === "dark" ? "text-gray-100" : "text-gray-900";

  const getGradientButton = () =>
    theme === "dark"
      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600";

  useEffect(() => {
    if (user) {
      // Split fullName into first and last name if possible
      const [firstName, ...rest] = (user.fullName || "").split(" ");
      setForm({
        firstName: firstName || "",
        lastName: rest.join(" ") || "",
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
        `${API_BASE_URL}/api/users/profile`,
        {
          firstName: form.firstName,
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
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                <FaEdit className="text-white text-2xl" />
              </div>
              <h1 className={`text-4xl font-bold ${getTextColor()} mb-2`}>
                Edit Profile
              </h1>
              <p className={`${getSubTextColor()} text-lg`}>
                Update your personal information and profile picture
              </p>
            </div>

            {/* Success Messages */}
            {success && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 flex items-center transform animate-pulse shadow-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <FaCheck className="text-white text-sm" />
                </div>
                <div>
                  <p className="font-semibold">Profile updated successfully!</p>
                  <p className="text-sm text-green-600">Redirecting to dashboard...</p>
                </div>
              </div>
            )}

            {pictureUpdated && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 flex items-center transform animate-bounce shadow-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <FaCheck className="text-white text-sm" />
                </div>
                <p className="font-semibold">Profile picture updated successfully!</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 shadow-lg">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information Form - First on large screens */}
              <div className="lg:col-span-2 lg:order-1 order-2">
                <div className={`${getCardBgColor()} rounded-3xl shadow-xl p-8 border ${getBorderColor()}`}>
                  <h3 className={`text-3xl font-bold ${getTextColor()} mb-8 flex items-center`}>
                    <FaEdit className="mr-3 text-blue-500" />
                    Personal Information
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First Name */}
                    <div className="group">
                      <label
                        htmlFor="firstName"
                        className={`block text-sm font-semibold ${getSubTextColor()} mb-2 transition-colors group-focus-within:text-blue-500`}
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400`}
                          required
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="group">
                      <label
                        htmlFor="lastName"
                        className={`block text-sm font-semibold ${getSubTextColor()} mb-2 transition-colors group-focus-within:text-blue-500`}
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400`}
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label
                        htmlFor="email"
                        className={`block text-sm font-semibold ${getSubTextColor()} mb-2 flex items-center`}
                      >
                        <FaEnvelope className="mr-2 text-gray-400" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          disabled
                          className={`w-full px-4 py-3 rounded-xl border-2 ${getInputBorderColor()} ${getInputBgColor()} opacity-60 ${getInputTextColor()} cursor-not-allowed`}
                        />
                        <p className="text-xs mt-2 text-gray-500 flex items-center">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                          Email address cannot be changed
                        </p>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center px-6 py-4 rounded-xl shadow-lg text-lg font-semibold text-white ${getGradientButton()} focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 ${
                          loading ? "opacity-75 cursor-not-allowed scale-100" : ""
                        }`}
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin mr-3 text-xl" />
                            Updating Profile...
                          </>
                        ) : (
                          <>
                            <FaCheck className="mr-3 text-xl" />
                            Update Profile
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Profile Picture Section - Second on large screens */}
              <div className="lg:col-span-1 lg:order-2 order-1">
                <div className={`${getCardBgColor()} rounded-3xl shadow-xl p-6 border ${getBorderColor()} h-fit`}>
                  <h3 className={`text-2xl font-bold ${getTextColor()} mb-6 text-center`}>
                    Profile Picture
                  </h3>
                  
                  <div className="flex flex-col items-center space-y-4">
                    {/* Profile Picture Display */}
                    <div 
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setIsHoveringPicture(true)}
                      onMouseLeave={() => setIsHoveringPicture(false)}
                    >
                      <div className="relative">
                        {user?.profilePicture ? (
                          <img
                            src={`data:image/jpeg;base64,${btoa(
                              new Uint8Array((user.profilePicture as any).data).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                ""
                              )
                            )}`}
                            alt="Current profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500 shadow-2xl transition-all duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              form.firstName + (form.lastName ? " " + form.lastName : "") || "User"
                            )}&background=0D8ABC&color=fff&size=128&rounded=true`}
                            alt="Default avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500 shadow-2xl transition-all duration-300 group-hover:scale-105"
                          />
                        )}
                        
                        {/* Overlay */}
                        <div className={`absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isHoveringPicture ? 'opacity-100' : 'opacity-0'}`}>
                          <FaCamera className="text-white text-xl" />
                        </div>
                      </div>
                    </div>

                    {/* Upload Component */}
                    <div className="w-full">
                      <ProfilePictureUpload
                        onSuccess={handlePictureSuccess}
                        onError={handlePictureError}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;