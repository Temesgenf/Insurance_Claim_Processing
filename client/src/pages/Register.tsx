import React, { useState, useEffect } from "react";
import InsuranceImage from "../assets/insurance.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiCalendar } from "react-icons/fi";

const API_BASE_URL =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";
// import claimRouter from "./../../../server/src/routes/claim.routes";

// const Register: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agreeToTerms: false,
//   });

//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agreeToTerms: "",
//     server: "",
//   });

//   const [touched, setTouched] = useState({
//     firstName: false,
//     lastName: false,
//     dateOfBirth: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//     agreeToTerms: false,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Validate form fields when they change (but only after they've been touched)
//   useEffect(() => {
//     if (touched.firstName) validateField("firstName", formData.firstName);
//     if (touched.lastName) validateField("lastName", formData.lastName);
//     if (touched.dateOfBirth) validateField("dateOfBirth", formData.dateOfBirth);
//     if (touched.email) validateField("email", formData.email);
//     if (touched.password) {
//       validateField("password", formData.password);
//       calculatePasswordStrength(formData.password);
//     }
//     if (touched.confirmPassword)
//       validateField("confirmPassword", formData.confirmPassword);
//     if (touched.agreeToTerms)
//       validateField("agreeToTerms", formData.agreeToTerms);
//   }, [formData, touched]);

//   // Calculate password strength
//   const calculatePasswordStrength = (password: string) => {
//     let strength = 0;
//     if (password.length >= 8) strength += 1;
//     if (/[A-Z]/.test(password)) strength += 1;
//     if (/[0-9]/.test(password)) strength += 1;
//     if (/[^A-Za-z0-9]/.test(password)) strength += 1;
//     setPasswordStrength(strength);
//   };

//   const validateField = (field: string, value: any) => {
//     let errorMessage = "";

//     switch (field) {
//       case "firstName":
//         if (!value.trim()) errorMessage = "First name is required";
//         break;
//       case "lastName":
//         if (!value.trim()) errorMessage = "Last name is required";
//         break;
//       case "dateOfBirth":
//         if (!value) {
//           errorMessage = "Date of birth is required";
//         } else {
//           const dob = new Date(value);
//           const today = new Date();
//           const age = today.getFullYear() - dob.getFullYear();
//           if (age < 18) errorMessage = "You must be at least 18 years old";
//           if (age > 100) errorMessage = "Please enter a valid date of birth";
//         }
//         break;
//       case "email":
//         if (!value.trim()) {
//           errorMessage = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//           errorMessage = "Please enter a valid email address";
//         }
//         break;
//       case "password":
//         if (!value) {
//           errorMessage = "Password is required";
//         } else if (value.length < 8) {
//           errorMessage = "Password must be at least 8 characters";
//         } else if (!/[A-Z]/.test(value)) {
//           errorMessage = "Password must contain at least one uppercase letter";
//         } else if (!/[0-9]/.test(value)) {
//           errorMessage = "Password must contain at least one number";
//         }
//         break;
//       case "confirmPassword":
//         if (!value) {
//           errorMessage = "Please confirm your password";
//         } else if (value !== formData.password) {
//           errorMessage = "Passwords don't match";
//         }
//         break;
//       case "agreeToTerms":
//         if (!value) errorMessage = "You must accept the terms and conditions";
//         break;
//       default:
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [field]: errorMessage }));
//     return !errorMessage;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     // Mark field as touched
//     setTouched((prev) => ({ ...prev, [name]: true }));

//     // Clear server error when user makes changes
//     setErrors((prev) => ({ ...prev, server: "" }));
//   };

//   const validateForm = () => {
//     // Mark all fields as touched
//     setTouched({
//       firstName: true,
//       lastName: true,
//       dateOfBirth: true,
//       email: true,
//       password: true,
//       confirmPassword: true,
//       agreeToTerms: true,
//     });

