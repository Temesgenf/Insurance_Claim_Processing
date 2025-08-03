import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const EmailVerify: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("Please enter your verification code.");
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      await axios.post(`${API_BASE_URL}/api/users/verifyEmail`, {
        code: verificationCode
      });
      
      setStatus("success");
      setMessage("Your email has been successfully verified! You can now log in.");
      
      // Redirect to login page after successful verification
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err.response?.data?.message ||
          "Verification failed. Please check your code and try again."
      );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Email Verification</h1>
        
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <p>Verifying your email...</p>
          </div>
        )}
        
        {status === "success" && (
          <div>
            <p className="text-green-600 mb-4">{message}</p>
            <p className="text-sm">Redirecting to login page...</p>
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition mt-4"
            >
              Go to Login
            </Link>
          </div>
        )}
        
        {status === "error" && (
          <div>
            <p className="text-red-600 mb-4">{message}</p>
            <form onSubmit={handleVerificationSubmit} className="mt-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </form>
          </div>
        )}
        
        {status === "idle" && (
          <div>
            <p className="text-blue-600 mb-4">{message}</p>
            <form onSubmit={handleVerificationSubmit} className="mt-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Verify Email
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmailVerify;