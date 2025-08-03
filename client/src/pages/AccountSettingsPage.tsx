import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import AppSidebar from "../components/layout/AppSidebar";
import PageMeta from "../components/common/PageMeta";
import { 
  FaShieldAlt, 
  FaKey, 
  FaHistory, 
  FaBell, 
  FaGlobe, 
  FaPalette, 
  FaCheck, 
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaCog,
  FaLock,
  FaMobile,
  FaDesktop,
  FaTimes
} from "react-icons/fa";

const AccountSettingsPage: React.FC = () => {
  const { theme } = useTheme();

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Preferences state
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    security: true,
  });
  const [language, setLanguage] = useState("english");
  const [preferencesLoading, setPreferencesLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Mock login history data
  const [loginHistory] = useState([
    { id: 1, device: "Chrome on Windows", location: "New York, US", time: "2 hours ago", current: true, icon: FaDesktop },
    { id: 2, device: "iPhone Safari", location: "New York, US", time: "1 day ago", current: false, icon: FaMobile },
    { id: 3, device: "Chrome on Mac", location: "Boston, US", time: "3 days ago", current: false, icon: FaDesktop },
  ]);

  // Enhanced theme-based styling - Debug theme value
  console.log("Current theme:", theme); // Debug line
  
  const getBgColor = () => {
    const bgClass = theme === "dark" 
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
      : "bg-gradient-to-br from-gray-50 via-white to-gray-100";
    console.log("Background class:", bgClass); // Debug line
    return bgClass;
  };
  
  const getCardBgColor = () => {
    const cardClass = theme === "dark" 
      ? "bg-gray-800/80 backdrop-blur-sm" 
      : "bg-white/80 backdrop-blur-sm";
    console.log("Card background class:", cardClass); // Debug line
    return cardClass;
  };
  
  const getTextColor = () => {
    const textClass = theme === "dark" ? "text-gray-100" : "text-gray-800";
    console.log("Text color class:", textClass); // Debug line
    return textClass;
  };
  
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

  const getSecondaryButton = () =>
    theme === "dark"
      ? "bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
      : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-700";

  const getSuccessBg = () =>
    theme === "dark"
      ? "bg-gradient-to-r from-green-900/50 to-emerald-800/50 border-green-700/50 text-green-300"
      : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700";

  const getErrorBg = () =>
    theme === "dark"
      ? "bg-gradient-to-r from-red-900/50 to-pink-800/50 border-red-700/50 text-red-300"
      : "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-700";

  // Handlers
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match!");
      return;
    }
    
    setPasswordLoading(true);
    setError("");
    
    try {
      // TODO: Implement actual password change API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to update password. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleNotificationChange = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const handlePreferencesSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPreferencesLoading(true);
    setError("");
    
    try {
      // TODO: Implement actual preferences save API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSuccess("Preferences updated successfully!");
    } catch (err) {
      setError("Failed to update preferences. Please try again.");
    } finally {
      setPreferencesLoading(false);
    }
  };

  const handleRevokeSession = (sessionId: number) => {
    // TODO: Implement session revoke logic
    console.log(`Revoking session ${sessionId}`);
  };

  return (
    <div className={`min-h-screen ${getBgColor()}`}>
      <PageMeta
        title="Account Settings | Insurance Portal"
        description="Manage your account security and preferences"
      />
      <div className="flex">
        <AppSidebar />
        <div className="flex-1 p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                <FaCog className="text-white text-2xl" />
              </div>
              <h1 className={`text-4xl font-bold ${getTextColor()} mb-2`}>
                Account Settings
              </h1>
              <p className={`${getSubTextColor()} text-lg`}>
                Manage your account security and preferences
              </p>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className={`mb-6 p-4 rounded-2xl ${getSuccessBg()} border shadow-lg flex items-center transform animate-pulse`}>
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <FaCheck className="text-white text-sm" />
                </div>
                <div>
                  <p className="font-semibold">{success}</p>
                </div>
                <button 
                  onClick={() => setSuccess("")}
                  className="ml-auto text-green-600 hover:text-green-800"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            {error && (
              <div className={`mb-6 p-4 rounded-2xl ${getErrorBg()} border shadow-lg flex items-center`}>
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-4">
                  <FaTimes className="text-white text-sm" />
                </div>
                <div>
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
                <button 
                  onClick={() => setError("")}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            <div className="space-y-8">
              {/* Security Settings */}
              <section className={`${getCardBgColor()} rounded-3xl shadow-xl p-8 border ${getBorderColor()}`}>
                <h2 className={`text-2xl font-bold ${getTextColor()} mb-6 flex items-center`}>
                  <FaShieldAlt className="mr-3 text-blue-500" />
                  Security
                </h2>

                <div className="space-y-8">
                  {/* Change Password */}
                  <div className={`border-b ${getBorderColor()} pb-8`}>
                    <h3 className={`text-lg font-semibold ${getTextColor()} mb-4 flex items-center`}>
                      <FaKey className="mr-2 text-gray-500" />
                      Change Password
                    </h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                      <div className="group">
                        <label className={`block text-sm font-semibold ${getSubTextColor()} mb-2`}>
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            className={`w-full px-4 py-3 pr-12 rounded-xl border-2 ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="group">
                        <label className={`block text-sm font-semibold ${getSubTextColor()} mb-2`}>
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className={`w-full px-4 py-3 pr-12 rounded-xl border-2 ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="group">
                        <label className={`block text-sm font-semibold ${getSubTextColor()} mb-2`}>
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-3 pr-12 rounded-xl border-2 ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={passwordLoading}
                        className={`flex items-center justify-center px-6 py-3 rounded-xl shadow-lg font-semibold text-white ${getGradientButton()} focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 ${
                          passwordLoading ? "opacity-75 cursor-not-allowed scale-100" : ""
                        }`}
                      >
                        {passwordLoading ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <FaKey className="mr-2" />
                            Update Password
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className={`border-b ${getBorderColor()} pb-8`}>
                    <h3 className={`text-lg font-semibold ${getTextColor()} mb-4 flex items-center`}>
                      <FaLock className="mr-2 text-gray-500" />
                      Two-Factor Authentication
                    </h3>
                    <div className={`p-6 rounded-2xl border ${getBorderColor()} ${getInputBgColor()}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${getTextColor()}`}>Enable 2FA</p>
                          <p className={`text-sm ${getSubTextColor()} mt-1`}>
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-green-500' : getSubTextColor()}`}>
                            {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <button
                            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Login History */}
                  <div>
                    <h3 className={`text-lg font-semibold ${getTextColor()} mb-4 flex items-center`}>
                      <FaHistory className="mr-2 text-gray-500" />
                      Login History
                    </h3>
                    <div className="space-y-3">
                      {loginHistory.map((login) => {
                        const IconComponent = login.icon;
                        return (
                          <div key={login.id} className={`flex items-center justify-between p-4 rounded-2xl border ${getBorderColor()} ${getInputBgColor()} transition-all duration-300 hover:shadow-md`}>
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <IconComponent className="text-white text-sm" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`font-medium ${getTextColor()}`}>{login.device}</span>
                                  {login.current && (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                      Current session
                                    </span>
                                  )}
                                </div>
                                <p className={`text-sm ${getSubTextColor()}`}>{login.location} • {login.time}</p>
                              </div>
                            </div>
                            {!login.current && (
                              <button 
                                onClick={() => handleRevokeSession(login.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${getSecondaryButton()} transition-all duration-300 hover:scale-105`}
                              >
                                Revoke
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              {/* Preferences Settings */}
              <section className={`${getCardBgColor()} rounded-3xl shadow-xl p-8 border ${getBorderColor()}`}>
                <h2 className={`text-2xl font-bold ${getTextColor()} mb-6 flex items-center`}>
                  <FaCog className="mr-3 text-purple-500" />
                  Preferences
                </h2>

                <form onSubmit={handlePreferencesSave} className="space-y-8">
                  {/* Notifications */}
                  <div className={`border-b ${getBorderColor()} pb-8`}>
                    <h3 className={`text-lg font-semibold ${getTextColor()} mb-4 flex items-center`}>
                      <FaBell className="mr-2 text-gray-500" />
                      Notifications
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className={`flex items-center justify-between p-4 rounded-2xl border ${getBorderColor()} ${getInputBgColor()}`}>
                          <div>
                            <span className={`font-medium ${getTextColor()} capitalize`}>
                              {key === 'email' ? 'Email Notifications' : 
                               key === 'push' ? 'Push Notifications' : 
                               'Security Alerts'}
                            </span>
                            <p className={`text-sm ${getSubTextColor()}`}>
                              {key === 'email' ? 'Receive updates via email' : 
                               key === 'push' ? 'Receive push notifications in browser' : 
                               'Get notified about security events'}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleNotificationChange(key)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div className={`border-b ${getBorderColor()} pb-8`}>
                    <h3 className={`text-lg font-semibold ${getTextColor()} mb-4 flex items-center`}>
                      <FaGlobe className="mr-2 text-gray-500" />
                      Language
                    </h3>
                    <div className="max-w-xs">
                      <select
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                      >
                        <option value="english">English</option>
                        <option value="spanish">Español</option>
                        <option value="french">Français</option>
                        <option value="german">Deutsch</option>
                        <option value="chinese">中文</option>
                      </select>
                    </div>
                  </div>

                  {/* Theme */}
                  <div>
                    <h3 className={`text-lg font-semibold ${getTextColor()} mb-4 flex items-center`}>
                      <FaPalette className="mr-2 text-gray-500" />
                      Theme
                    </h3>
                    <div className={`flex items-center justify-between p-4 rounded-2xl border ${getBorderColor()} ${getInputBgColor()}`}>
                      <div>
                        <span className={`font-medium ${getTextColor()}`}>Appearance</span>
                        <p className={`text-sm ${getSubTextColor()}`}>
                          Choose your preferred theme
                        </p>
                      </div>
                      <ThemeToggleButton />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={preferencesLoading}
                    className={`w-full flex justify-center items-center px-6 py-4 rounded-xl shadow-lg text-lg font-semibold text-white ${getGradientButton()} focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 ${
                      preferencesLoading ? "opacity-75 cursor-not-allowed scale-100" : ""
                    }`}
                  >
                    {preferencesLoading ? (
                      <>
                        <FaSpinner className="animate-spin mr-3 text-xl" />
                        Updating Preferences...
                      </>
                    ) : (
                      <>
                        <FaCheck className="mr-3 text-xl" />
                        Save Preferences
                      </>
                    )}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;