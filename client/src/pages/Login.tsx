import React, { useState } from "react";
import axios from "axios";
import InsuranceImage from "../assets/insurance.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const role = location.search.split("=")[1];
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login", // Update with your backend endpoint
        {
          email: formData.email,
          password: formData.password,
          remember: formData.remember,
        },
        {
          headers: {
            "Content-Type": "application/json", // Required header
          },
          // withCredentials: true, // Include credentials for CORS
        }
      );
      //set cookie
      console.log("Login response:", response);
      localStorage.setItem("AccessToken", response.data.token);
      response.data.isAdmin
        ? navigate("/admin/dashboard")
        : navigate("/user/dashboard");
    } catch (error: any) {
      let errorMessage = "An error occurred. Please try again.";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      setErrors((prev) => ({ ...prev, server: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 w-full h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mxs-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img className="w-8 h-8 mr-2" src={InsuranceImage} alt="logo" />
          ClaimPro
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      name="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      checked={formData.remember}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              {errors.server && (
                <p className="text-red-500 text-sm text-center">
                  {errors.server}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
              {role === "user" && (
                <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Sign up
                  </Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
