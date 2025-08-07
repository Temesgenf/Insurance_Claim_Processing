import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/productService";
import {
  ShieldCheckIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  CalculatorIcon,
  StarIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "../utils/formatters";
import Breadcrumb from "../components/ui/Breadcrumb";
import Spinner from "../components/ui/Spinner";
import { useTheme } from "../Context/ThemeContext";

// Define enums to match backend
const PremiumRate = {
  MONTHLY: "MONTHLY",
  ANNUALLY: "ANNUALLY",
} as const;

const CoverageArea = {
  WORLDWIDE: "WORLDWIDE",
  WORLDWIDE_EXCLUDING_USA: "WORLDWIDE_EXCLUDING_USA",
} as const;

const PlanStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DISCONTINUED: "DISCONTINUED",
} as const;

type PremiumRate = typeof PremiumRate[keyof typeof PremiumRate];
type CoverageArea = typeof CoverageArea[keyof typeof CoverageArea];
type PlanStatus = typeof PlanStatus[keyof typeof PlanStatus];

// Updated Product interface to match TypeORM entity
interface Product {
  readonly productId: number;
  readonly productCode: string;
  readonly productName: string;
  readonly sumInsured: number;
  readonly basePremium: number;
  readonly premiumRate: PremiumRate;
  readonly description: string | null;
  readonly keyBenefits: string[] | null;
  readonly coverages: string[] | null;
  readonly coverageArea: CoverageArea;
  readonly policyTermMonths: number;
  readonly deductible: number | null;
  readonly costSharePercentage: number | null;
  readonly outOfPocketMaximum: number | null;
  readonly eligibilityCriteria: string[] | null;
  readonly exclusions: string[] | null;
  readonly status: PlanStatus;
  readonly additionalBenefits: { [key: string]: string | number } | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const ProductDetail: React.FC = () => {
  const { theme } = useTheme();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Theme-based styling
  const getBgColor = () => (theme === "dark" ? "bg-gray-900" : "bg-gray-50");
  const getCardBgColor = () => (theme === "dark" ? "bg-gray-800" : "bg-white");
  const getTextColor = () => (theme === "dark" ? "text-gray-100" : "text-gray-800");
  const getSubTextColor = () => (theme === "dark" ? "text-gray-300" : "text-gray-600");
  const getBorderColor = () => (theme === "dark" ? "border-gray-700" : "border-gray-200");
  const getIconColor = () => (theme === "dark" ? "text-brand-400" : "text-brand-500");

  // Helper function to format coverage area for display
  const formatCoverageArea = (area: CoverageArea) => {
    switch (area) {
      case CoverageArea.WORLDWIDE:
        return "Worldwide";
      case CoverageArea.WORLDWIDE_EXCLUDING_USA:
        return "Worldwide excluding USA";
      default:
        return area;
    }
  };

  // Helper function to format plan status for display
  const formatPlanStatus = (status: PlanStatus) => {
    switch (status) {
      case PlanStatus.ACTIVE:
        return "Active";
      case PlanStatus.INACTIVE:
        return "Inactive";
      case PlanStatus.DISCONTINUED:
        return "Discontinued";
      default:
        return status;
    }
  };

  // Helper function to safely format dates
  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(parseInt(productId!));
        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product details.");
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className={`min-h-screen ${getBgColor()} flex items-center justify-center`}>
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${getBgColor()} flex items-center justify-center`}>
        <div className={`${getCardBgColor()} p-8 rounded-lg shadow-md max-w-md w-full`}>
          <div className="text-red-500 text-center mb-4">
            <InformationCircleIcon className="w-12 h-12 mx-auto" />
          </div>
          <h2 className={`text-xl font-semibold text-center ${getTextColor()} mb-4`}>Error</h2>
          <p className={`${getSubTextColor()} text-center`}>{error}</p>
          <div className="mt-6 text-center">
            <Link
              to="/products"
              className={`${theme === "dark" ? "text-brand-400" : "text-brand-500"} hover:${
                theme === "dark" ? "text-brand-300" : "text-brand-600"
              } font-medium`}
            >
              Return to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${getBgColor()} flex items-center justify-center`}>
        <div className={`${getCardBgColor()} p-8 rounded-lg shadow-md max-w-md w-full`}>
          <div className="text-yellow-500 text-center mb-4">
            <InformationCircleIcon className="w-12 h-12 mx-auto" />
          </div>
          <h2 className={`text-xl font-semibold text-center ${getTextColor()} mb-4`}>Product Not Found</h2>
          <p className={`${getSubTextColor()} text-center`}>The product you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6 text-center">
            <Link
              to="/products"
              className={`${theme === "dark" ? "text-brand-400" : "text-brand-500"} hover:${
                theme === "dark" ? "text-brand-300" : "text-brand-600"
              } font-medium`}
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getBgColor()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: product.productName, href: "#" }]} />
        <div className="mb-6">
          <Link
            to="/user/products"
            className={`inline-flex items-center ${theme === "dark" ? "text-brand-400" : "text-brand-500"} hover:${
              theme === "dark" ? "text-brand-300" : "text-brand-600"
            }`}
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Back to Products
          </Link>
        </div>

        {/* Hero Section */}
        <div className={`${getCardBgColor()} rounded-lg shadow-xl overflow-hidden border ${getBorderColor()} mb-8`}>
          <div
            className={`${theme === "dark" ? "bg-gradient-to-r from-brand-900 to-brand-700" : "bg-gradient-to-r from-brand-700 to-brand-500"} text-white px-8 py-10`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-3xl font-bold flex items-center">
                  <ShieldCheckIcon className="mr-3 h-8 w-8" />
                  {product.productName}
                </h1>
                <p className="text-brand-100 mt-2 text-lg">Comprehensive protection with ClaimPro</p>
                <div className="flex items-center mt-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} className="text-yellow-400 mr-1 h-5 w-5" />
                    ))}
                  </div>
                  <span className="text-sm ml-2 text-brand-100">Trusted by thousands of customers</span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <div className="bg-opacity-20 rounded-lg px-4 py-3 backdrop-blur-sm">
                  <p className="text-sm text-brand-100">Starting from</p>
                  <p className="text-3xl font-bold">{formatCurrency(product.basePremium)}</p>
                  <p className="text-sm text-brand-100">
                    per {product.premiumRate === PremiumRate.MONTHLY ? 'month' : 'year'}
                  </p>
                </div>
                <Link
                  to={`/products/${product.productId}/apply`}
                  className={`mt-4 inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    theme === "dark" ? "bg-brand-500 hover:bg-brand-400" : "bg-white text-brand-700 hover:bg-brand-50"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200`}
                >
                  Get a Quote <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} px-8 py-4 border-b ${getBorderColor()}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <div className={`rounded-full p-2 ${theme === "dark" ? "bg-brand-900" : "bg-brand-100"}`}>
                  <ShieldCheckIcon className={`${getIconColor()} h-5 w-5`} />
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Coverage up to</p>
                  <p className={`font-medium ${getTextColor()}`}>{formatCurrency(product.sumInsured)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className={`rounded-full p-2 ${theme === "dark" ? "bg-brand-900" : "bg-brand-100"}`}>
                  <DocumentTextIcon className={`${getIconColor()} h-5 w-5`} />
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Product Code</p>
                  <p className={`font-medium ${getTextColor()}`}>{product.productCode}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className={`rounded-full p-2 ${theme === "dark" ? "bg-brand-900" : "bg-brand-100"}`}>
                  <CalculatorIcon className={`${getIconColor()} h-5 w-5`} />
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Coverage Area</p>
                  <p className={`font-medium ${getTextColor()}`}>{formatCoverageArea(product.coverageArea)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className={`rounded-full p-2 ${theme === "dark" ? "bg-brand-900" : "bg-brand-100"}`}>
                  <DocumentTextIcon className={`${getIconColor()} h-5 w-5`} />
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Policy Term</p>
                  <p className={`font-medium ${getTextColor()}`}>{product.policyTermMonths} months</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Product Description */}
            {product.description && (
              <div className="mb-10">
                <h2 className={`text-2xl font-semibold ${getTextColor()} mb-4`}>About ClaimPro {product.productName}</h2>
                <div className={`${getSubTextColor()} text-lg leading-relaxed`}>
                  <p>{product.description}</p>
                </div>
              </div>
            )}

            {/* Key Benefits Section */}
            {product.keyBenefits && product.keyBenefits.length > 0 && (
              <div className="mb-10">
                <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>Why Choose ClaimPro {product.productName}</h2>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`h-full w-full max-w-5xl mx-auto ${theme === "dark" ? "opacity-10" : "opacity-5"}`}>
                      <svg viewBox="0 0 500 200" className="w-full h-full">
                        <path
                          d="M50,100 C150,0 350,200 450,100"
                          stroke={theme === "dark" ? "#a5b4fc" : "#4f46e5"}
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="5,5"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {product.keyBenefits.map((benefit, index) => (
                      <div
                        key={index}
                        className={`group transform transition-all duration-300 hover:scale-[1.02] ${
                          theme === "dark"
                            ? "bg-gradient-to-br from-gray-800 to-gray-750 hover:from-gray-750 hover:to-gray-700"
                            : "bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100"
                        } p-6 rounded-xl border ${getBorderColor()} shadow-sm hover:shadow-md overflow-hidden relative`}
                      >
                        <div
                          className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${
                            theme === "dark" ? "bg-brand-900" : "bg-brand-100"
                          } opacity-20 group-hover:opacity-30 transition-all duration-500`}
                        ></div>
                        <div
                          className={`w-14 h-14 rounded-2xl mb-5 flex items-center justify-center ${
                            theme === "dark" ? "bg-gradient-to-br from-brand-800 to-brand-600" : "bg-gradient-to-br from-brand-500 to-brand-400"
                          } shadow-md`}
                        >
                          <CheckCircleIcon className="text-white h-5 w-5" />
                        </div>
                        <h3 className={`font-semibold ${getTextColor()} text-lg mb-3 relative z-10`}>Benefit {index + 1}</h3>
                        <p className={`${getSubTextColor()} relative z-10`}>{benefit}</p>
                        <div
                          className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${
                            theme === "dark" ? "border-brand-500" : "border-brand-400"
                          } rounded-bl-xl transition-all duration-300 group-hover:w-10 group-hover:h-10`}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Coverage Details Section */}
            {product.coverages && product.coverages.length > 0 && (
              <div className="mb-10">
                <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>What's Covered</h2>
                <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} p-6 rounded-lg border ${getBorderColor()} shadow-sm`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.coverages.map((coverage, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`rounded-full p-1 ${theme === "dark" ? "bg-green-900" : "bg-green-100"} mt-1 flex-shrink-0`}>
                          <CheckCircleIcon className={`${theme === "dark" ? "text-green-400" : "text-green-600"} h-4 w-4`} />
                        </div>
                        <span className={`${getSubTextColor()} ml-3`}>{coverage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Financial Details Section */}
            <div className="mb-10">
              <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>Financial Details</h2>
              <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-lg border ${getBorderColor()} shadow-sm overflow-hidden`}>
                <table className="w-full">
                  <thead>
                    <tr className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${getTextColor()}`}>Detail</th>
                      <th className={`px-6 py-4 text-right text-sm font-semibold ${getTextColor()}`}>Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className={`px-6 py-4 ${getSubTextColor()}`}>Sum Insured</td>
                      <td className={`px-6 py-4 text-right font-medium ${getTextColor()}`}>{formatCurrency(product.sumInsured)}</td>
                    </tr>
                    <tr className={`${theme === "dark" ? "bg-gray-750" : "bg-gray-50"}`}>
                      <td className={`px-6 py-4 ${getSubTextColor()}`}>Base Premium</td>
                      <td className={`px-6 py-4 text-right font-medium ${getTextColor()}`}>{formatCurrency(product.basePremium)}</td>
                    </tr>
                    <tr>
                      <td className={`px-6 py-4 ${getSubTextColor()}`}>Premium Rate</td>
                      <td className={`px-6 py-4 text-right font-medium ${getTextColor()}`}>
                        {product.premiumRate === PremiumRate.MONTHLY ? 'Monthly' : 'Annually'}
                      </td>
                    </tr>
                    {product.deductible !== null && (
                      <tr className={`${theme === "dark" ? "bg-gray-750" : "bg-gray-50"}`}>
                        <td className={`px-6 py-4 ${getSubTextColor()}`}>Deductible</td>
                        <td className={`px-6 py-4 text-right font-medium ${getTextColor()}`}>{formatCurrency(product.deductible)}</td>
                      </tr>
                    )}
                    {product.costSharePercentage !== null && (
                      <tr>
                        <td className={`px-6 py-4 ${getSubTextColor()}`}>Cost Share</td>
                        <td className={`px-6 py-4 text-right font-medium ${getTextColor()}`}>{product.costSharePercentage}%</td>
                      </tr>
                    )}
                    {product.outOfPocketMaximum !== null && (
                      <tr className={`${theme === "dark" ? "bg-gray-750" : "bg-gray-50"}`}>
                        <td className={`px-6 py-4 ${getSubTextColor()}`}>Out-of-Pocket Maximum</td>
                        <td className={`px-6 py-4 text-right font-medium ${getTextColor()}`}>{formatCurrency(product.outOfPocketMaximum)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Eligibility Criteria Section */}
            {product.eligibilityCriteria && product.eligibilityCriteria.length > 0 && (
              <div className="mb-10">
                <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>Eligibility Criteria</h2>
                <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} p-6 rounded-lg border ${getBorderColor()} shadow-sm`}>
                  <ul className="list-disc list-inside space-y-2">
                    {product.eligibilityCriteria.map((criterion, index) => (
                      <li key={index} className={`${getSubTextColor()}`}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Exclusions Section */}
            {product.exclusions && product.exclusions.length > 0 && (
              <div className="mb-10">
                <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>Exclusions</h2>
                <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} p-6 rounded-lg border ${getBorderColor()} shadow-sm`}>
                  <ul className="list-disc list-inside space-y-2">
                    {product.exclusions.map((exclusion, index) => (
                      <li key={index} className={`${getSubTextColor()}`}>{exclusion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Additional Benefits Section */}
            {product.additionalBenefits && Object.keys(product.additionalBenefits).length > 0 && (
              <div className="mb-10">
                <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>Additional Benefits</h2>
                <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} p-6 rounded-lg border ${getBorderColor()} shadow-sm`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.additionalBenefits).map(([key, value], index) => (
                      <div key={index} className="flex items-start">
                        <div className={`rounded-full p-1 ${theme === "dark" ? "bg-green-900" : "bg-green-100"} mt-1 flex-shrink-0`}>
                          <CheckCircleIcon className={`${theme === "dark" ? "text-green-400" : "text-green-600"} h-4 w-4`} />
                        </div>
                        <span className={`${getSubTextColor()} ml-3`}>
                          {key.replace(/([A-Z])/g, " $1").trim()}: {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Plan Status Section */}
            <div className="mb-10">
              <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>Plan Status</h2>
              <div className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} p-6 rounded-lg border ${getBorderColor()} shadow-sm`}>
                <p className={`${getSubTextColor()}`}>
                  Status: <span className="font-medium">{formatPlanStatus(product.status)}</span>
                </p>
                <p className={`${getSubTextColor()} mt-2`}>Created: {formatDate(product.createdAt)}</p>
                <p className={`${getSubTextColor()} mt-2`}>Last Updated: {formatDate(product.updatedAt)}</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className={`${theme === "dark" ? "bg-gray-750" : "bg-gray-50"} rounded-lg p-8 text-center border ${getBorderColor()}`}>
              <h3 className={`text-xl font-semibold ${getTextColor()} mb-3`}>Ready to Protect with ClaimPro?</h3>
              <p className={`${getSubTextColor()} mb-6 max-w-2xl mx-auto`}>
                Get personalized coverage with ClaimPro that fits your needs and budget. Our experts are ready to assist you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to={`/products/${product.productId}/apply`}
                  className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    theme === "dark" ? "bg-brand-600 hover:bg-brand-500" : "bg-brand-500 hover:bg-brand-600"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200`}
                >
                  Apply Now
                </Link>
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center px-6 py-3 border ${
                    theme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  } rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200`}
                >
                  Contact an Agent
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`${getCardBgColor()} rounded-lg shadow-md overflow-hidden border ${getBorderColor()} mb-8`}>
          <div className={`${theme === "dark" ? "bg-gray-750" : "bg-gray-50"} px-6 py-4 border-b ${getBorderColor()}`}>
            <h2 className={`text-xl font-semibold ${getTextColor()}`}>Frequently Asked Questions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  question: "How do I file a claim with ClaimPro?",
                  answer: "You can file a claim through our online portal, mobile app, or by calling our 24/7 customer service line. ClaimPro's claims process is designed to be simple and hassle-free.",
                },
                {
                  question: "What does this insurance cover?",
                  answer: "This insurance provides coverage for a range of scenarios as detailed in the 'What's Covered' section. For specific coverage questions, please refer to the policy documents or contact our support team.",
                },
                {
                  question: "How are premiums calculated?",
                  answer: "Premiums are calculated based on several factors including coverage amount, risk assessment, and optional add-ons. The base premium shown is a starting point, and your actual premium may vary.",
                },
                {
                  question: "Can I customize my coverage with ClaimPro?",
                  answer: "Yes, ClaimPro offers flexible coverage options that can be tailored to your specific needs. During the application process, you'll have the opportunity to customize your policy.",
                },
              ].map((faq, index) => (
                <div key={index} className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-lg border ${getBorderColor()} overflow-hidden`}>
                  <div className={`px-6 py-4 ${theme === "dark" ? "bg-gray-750" : "bg-gray-50"} border-b ${getBorderColor()}`}>
                    <h3 className={`font-medium ${getTextColor()}`}>{faq.question}</h3>
                  </div>
                  <div className="px-6 py-4">
                    <p className={getSubTextColor()}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;