// src/pages/Login.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import InsuranceImage from "../assets/insurance.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

interface LocationState {
  from?: { pathname: string };
}

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    server: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Validate form fields when they change (but only after they've been touched)
  useEffect(() => {
    if (touched.email) {
      validateField("email", formData.email);
    }
    if (touched.password) {
      validateField("password", formData.password);
    }
  }, [formData, touched]);

  const validateField = (field: string, value: string) => {
    let errorMessage = "";

    if (field === "email") {
      if (!value.trim()) {
        errorMessage = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "Please enter a valid email address";
      }
    }

    if (field === "password") {
      if (!value) {
        errorMessage = "Password is required";
      } else if (value.length < 6) {
        errorMessage = "Password must be at least 6 characters";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    return !errorMessage;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Mark field as touched
    if (name === "email" || name === "password") {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }

    setErrors((prev) => ({ ...prev, server: "" }));
  };

  const validateForm = () => {
    // Mark all fields as touched
    setTouched({ email: true, password: true });

    const emailValid = validateField("email", formData.email);
    const passwordValid = validateField("password", formData.password);

    return emailValid && passwordValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 1) Post credentials
      const response = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        {
          email: formData.email,
          password: formData.password,
          remember: formData.remember,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.token as string;
      const isAdmin = !!response.data.isAdmin;

      // 2) Tell AuthContext about the token (populates user)
      await login(token);

      // 3) Compute fallback path & redirect
      const fallback = isAdmin ? "/admin/dashboard" : "/user/dashboard";
      const fromPath = (location.state as LocationState)?.from?.pathname;
      const redirectPath = fromPath || fallback;

      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      let message = "An error occurred. Please try again.";
      if (err.response) {
        if (err.response.status === 401) {
          message = "Invalid email or password";
        } else if (err.response.data?.message) {
          message = err.response.data.message;
        }
      } else if (err.request) {
        message = "No response from server. Check your connection.";
      }
      setErrors((prev) => ({ ...prev, server: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="min-h-screen bg-white flex items-center justify-center p-4">
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
          <h2 className="mt-2 text-gray-600">
            Insurance Claim Processing System
          </h2>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Welcome Back
            </h1>

            {/* Login Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${
                      errors.email
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } transition-colors`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600" id="email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    className={`pl-10 pr-10 w-full px-4 py-2.5 rounded-lg border ${
                      errors.password
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } transition-colors`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600" id="password-error">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Server Error */}
              {errors.server && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600 text-center">
                    {errors.server}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-white font-medium ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors shadow-sm`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </motion.button>

              {/* Sign-up hint */}
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} ClaimPro Insurance. All rights
            reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
