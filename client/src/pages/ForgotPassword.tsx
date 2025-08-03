import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import InsuranceImage from "../assets/insurance.svg";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/users/forgot-password`, { email });
      Swal.fire({
        title: "Check your email!",
        text: "If an account exists, a password reset link has been sent.",
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Check your email!",
        text: "If an account exists, a password reset link has been sent.",
        icon: "success",
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
          <Link to="/" className="inline-flex items-center justify-center">
            <img
              className="w-10 h-10 mr-2"
              src={InsuranceImage}
              alt="ClaimPro Logo"
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              ClaimPro
            </span>
          </Link>
          <h2 className="mt-2 text-gray-600">Forgot Password</h2>
        </motion.div>
        {/* Forgot Password Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </motion.div>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Remembered your password?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword; 