//     const firstNameValid = validateField("firstName", formData.firstName);
//     const lastNameValid = validateField("lastName", formData.lastName);
//     const dobValid = validateField("dateOfBirth", formData.dateOfBirth);
//     const emailValid = validateField("email", formData.email);
//     const passwordValid = validateField("password", formData.password);
//     const confirmPasswordValid = validateField(
//       "confirmPassword",
//       formData.confirmPassword
//     );
//     const agreeToTermsValid = validateField(
//       "agreeToTerms",
//       formData.agreeToTerms
//     );

//     return (
//       firstNameValid &&
//       lastNameValid &&
//       dobValid &&
//       emailValid &&
//       passwordValid &&
//       confirmPasswordValid &&
//       agreeToTermsValid
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       const payload = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
//         email: formData.email,
//         password: formData.password,
//       };

//       await axios.post(`${API_BASE_URL}/api/users/register`, payload);

//       Swal.fire({
//         title: "Registration Successful!",
//         text: "Your account has been created. You can now log in.",
//         icon: "success",
//         confirmButtonColor: "#3b82f6",
//       });

//       navigate("/login");
//     } catch (error: any) {
//       console.error("Registration error:", error);

//       let message = "Registration failed. Please try again.";
//       if (error.response?.data?.message) {
//         message = error.response.data.message;
//       } else if (error.response?.status === 409) {
//         message = "This email is already registered.";
//       }

//       setErrors((prev) => ({ ...prev, server: message }));

//       Swal.fire({
//         title: "Registration Failed",
//         text: message,
//         icon: "error",
//         confirmButtonColor: "#3b82f6",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   // Add these new state variables for modals
//   const [showTermsModal, setShowTermsModal] = useState(false);
//   const [showPrivacyModal, setShowPrivacyModal] = useState(false);

//   // Add these functions to handle modal toggling
//   const openTermsModal = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowTermsModal(true);
//   };

//   const openPrivacyModal = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowPrivacyModal(true);
//   };

//   const closeModals = () => {
//     setShowTermsModal(false);
//     setShowPrivacyModal(false);
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         {/* Logo and Title */}
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-6"
//         >
//           <Link to="/" className="inline-flex items-center justify-center">
//             <img
//               className="w-10 h-10 mr-2"
//               src={InsuranceImage}
//               alt="ClaimPro Logo"
//             />
//             <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
//               ClaimPro
//             </span>
//           </Link>
//           <h2 className="mt-2 text-gray-600">
//             Insurance Claim Processing System
//           </h2>
//         </motion.div>

//         {/* Registration Card */}
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
//         >
//           <div className="p-6 md:p-8">
//             <h1 className="text-2xl font-bold text-gray-800 mb-6">
//               Create Your Account
//             </h1>

//             {/* Server Error */}
//             {errors.server && (
//               <div className="p-3 mb-4 rounded-lg bg-red-50 border border-red-200">
//                 <p className="text-sm text-red-600 text-center">
//                   {errors.server}
//                 </p>
//               </div>
//             )}

//             {/* Registration Form */}
//             <form className="space-y-5" onSubmit={handleSubmit}>
//               {/* Name Fields - Two Columns */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* First Name */}
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     First Name
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FiUser className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="firstName"
//                       id="firstName"
//                       autoComplete="given-name"
//                       className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${
//                         errors.firstName
//                           ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
//                           : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                       } transition-colors`}
//                       placeholder="John"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       aria-invalid={!!errors.firstName}
//                       aria-describedby={
//                         errors.firstName ? "firstName-error" : undefined
//                       }
//                     />
//                   </div>
//                   {errors.firstName && (
//                     <p
//                       className="mt-1 text-sm text-red-600"
//                       id="firstName-error"
//                     >
//                       {errors.firstName}
//                     </p>
//                   )}
//                 </div>

