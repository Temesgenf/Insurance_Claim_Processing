import React, { useState } from "react";
import { useTheme } from "../../Context/ThemeContext";
import { FaUser, FaUpload, FaSpinner } from "react-icons/fa";
import axios from "axios";
// import { API_BASE_URL } from "../../config";

interface ProfilePictureUploadProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  onSuccess,
  onError,
}) => {
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper functions for theme-based styling
  const getBgColor = () => (theme === "dark" ? "bg-gray-800" : "bg-white");
  const getTextColor = () =>
    theme === "dark" ? "text-gray-100" : "text-gray-800";
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
        `http://localhost:3000/api/users/profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
    <div
      className={`${getBgColor()} rounded-lg shadow-md p-6 border ${getBorderColor()}`}
    >
      <h3 className={`text-xl font-semibold ${getTextColor()} mb-4`}>
        Profile Picture
      </h3>

      <div className="flex flex-col items-center">
        <div className="mb-4">
          {preview ? (
            <img
              src={preview}
              alt="Profile preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-brand-500"
            />
          ) : (
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <FaUser
                className={`text-4xl ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              />
            </div>
          )}
        </div>

        <div className="w-full max-w-xs">
          <label
            htmlFor="profile-picture"
            className={`block w-full cursor-pointer text-center px-4 py-2 border ${getBorderColor()} rounded-md ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            } transition-colors duration-200`}
          >
            <FaUpload className="inline-block mr-2" />
            Select Image
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
              className={`mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                theme === "dark"
                  ? "bg-brand-600 hover:bg-brand-500"
                  : "bg-brand-500 hover:bg-brand-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 ${
                uploading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                "Upload Picture"
              )}
            </button>
          )}

          {error && (
            <div className="mt-3 text-red-500 text-sm text-center">{error}</div>
          )}

          <p className="mt-3 text-xs text-center text-gray-500">
            Maximum file size: 2MB. Supported formats: JPG, PNG, GIF.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
