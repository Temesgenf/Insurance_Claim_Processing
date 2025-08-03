import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiCalendar, FiPhone, FiCheck } from "react-icons/fi";
import InsuranceImage from "../assets/insurance.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../Context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";

const OnboardingRegister: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    if (user.isAdmin) {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null as Date | null, // Changed from string to Date | null
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    agreeToTerms: false,
  });

  // Error state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    agreeToTerms: "",
    server: "",
    verificationCode: "", // Add this
  });

  // Touched state
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    country: false,
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [emailVerified, setEmailVerified] = useState(false); // Add this
const [verificationCode, setVerificationCode] = useState("");
const [isResendingCode, setIsResendingCode] = useState(false);
const [resendCooldown, setResendCooldown] = useState(0);
const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

// Add this useEffect for resend cooldown timer
useEffect(() => {
  let interval: number;
  if (resendCooldown > 0) {
    interval = setInterval(() => {
      setResendCooldown(prev => prev - 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [resendCooldown]);


// Add verification code validation to your existing validateField function
const validateField = (field: string, value: any) => {
  let errorMessage = "";

  switch (field) {
    // ... existing cases ...
    case "verificationCode":
      if (!value.trim()) {
        errorMessage = "Verification code is required";
      } else if (value.length !== 6) {
        errorMessage = "Verification code must be 6 digits";
      } else if (!/^\d{6}$/.test(value)) {
        errorMessage = "Verification code must contain only numbers";
      }
      break;
    case "dateOfBirth":
      if (!value) {
        errorMessage = "Date of birth is required";
      } else {
        const dob = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear(); // Changed from 'const' to 'let'
        const monthDiff = today.getMonth() - dob.getMonth();
        
        // Adjust age if birthday hasn't occurred this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        
        if (age < 18) errorMessage = "You must be at least 18 years old";
        if (age > 100) errorMessage = "Please enter a valid date of birth";
      }
      break;
    // ... rest of existing cases ...
  }

  setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  return !errorMessage;
};

// Add this function to handle email verification
const handleEmailVerification = async () => {
  if (!validateField("verificationCode", verificationCode)) return;
  setIsVerifyingEmail(true);
  
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/verifyEmail`, {
      email: formData.email,
      verificationCode: verificationCode,
    });
    console.log(response)
    Swal.fire({
      title: "Email Verified Successfully!",
      text: "Your email has been verified. You can now proceed.",
      icon: "success",
      confirmButtonColor: "#3b82f6",
    });

    // Mark email as verified and proceed to final submission
    setEmailVerified(true); // Use separate state
    
  } catch (error: any) {
    console.error("Email verification error:", error);
    
    let message = "Verification failed. Please try again.";
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.status === 400) {
      message = "Invalid verification code.";
    } else if (error.response?.status === 410) {
      message = "Verification code has expired. Please request a new one.";
    }

    setErrors(prev => ({ ...prev, verificationCode: message }));
    
    Swal.fire({
      title: "Verification Failed",
      text: message,
      icon: "error",
      confirmButtonColor: "#3b82f6",
    });
  } finally {
    setIsVerifyingEmail(false);
  }
};

// Add this function to resend verification code
const handleResendCode = async () => {
  setIsResendingCode(true);
  
  try {
    await axios.post(`${API_BASE_URL}/api/users/resend-verification`, {
      email: formData.email,
    });

    // Reset input and error
    setVerificationCode(""); // <-- This clears the input
    setErrors(prev => ({ ...prev, verificationCode: "" })); // <-- This clears the error

    Swal.fire({
      title: "Code Sent!",
      text: "A new verification code has been sent to your email.",
      icon: "success",
      confirmButtonColor: "#3b82f6",
    });

    setResendCooldown(60); // 60 second cooldown
    
  } catch (error: any) {
    console.error("Resend code error:", error);
    
    let message = "Failed to send verification code. Please try again.";
    if (error.response?.data?.message) {
      message = error.response.data.message;
    }

    Swal.fire({
      title: "Resend Failed",
      text: message,
      icon: "error",
      confirmButtonColor: "#3b82f6",
    });
  } finally {
    setIsResendingCode(false);
  }
};

  // Validate form fields when they change (but only after they've been touched)
  useEffect(() => {
    if (touched.firstName) validateField("firstName", formData.firstName);
    if (touched.lastName) validateField("lastName", formData.lastName);
    if (touched.dateOfBirth) validateField("dateOfBirth", formData.dateOfBirth);
    if (touched.email) validateField("email", formData.email);
    if (touched.password) {
      validateField("password", formData.password);
      calculatePasswordStrength(formData.password);
    }
    if (touched.confirmPassword)
      validateField("confirmPassword", formData.confirmPassword);
    if (touched.phone) validateField("phone", formData.phone);
    if (touched.country) validateField("country", formData.country);
    if (touched.agreeToTerms)
      validateField("agreeToTerms", formData.agreeToTerms);
  }, [formData, touched]);

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  // const validateField = (field: string, value: any) => {
  //   let errorMessage = "";

  //   switch (field) {
  //     case "firstName":
  //       if (!value.trim()) errorMessage = "First name is required";
  //       break;
  //     case "lastName":
  //       if (!value.trim()) errorMessage = "Last name is required";
  //       break;
  //     case "dateOfBirth":
  //       if (!value) {
  //         errorMessage = "Date of birth is required";
  //       } else {
  //         const dob = new Date(value);
  //         const today = new Date();
  //         const age = today.getFullYear() - dob.getFullYear();
  //         if (age < 18) errorMessage = "You must be at least 18 years old";
  //         if (age > 100) errorMessage = "Please enter a valid date of birth";
  //       }
  //       break;
  //     case "email":
  //       if (!value.trim()) {
  //         errorMessage = "Email is required";
  //       } else if (!/\S+@\S+\.\S+/.test(value)) {
  //         errorMessage = "Please enter a valid email address";
  //       }
  //       break;
  //     case "password":
  //       if (!value) {
  //         errorMessage = "Password is required";
  //       } else if (value.length < 8) {
  //         errorMessage = "Password must be at least 8 characters";
  //       } else if (!/[A-Z]/.test(value)) {
  //         errorMessage = "Password must contain at least one uppercase letter";
  //       } else if (!/[0-9]/.test(value)) {
  //         errorMessage = "Password must contain at least one number";
  //       }
  //       break;
  //     case "confirmPassword":
  //       if (!value) {
  //         errorMessage = "Please confirm your password";
  //       } else if (value !== formData.password) {
  //         errorMessage = "Passwords don't match";
  //       }
  //       break;
  //     case "phone":
  //       if (value && !/^\+?[0-9\s-()]{7,}$/.test(value)) {
  //         errorMessage = "Please enter a valid phone number";
  //       }
  //       break;
  //     case "country":
  //       if (!value) errorMessage = "Please select your country";
  //       break;
  //     case "agreeToTerms":
  //       if (!value) errorMessage = "You must accept the terms and conditions";
  //       break;
  //     default:
  //       break;
  //   }

  //   setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  //   return !errorMessage;
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Mark field as touched
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Clear server error when user makes changes
    setErrors((prev) => ({ ...prev, server: "" }));
  };

// Add this new function for date changes
const handleDateChange = (date: Date | null) => {
  setFormData((prev) => ({
    ...prev,
    dateOfBirth: date,
  }));
  setTouched((prev) => ({ ...prev, dateOfBirth: true }));
  setErrors((prev) => ({ ...prev, server: "" }));
};

  const validateStep = (step: number) => {
    let isValid = true;

    // Mark relevant fields as touched based on current step
    if (step === 1) {
      setTouched((prev) => ({
        ...prev,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
      }));

      const firstNameValid = validateField("firstName", formData.firstName);
      const lastNameValid = validateField("lastName", formData.lastName);
      const dobValid = validateField("dateOfBirth", formData.dateOfBirth);

      isValid = firstNameValid && lastNameValid && dobValid;
    } else if (step === 2) {
      setTouched((prev) => ({
        ...prev,
        email: true,
        password: true,
        confirmPassword: true,
        phone: true,
        country: true,
      }));

      const emailValid = validateField("email", formData.email);
      const passwordValid = validateField("password", formData.password);
      const confirmPasswordValid = validateField(
        "confirmPassword",
        formData.confirmPassword
      );
      const phoneValid = validateField("phone", formData.phone);
      const countryValid = validateField("country", formData.country);

      isValid =
        emailValid &&
        passwordValid &&
        confirmPasswordValid &&
        phoneValid &&
        countryValid;
    } else if (step === 3) {
      setTouched((prev) => ({
        ...prev,
        agreeToTerms: true,
      }));

      const agreeToTermsValid = validateField(
        "agreeToTerms",
        formData.agreeToTerms
      );

      isValid = agreeToTermsValid;
    }

    return isValid;
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      if (validateStep(1)) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep(2)) {
        setIsSubmitting(true);
        try {
          const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString() : null,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            country: formData.country,
          };
          await axios.post(`${API_BASE_URL}/api/users/register`, payload);
          Swal.fire({
            title: "Registration Successful!",
            text: "A verification code has been sent to your email.",
            icon: "success",
            confirmButtonColor: "#3b82f6",
          });
          setCurrentStep(3);
        } catch (error: any) {
          let message = "Registration failed. Please try again.";
          if (error.response?.data?.message) {
            message = error.response.data.message;
          } else if (error.response?.status === 409) {
            message = "This email is already registered.";
          }
          setErrors((prev) => ({ ...prev, server: message }));
          Swal.fire({
            title: "Registration Failed",
            text: message,
            icon: "error",
            confirmButtonColor: "#3b82f6",
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailVerified) return;
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    try {
      // Finalize registration or show success
      Swal.fire({
        title: "Registration Complete!",
        text: "Your account is now fully active.",
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });
      navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Stepper component
  const Stepper = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > 1 ? <FiCheck className="w-5 h-5" /> : "1"}
            </div>
            <span
              className={`mt-2 text-sm ${
                currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"
              }`}
            >
              Personal Info
            </span>
          </div>

          {/* Line between Step 1 and 2 */}
          <div
            className={`flex-1 h-1 mx-4 ${
              currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
            }`}
          ></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > 2 ? <FiCheck className="w-5 h-5" /> : "2"}
            </div>
            <span
              className={`mt-2 text-sm ${
                currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"
              }`}
            >
              Account Info
            </span>
          </div>

          {/* Line between Step 2 and 3 */}
          <div
            className={`flex-1 h-1 mx-4 ${
              currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"
            }`}
          ></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep === 3
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
            <span
              className={`mt-2 text-sm ${
                currentStep === 3 ? "text-blue-600 font-medium" : "text-gray-500"
              }`}
            >
              Email Verification
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Step 1: Personal Information
  const renderPersonalInfoStep = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
        
        {/* First Name */}
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="given-name"
              className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${errors.firstName
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } transition-colors`}
              placeholder="Bonnie"
              value={formData.firstName}
              onChange={handleChange}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600" id="firstName-error">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="family-name"
              className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${errors.lastName
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } transition-colors`}
              placeholder="Green"
              value={formData.lastName}
              onChange={handleChange}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
          </div>
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600" id="lastName-error">
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <FiCalendar className="h-5 w-5 text-gray-400" />
            </div>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select your date of birth"
              wrapperClassName="w-full"
              customInput={
                <input
                  className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${
                    errors.dateOfBirth
                      ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } transition-colors`}
                />
              }
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
              dropdownMode="select"
              showMonthDropdown
              scrollableMonthYearDropdown
              openToDate={new Date(1990, 0, 1)}
              isClearable={false}
              autoComplete="off"
            />
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600" id="dateOfBirth-error">
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  };

  // Step 2: Account Information
  const renderAccountInfoStep = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">Account Details</h2>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your email
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
              className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${errors.email
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } transition-colors`}
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
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

        {/* Password */}
        <div className="mb-4">
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
              autoComplete="new-password"
              className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${errors.password
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } transition-colors`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              <span className="text-sm text-gray-500 hover:text-gray-700">
                {showPassword ? "Hide" : "Show"}
              </span>
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600" id="password-error">
              {errors.password}
            </p>
          )}

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${i < passwordStrength ? "bg-blue-600" : "bg-gray-200"
                      }`}
                  ></div>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {passwordStrength === 0 && "Very weak"}
                {passwordStrength === 1 && "Weak"}
                {passwordStrength === 2 && "Medium"}
                {passwordStrength === 3 && "Strong"}
                {passwordStrength === 4 && "Very strong"}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${errors.confirmPassword
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } transition-colors`}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={toggleConfirmPasswordVisibility}
            >
              <span className="text-sm text-gray-500 hover:text-gray-700">
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600" id="confirmPassword-error">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              id="phone"
              autoComplete="tel"
              className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${errors.phone
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } transition-colors`}
              placeholder="+123 567 890"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600" id="phone-error">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country
          </label>
          <div className="relative">
            <select
              name="country"
              id="country"
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.country
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } transition-colors`}
              value={formData.country}
              onChange={handleChange}
              aria-invalid={!!errors.country}
              aria-describedby={errors.country ? "country-error" : undefined}
            >
              <option value="">Choose your country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="IN">India</option>
              <option value="BR">Brazil</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600" id="country-error">
              {errors.country}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  };

  // Step 3: Confirmation
 const renderConfirmationStep = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Email Verification</h2>

      {/* Email Verification Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <FiMail className="h-5 w-5 text-blue-600 mr-2" />
          <div>
            <p className="text-sm font-medium text-blue-800">
              Verification code sent to {formData.email}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Please check your email and enter the 6-digit verification code below.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Code Input */}
      <div className="mb-6">
        <label
          htmlFor="verificationCode"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Verification Code
        </label>
        <div className="relative">
          <input
            type="text"
            name="verificationCode"
            id="verificationCode"
            maxLength={6}
            className={`w-full px-4 py-3 text-center text-lg font-mono tracking-widest rounded-lg border ${
              errors.verificationCode
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } transition-colors`}
            placeholder="123456"
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ''); // Only allow digits
              setVerificationCode(value);
              // Clear error when user starts typing
              if (errors.verificationCode) {
                setErrors(prev => ({ ...prev, verificationCode: "" }));
              }
            }}
            aria-invalid={!!errors.verificationCode}
            aria-describedby={errors.verificationCode ? "verificationCode-error" : undefined}
          />
        </div>
        {errors.verificationCode && (
          <p className="mt-1 text-sm text-red-600" id="verificationCode-error">
            {errors.verificationCode}
          </p>
        )}
      </div>

      {/* Resend Code */}
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Didn't receive the code?
        </p>
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isResendingCode || resendCooldown > 0}
          className={`text-sm font-medium ${
            isResendingCode || resendCooldown > 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:text-blue-700"
          } transition-colors`}
        >
          {isResendingCode ? (
            <>
              <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-gray-400 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Sending...
            </>
          ) : resendCooldown > 0 ? (
            `Resend in ${resendCooldown}s`
          ) : (
            "Resend Code"
          )}
        </button>
      </div>

      {/* Verify Email Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleEmailVerification}
          disabled={isVerifyingEmail || !verificationCode.trim() || verificationCode.length !== 6}
          className={`w-full px-6 py-3 rounded-lg font-medium transition ${
            isVerifyingEmail || !verificationCode.trim() || verificationCode.length !== 6
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isVerifyingEmail ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </button>
      </div>

      {/* Summary of information (only show after email verification) */}
      {emailVerified && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <FiCheck className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-medium text-gray-700">Email Verified Successfully</h3>
          </div>
          
          <h4 className="font-medium text-gray-700 mb-2">Personal Information</h4>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Date of Birth:</span> {formData.dateOfBirth ? formData.dateOfBirth.toLocaleDateString() : "Not provided"}
          </p>

          <h4 className="font-medium text-gray-700 mt-4 mb-2">Account Information</h4>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Email:</span> {formData.email} ✓
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Phone:</span> {formData.phone || "Not provided"}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Country:</span> {formData.country || "Not provided"}
          </p>
        </div>
      )}

      {/* Terms and Conditions (only show after email verification) */}
      {emailVerified && (
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                aria-invalid={!!errors.agreeToTerms}
                aria-describedby={errors.agreeToTerms ? "agreeToTerms-error" : undefined}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle terms modal opening
                  }}
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle privacy modal opening
                  }}
                >
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-600" id="agreeToTerms-error">
              {errors.agreeToTerms}
            </p>
          )}
        </div>
      )}

      {/* Server Error */}
      {errors.server && (
        <div className="p-3 mb-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 text-center">{errors.server}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          Back
        </button>
        
        {/* Only show Complete Registration button after email verification */}
        {emailVerified && (
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Complete Registration"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

  return (
    <section className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo and Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
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
           Insurance Claim system
          </h2>
          {/* <div className="mt-2 text-blue-600 font-medium">
            30-day free trial
          </div> */}
        </motion.div>

        {/* Registration Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            {/* Stepper */}
            <Stepper />

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderPersonalInfoStep()}
              {currentStep === 2 && renderAccountInfoStep()}
              {currentStep === 3 && renderConfirmationStep()}
            </form>
          </div>
        </motion.div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OnboardingRegister;