//                 {/* Last Name */}
//                 <div>
//                   <label
//                     htmlFor="lastName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Last Name
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FiUser className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="lastName"
//                       id="lastName"
//                       autoComplete="family-name"
//                       className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${
//                         errors.lastName
//                           ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
//                           : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                       } transition-colors`}
//                       placeholder="Doe"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       aria-invalid={!!errors.lastName}
//                       aria-describedby={
//                         errors.lastName ? "lastName-error" : undefined
//                       }
//                     />
//                   </div>
//                   {errors.lastName && (
//                     <p
//                       className="mt-1 text-sm text-red-600"
//                       id="lastName-error"
//                     >
//                       {errors.lastName}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label
//                   htmlFor="dateOfBirth"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Date of Birth
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiCalendar className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="date"
//                     name="dateOfBirth"
//                     id="dateOfBirth"
//                     className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${
//                       errors.dateOfBirth
//                         ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
//                         : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                     } transition-colors`}
//                     value={formData.dateOfBirth}
//                     onChange={handleChange}
//                     aria-invalid={!!errors.dateOfBirth}
//                     aria-describedby={
//                       errors.dateOfBirth ? "dateOfBirth-error" : undefined
//                     }
//                   />
//                 </div>
//                 {errors.dateOfBirth && (
//                   <p
//                     className="mt-1 text-sm text-red-600"
//                     id="dateOfBirth-error"
//                   >
//                     {errors.dateOfBirth}
//                   </p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiMail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     autoComplete="email"
//                     className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${
//                       errors.email
//                         ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
//                         : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                     } transition-colors`}
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     aria-invalid={!!errors.email}
//                     aria-describedby={errors.email ? "email-error" : undefined}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600" id="email-error">
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     id="password"
//                     autoComplete="new-password"
//                     className={`pl-10 pr-10 w-full px-4 py-2.5 rounded-lg border ${
//                       errors.password
//                         ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
//                         : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                     } transition-colors`}
//                     placeholder="••••••••"
//                     value={formData.password}
//                     onChange={handleChange}
//                     aria-invalid={!!errors.password}
//                     aria-describedby={
//                       errors.password ? "password-error" : undefined
//                     }
//                   />
//                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                     <button
//                       type="button"
//                       onClick={togglePasswordVisibility}
//                       className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                     >
//                       {showPassword ? (
//                         <svg
//                           className="h-5 w-5"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                           />
//                         </svg>
//                       ) : (
//                         <svg
//                           className="h-5 w-5"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600" id="password-error">
//                     {errors.password}
//                   </p>
//                 )}

