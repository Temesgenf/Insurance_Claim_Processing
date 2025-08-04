import React, { useState } from "react";
import { useTheme } from "../../Context/ThemeContext";
import { useAuth } from "../../Context/AuthContext";
import { FaUpload, FaSpinner } from "react-icons/fa";
import axios from "axios";
// import { API_BASE_URL } from "../../config";

interface ProfilePictureUploadProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onSuccess,
  onError,
}) => {
  const { theme } = useTheme();
  const { refreshUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function for theme-based styling
  const getBorderColor = () =>
    theme === "dark" ? "border-gray-700" : "border-gray-200";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image to upload");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      await axios.post(
        `${API_BASE_URL}/api/users/profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      );

      // Refresh user data in context to update profile picture immediately
      await refreshUser();
      
      setUploading(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      setUploading(false);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to upload profile picture";

      setError(errorMessage);
      if (onError) onError(errorMessage);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-y-3">
        {/* Show preview only when file is selected */}
        {preview && (
          <div className="mb-2">
            <img
              src={preview}
              alt="Profile preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-lg"
            />
            <p className="text-xs text-center mt-1 text-gray-500">Preview</p>
          </div>
        )}

        <div className="w-full">
          <label
            htmlFor="profile-picture"
            className={`block w-full cursor-pointer text-center px-3 py-2 border ${getBorderColor()} rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            } transition-colors duration-200 text-sm font-medium`}
          >
            <FaUpload className="inline-block mr-2 text-xs" />
            {selectedFile ? selectedFile.name.substring(0, 20) + (selectedFile.name.length > 20 ? '...' : '') : 'Choose Image'}
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`mt-2 w-full inline-flex justify-center items-center px-3 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-blue-500 hover:bg-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                uploading ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {uploading ? (
                <>
                  <FaSpinner className="animate-spin mr-2 text-xs" />
                  Uploading...
                </>
              ) : (
                <>
                  <FaUpload className="mr-2 text-xs" />
                  Upload
                </>
              )}
            </button>
          )}

          {error && (
            <div className="mt-2 text-red-500 text-xs text-center bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</div>
          )}

          <p className="mt-2 text-xs text-center text-gray-400">
            Max: 2MB • JPG, PNG
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
