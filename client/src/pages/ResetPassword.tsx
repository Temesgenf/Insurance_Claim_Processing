import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import InsuranceImage from "../assets/insurance.svg";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      Swal.fire({ title: "Error", text: "Please fill in all fields.", icon: "error" });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({ title: "Error", text: "Passwords do not match.", icon: "error" });
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/users/reset-password`, { token, password });
      Swal.fire({
        title: "Password Reset!",
        text: "Your password has been updated. You can now log in.",
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });
      navigate("/login");
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <img className="w-10 h-10 mx-auto mb-2" src={InsuranceImage} alt="ClaimPro Logo" />
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            ClaimPro
          </span>
          <h2 className="mt-2 text-gray-600">Reset Password</h2>
        </motion.div>
        {/* Reset Password Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </motion.div>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Remembered your password?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword; 