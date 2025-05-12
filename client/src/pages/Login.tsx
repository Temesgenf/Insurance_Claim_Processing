// src/pages/Login.tsx
import React, { useState } from "react";
import axios from "axios";
import InsuranceImage from "../assets/insurance.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

interface LocationState {
  from?: { pathname: string };
}

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "", server: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", server: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 1) Post credentials
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: formData.email,
          password: formData.password,
          remember: formData.remember,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.token as string;
      const isAdmin = !!response.data.isAdmin;
      console.log(response.data);

      // 2) Tell AuthContext about the token (populates user)
      await login(token);

      // 3) Compute fallback path & redirect
      const fallback = isAdmin ? "/admin/dashboard" : "/user/dashboard";
      const fromPath = (location.state as LocationState)?.from?.pathname;
      const redirectPath = fromPath || fallback;

      console.log("Redirecting to:", redirectPath);
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

  return (
    <section className="bg-gray-50 w-full h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img className="w-8 h-8 mr-2" src={InsuranceImage} alt="logo" />
          ClaimPro
        </a>
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                    className="w-4 h-4 border-gray-300 rounded"
                  />
                  <span className="text-gray-500">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              {/* Server error */}
              {errors.server && (
                <p className="text-red-500 text-center">{errors.server}</p>
              )}
              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white bg-primary-600 rounded-lg py-2.5 ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary-700"
                }`}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
              {/* Sign-up hint */}
              <p className="text-sm font-light text-gray-500 text-center">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