//                 {/* Password Strength Indicator */}
//                 {touched.password && formData.password && (
//                   <div className="mt-2">
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="text-xs text-gray-500">
//                         Password strength:
//                       </span>
//                       <span className="text-xs font-medium">
//                         {passwordStrength === 0 && "Very weak"}
//                         {passwordStrength === 1 && "Weak"}
//                         {passwordStrength === 2 && "Medium"}
//                         {passwordStrength === 3 && "Strong"}
//                         {passwordStrength === 4 && "Very strong"}
//                       </span>
//                     </div>
//                     <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                       <div
//                         className={`h-full ${
//                           passwordStrength === 0
//                             ? "bg-red-500 w-1/5"
//                             : passwordStrength === 1
//                             ? "bg-orange-500 w-2/5"
//                             : passwordStrength === 2
//                             ? "bg-yellow-500 w-3/5"
//                             : passwordStrength === 3
//                             ? "bg-lime-500 w-4/5"
//                             : "bg-green-500 w-full"
//                         } transition-all duration-300`}
//                       ></div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FiLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     id="confirmPassword"
//                     autoComplete="new-password"
//                     className={`pl-10 pr-10 w-full px-4 py-2.5 rounded-lg border ${
//                       errors.confirmPassword
//                         ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
//                         : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                     } transition-colors`}
//                     placeholder="••••••••"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     aria-invalid={!!errors.confirmPassword}
//                     aria-describedby={
//                       errors.confirmPassword
//                         ? "confirmPassword-error"
//                         : undefined
//                     }
//                   />
//                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                     <button
//                       type="button"
//                       onClick={toggleConfirmPasswordVisibility}
//                       className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                       aria-label={
//                         showConfirmPassword ? "Hide password" : "Show password"
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <svg
//                           className="h-5 w-5"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                           />
//                         </svg>
//                       ) : (
//                         <svg
//                           className="h-5 w-5"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p
//                     className="mt-1 text-sm text-red-600"
//                     id="confirmPassword-error"
//                   >
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               {/* Terms and Conditions */}
//               <div className="flex items-start">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="agreeToTerms"
//                     name="agreeToTerms"
//                     type="checkbox"
//                     checked={formData.agreeToTerms}
//                     onChange={handleChange}
//                     className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
//                       errors.agreeToTerms ? "border-red-300" : ""
//                     }`}
//                     aria-invalid={!!errors.agreeToTerms}
//                     aria-describedby={
//                       errors.agreeToTerms ? "terms-error" : undefined
//                     }
//                   />
//                 </div>
//                 <div className="ml-3 text-sm">
//                   <label
//                     htmlFor="agreeToTerms"
//                     className="font-medium text-gray-700"
//                   >
//                     I agree to the{" "}
//                     <a
//                       href="#"
//                       onClick={openTermsModal}
//                       className="text-blue-600 hover:text-blue-500 hover:underline"
//                     >
//                       Terms of Service
//                     </a>{" "}
//                     and{" "}
//                     <a
//                       href="#"
//                       onClick={openPrivacyModal}
//                       className="text-blue-600 hover:text-blue-500 hover:underline"
//                     >
//                       Privacy Policy
//                     </a>
//                   </label>
//                   {errors.agreeToTerms && (
//                     <p className="mt-1 text-sm text-red-600" id="terms-error">
//                       {errors.agreeToTerms}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <motion.button
//                 type="submit"
//                 disabled={isSubmitting}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className={`w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-white font-medium ${
//                   isSubmitting
//                     ? "bg-blue-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 } transition-colors shadow-sm mt-6`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg
//                       className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Creating Account...
//                   </>
//                 ) : (
//                   "Create Account"
//                 )}
//               </motion.button>

//               {/* Login Link */}
//               <p className="text-center text-sm text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </motion.div>

//         {/* Footer */}
//         <div className="mt-6 text-center text-xs text-gray-500">
//           <p>
//             © {new Date().getFullYear()} ClaimPro Insurance. All rights
//             reserved.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
    server: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const validateField = (field: string, value: any) => {
    let errorMessage = "";

    switch (field) {
      case "firstName":
        if (!value.trim()) errorMessage = "First name is required";
        break;
      case "lastName":
        if (!value.trim()) errorMessage = "Last name is required";
        break;
      case "dateOfBirth":
        if (!value) {
          errorMessage = "Date of birth is required";
        } else {
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          if (age < 18) errorMessage = "You must be at least 18 years old";
          if (age > 100) errorMessage = "Please enter a valid date of birth";
        }
        break;
      case "email":
        if (!value.trim()) {
          errorMessage = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          errorMessage = "Password is required";
        } else if (value.length < 8) {
          errorMessage = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(value)) {
          errorMessage = "Password must contain at least one uppercase letter";
        } else if (!/[0-9]/.test(value)) {
          errorMessage = "Password must contain at least one number";
        }
        break;
      case "confirmPassword":
        if (!value) {
          errorMessage = "Please confirm your password";
        } else if (value !== formData.password) {
          errorMessage = "Passwords don't match";
        }
        break;
      case "agreeToTerms":
        if (!value) errorMessage = "You must accept the terms and conditions";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    return !errorMessage;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Mark field as touched
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Clear server error when user makes changes
    setErrors((prev) => ({ ...prev, server: "" }));
  };

  const validateForm = () => {
    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeToTerms: true,
    });

    const firstNameValid = validateField("firstName", formData.firstName);
    const lastNameValid = validateField("lastName", formData.lastName);
    const dobValid = validateField("dateOfBirth", formData.dateOfBirth);
    const emailValid = validateField("email", formData.email);
    const passwordValid = validateField("password", formData.password);
    const confirmPasswordValid = validateField(
      "confirmPassword",
      formData.confirmPassword
    );
    const agreeToTermsValid = validateField(
      "agreeToTerms",
      formData.agreeToTerms
    );

    return (
      firstNameValid &&
      lastNameValid &&
      dobValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid &&
      agreeToTermsValid
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
        email: formData.email,
        password: formData.password,
      };

      await axios.post(`${API_BASE_URL}/api/users/register`, payload);

      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created. You can now log in.",
        icon: "success",
        confirmButtonColor: "#3b82f6",
      });

      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);

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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Add these new state variables for modals
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Add these functions to handle modal toggling
  const openTermsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTermsModal(true);
  };
  const closeTermsModal = () => {
    setShowTermsModal(false);
  };
  const openPrivacyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPrivacyModal(true);
  };

  // const closePrivacyModal = () => {
  //   setShowPrivacyModal(false);
  // };

  // const closeModals = () => {
  //   setShowTermsModal(false);
  //   setShowPrivacyModal(false);
  // };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
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
            Insurance Claim Processing System
          </h2>
        </motion.div>

        {/* Registration Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create Your Account
            </h1>

            {/* Server Error */}
            {errors.server && (
              <div className="p-3 mb-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 text-center">
                  {errors.server}
                </p>
              </div>
            )}

            {/* Registration Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Fields - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
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
                      className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${
                        errors.firstName
                          ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } transition-colors`}
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={
                        errors.firstName ? "firstName-error" : undefined
                      }
                    />
                  </div>
                  {errors.firstName && (
                    <p
                      className="mt-1 text-sm text-red-600"
                      id="firstName-error"
                    >
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
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
                      className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${
                        errors.lastName
                          ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } transition-colors`}
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={
                        errors.lastName ? "lastName-error" : undefined
                      }
                    />
                  </div>
                  {errors.lastName && (
                    <p
                      className="mt-1 text-sm text-red-600"
                      id="lastName-error"
                    >
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    className={`pl-10 w-full px-4 py-2.5 rounded-lg border ${
                      errors.dateOfBirth
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } transition-colors`}
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    aria-invalid={!!errors.dateOfBirth}
                    aria-describedby={
                      errors.dateOfBirth ? "dateOfBirth-error" : undefined
                    }
                  />
                </div>
                {errors.dateOfBirth && (
                  <p
                    className="mt-1 text-sm text-red-600"
                    id="dateOfBirth-error"
                  >
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Email */}
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
                    autoComplete="new-password"
                    className={`pl-10 pr-10 w-full px-4 py-2.5 rounded-lg border ${
                      errors.password
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } transition-colors`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
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
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600" id="password-error">
                    {errors.password}
                  </p>
                )}

                {/* Password Strength Indicator */}
                {touched.password && formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">
                        Password strength:
                      </span>
                      <span className="text-xs font-medium">
                        {passwordStrength === 0 && "Very weak"}
                        {passwordStrength === 1 && "Weak"}
                        {passwordStrength === 2 && "Medium"}
                        {passwordStrength === 3 && "Strong"}
                        {passwordStrength === 4 && "Very strong"}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          passwordStrength === 0
                            ? "bg-red-500 w-1/5"
                            : passwordStrength === 1
                            ? "bg-orange-500 w-2/5"
                            : passwordStrength === 2
                            ? "bg-yellow-500 w-3/5"
                            : passwordStrength === 3
                            ? "bg-lime-500 w-4/5"
                            : "bg-green-500 w-full"
                        } transition-all duration-300`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
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
                    className={`pl-10 pr-10 w-full px-4 py-2.5 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } transition-colors`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword
                        ? "confirmPassword-error"
                        : undefined
                    }
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p
                    className="mt-1 text-sm text-red-600"
                    id="confirmPassword-error"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                      errors.agreeToTerms ? "border-red-300" : ""
                    }`}
                    aria-invalid={!!errors.agreeToTerms}
                    aria-describedby={
                      errors.agreeToTerms ? "terms-error" : undefined
                    }
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="agreeToTerms"
                    className="font-medium text-gray-700"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      onClick={openTermsModal}
                      className="text-blue-600 hover:text-blue-500 hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      onClick={openPrivacyModal}
                      className="text-blue-600 hover:text-blue-500 hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600" id="terms-error">
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>
              </div>

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
                } transition-colors shadow-sm mt-6`}
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </motion.button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} ClaimPro Insurance. All rights
            reserved.
          </p>
        </div>
      </div>
      {
        //when showprivacymodal is true
      }
      {showPrivacyModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={(e) => e.target === e.currentTarget && closeTermsModal()}
        >
          <div
            className="bg-white p-8 rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Terms of Service
              </h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={closeTermsModal}
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-gray-700 text-sm">
              <p className="font-medium text-base">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p>
                Welcome to ClaimPro Insurance! These Terms of Service outline
                the rules and regulations for the use of our Insurance Claim
                Processing System. By accessing or using our website, you agree
                to comply with these terms. If you do not agree with these
                terms, please do not use our website.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Acceptance of Terms
              </h3>
              <p>
                By accessing or using our website, you agree to be bound by
                these Terms of Service. If you do not agree with these terms,
                please do not use our website.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Use of the Website
              </h3>
              <p>
                You may use our website only for lawful purposes and in a manner
                that does not infringe the rights of, or restrict or inhibit the
                use and enjoyment of, our website. You agree not to use our
                website for any illegal or unauthorized purpose.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Intellectual Property
              </h3>
              <p>
                All content, materials, and features on our website, including
                text, graphics, logos, images, and software, are the property of
                ClaimPro Insurance or its licensors and are protected by
                copyright, trademark, and other intellectual property laws. You
                may not use, reproduce, modify, distribute, or create derivative
                works of any content on our website without our prior written
                consent.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Disclaimer of Warranties
              </h3>
              <p>
                Our website is provided on an "as is" and "as available" basis.
                We make no warranties, express or implied, regarding the
                accuracy, completeness, or reliability of any information or
                materials on our website. We do not warrant that our website
                will be uninterrupted or error-free, or that any defects will be
                corrected.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Limitation of Liability
              </h3>
              <p>
                In no event shall ClaimPro Insurance, its affiliates, officers,
                directors, employees, or agents be liable for any direct,
                indirect, incidental, special, or consequential damages arising
                out of or in connection with your use of our website, even if
                ClaimPro Insurance has been advised of the possibility of such
                damages.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Indemnification
              </h3>
              <p>
                You agree to indemnify and hold harmless ClaimPro Insurance and
                its affiliates, officers, directors, employees, and agents from
                any claims, damages, losses, liabilities, costs, or expenses,
                including reasonable attorneys' fees, arising out of or in
                connection with your use of our website or your violation of
                these Terms of Service.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Governing Law
              </h3>
              <p>
                These Terms of Service shall be governed by and construed in
                accordance with the laws of the jurisdiction in which ClaimPro
                Insurance is located. Any disputes arising out of or in
                connection with these Terms of Service shall be subject to the
                exclusive jurisdiction of the courts located in the jurisdiction
                in which ClaimPro Insurance is located.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Changes to Terms of Service
              </h3>
              <p>
                ClaimPro Insurance reserves the right to modify or revise these
                Terms of Service at any time. Your continued use of our website
                after any changes to these Terms of Service constitutes your
                acceptance of the revised terms.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Contact Us
              </h3>
              <p>
                If you have any questions or concerns about these Terms of
                Service, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> terms@claimpro.com
                <br />
                <strong>Address:</strong> 123 Insurance Avenue, Suite 500, New
                York, NY 10001
                <br />
                <strong>Phone:</strong> (555) 123-4567
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
                onClick={closeTermsModal}
              >
                Decline
              </button>
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, agreeToTerms: true }));
                  closeTermsModal();
                }}
              >
                I Accept
              </button>
            </div>
          </div>
        </div>
      )}
      {showTermsModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={(e) => e.target === e.currentTarget && closeTermsModal()}
        >
          <div
            className="bg-white p-8 rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Terms of Service
              </h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={closeTermsModal}
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="space-y-4 text-gray-700 text-sm">
              <p className="font-medium text-base">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p>
                Welcome to ClaimPro Insurance! These Terms of Service outline
                the rules and regulations for the use of our Insurance Claim
                Processing System. By accessing or using our website, you agree
                to comply with these terms. If you do not agree with these
                terms, please do not use our website.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Acceptance of Terms
              </h3>
              <p>
                By accessing or using our website, you agree to be bound by
                these Terms of Service. If you do not agree with these terms,
                please do not use our website.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Use of the Website
              </h3>
              <p>
                You may use our website only for lawful purposes and in a manner
                that does not infringe the rights of, or restrict or inhibit the
                use and enjoyment of, our website. You agree not to use our
                website for any illegal or unauthorized purpose.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Intellectual Property
              </h3>
              <p>
                All content, materials, and features on our website, including
                text, graphics, logos, images, and software, are the property of
                ClaimPro Insurance or its licensors and are protected by
                copyright, trademark, and other intellectual property laws. You
                may not use, reproduce, modify, distribute, or create derivative
                works of any content on our website without our prior written
                consent.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Disclaimer of Warranties
              </h3>
              <p>
                Our website is provided on an "as is" and "as available" basis.
                We make no warranties, express or implied, regarding the
                accuracy, completeness, or reliability of any information or
                materials on our website. We do not warrant that our website
                will be uninterrupted or error-free, or that any defects will be
                corrected.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Limitation of Liability
              </h3>
              <p>
                In no event shall ClaimPro Insurance, its affiliates, officers,
                directors, employees, or agents be liable for any direct,
                indirect, incidental, special, or consequential damages arising
                out of or in connection with your use of our website, even if
                ClaimPro Insurance has been advised of the possibility of such
                damages.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Indemnification
              </h3>
              <p>
                You agree to indemnify and hold harmless ClaimPro Insurance and
                its affiliates, officers, directors, employees, and agents from
                any claims, damages, losses, liabilities, costs, or expenses,
                including reasonable attorneys' fees, arising out of or in
                connection with your use of our website or your violation of
                these Terms of Service.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Governing Law
              </h3>
              <p>
                These Terms of Service shall be governed by and construed in
                accordance with the laws of the jurisdiction in which ClaimPro
                Insurance is located. Any disputes arising out of or in
                connection with these Terms of Service shall be subject to the
                exclusive jurisdiction of the courts located in the jurisdiction
                in which ClaimPro Insurance is located.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Changes to Terms of Service
              </h3>
              <p>
                ClaimPro Insurance reserves the right to modify or revise these
                Terms of Service at any time. Your continued use of our website
                after any changes to these Terms of Service constitutes your
                acceptance of the revised terms.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                Contact Us
              </h3>
              <p>
                If you have any questions or concerns about these Terms of
                Service, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> terms@claimpro.com
                <br />
                <strong>Address:</strong> 123 Insurance Avenue, Suite 500, New
                York, NY 10001
                <br />
                <strong>Phone:</strong> (555) 123-4567
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800"
                onClick={closeTermsModal}
              >
                Decline
              </button>
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, agreeToTerms: true }));
                  closeTermsModal();
                }}
              >
                I Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;
