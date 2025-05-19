import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { Product } from "../../../types/product.enum";
import { useTheme } from "../Context/ThemeContext";
import {
  FaArrowLeft,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaInfoCircle,
  FaFileAlt,
  FaCalculator,
  FaStar,
  FaChevronRight,
} from "react-icons/fa";
import { formatCurrency } from "../utils/formatters";
import Breadcrumb from "../components/ui/Breadcrumb";
import Spinner from "../components/ui/Spinner";

const ProductDetail: React.FC = () => {
  const { theme } = useTheme();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper functions for theme-based styling
  const getBgColor = () => (theme === "dark" ? "bg-gray-900" : "bg-gray-50");
  const getCardBgColor = () => (theme === "dark" ? "bg-gray-800" : "bg-white");
  const getTextColor = () =>
    theme === "dark" ? "text-gray-100" : "text-gray-800";
  const getSubTextColor = () =>
    theme === "dark" ? "text-gray-300" : "text-gray-600";
  const getBorderColor = () =>
    theme === "dark" ? "border-gray-700" : "border-gray-200";
  const getHeaderBgColor = () =>
    theme === "dark" ? "bg-gray-700" : "bg-gray-50";
  const getIconColor = () =>
    theme === "dark" ? "text-brand-400" : "text-brand-500";

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
      <div
        className={`min-h-screen ${getBgColor()} flex items-center justify-center`}
      >
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen ${getBgColor()} flex items-center justify-center`}
      >
        <div
          className={`${getCardBgColor()} p-8 rounded-lg shadow-md max-w-md w-full`}
        >
          <div className="text-red-500 text-center mb-4">
            <FaInfoCircle className="w-12 h-12 mx-auto" />
          </div>
          <h2
            className={`text-xl font-semibold text-center ${getTextColor()} mb-4`}
          >
            Error
          </h2>
          <p className={`${getSubTextColor()} text-center`}>{error}</p>
          <div className="mt-6 text-center">
            <Link
              to="/products"
              className={`${
                theme === "dark" ? "text-brand-400" : "text-brand-500"
              } hover:${
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
      <div
        className={`min-h-screen ${getBgColor()} flex items-center justify-center`}
      >
        <div
          className={`${getCardBgColor()} p-8 rounded-lg shadow-md max-w-md w-full`}
        >
          <div className="text-yellow-500 text-center mb-4">
            <FaInfoCircle className="w-12 h-12 mx-auto" />
          </div>
          <h2
            className={`text-xl font-semibold text-center ${getTextColor()} mb-4`}
          >
            Product Not Found
          </h2>
          <p className={`${getSubTextColor()} text-center`}>
            The product you're looking for doesn't exist or has been removed.
          </p>
          <div className="mt-6 text-center">
            <Link
              to="/products"
              className={`${
                theme === "dark" ? "text-brand-400" : "text-brand-500"
              } hover:${
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
        <Breadcrumb
          items={[
            { label: "Products", href: "/products" },
            { label: product.productName, href: "#" },
          ]}
        />

        <div className="mb-6">
          <Link
            to="/products"
            className={`inline-flex items-center ${
              theme === "dark" ? "text-brand-400" : "text-brand-500"
            } hover:${theme === "dark" ? "text-brand-300" : "text-brand-600"}`}
          >
            <FaArrowLeft className="mr-2" />
            Back to Products
          </Link>
        </div>

        {/* Hero Section */}
        <div
          className={`${getCardBgColor()} rounded-lg shadow-xl overflow-hidden border ${getBorderColor()} mb-8`}
        >
          <div
            className={`${
              theme === "dark"
                ? "bg-gradient-to-r from-brand-900 to-brand-700"
                : "bg-gradient-to-r from-brand-700 to-brand-500"
            } text-white px-8 py-10`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-3xl font-bold flex items-center">
                  <FaShieldAlt className="mr-3" />
                  {product.productName}
                </h1>
                <p className="text-brand-100 mt-2 text-lg">
                  Comprehensive protection for what matters most
                </p>
                <div className="flex items-center mt-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="text-yellow-400 mr-1" />
                    ))}
                  </div>
                  <span className="text-sm ml-2 text-brand-100">
                    Trusted by thousands of customers
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <div className="bg-white bg-opacity-20 rounded-lg px-4 py-3 backdrop-blur-sm">
                  <p className="text-sm text-brand-100">Starting from</p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(product.basePremium)}
                  </p>
                  <p className="text-sm text-brand-100">per month</p>
                </div>
                <Link
                  to={`/products/${product.productId}/apply`}
                  className={`mt-4 inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    theme === "dark"
                      ? "bg-brand-500 hover:bg-brand-400"
                      : "bg-white text-brand-700 hover:bg-brand-50"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200`}
                >
                  Get a Quote <FaChevronRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            } px-8 py-4 border-b ${getBorderColor()}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div
                  className={`rounded-full p-2 ${
                    theme === "dark" ? "bg-brand-900" : "bg-brand-100"
                  }`}
                >
                  <FaShieldAlt className={`${getIconColor()}`} />
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Coverage up to
                  </p>
                  <p className={`font-medium ${getTextColor()}`}>
                    {formatCurrency(product.sumInsured)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div
                  className={`rounded-full p-2 ${
                    theme === "dark" ? "bg-brand-900" : "bg-brand-100"
                  }`}
                >
                  <FaCalculator className={`${getIconColor()}`} />
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Premium Rate
                  </p>
                  <p className={`font-medium ${getTextColor()}`}>
                    {product.premiumRate}%
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div
                  className={`rounded-full p-2 ${
                    theme === "dark" ? "bg-brand-900" : "bg-brand-100"
                  }`}
                >
                  <FaFileAlt className={`${getIconColor()}`} />
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Product Code
                  </p>
                  <p className={`font-medium ${getTextColor()}`}>
                    {product.productCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Product Description */}
            <div className="mb-10">
              <h2 className={`text-2xl font-semibold ${getTextColor()} mb-4`}>
                About This Insurance
              </h2>
              <div className={`${getSubTextColor()} text-lg leading-relaxed`}>
                <p>{product.description}</p>
              </div>
            </div>

            {/* Key Benefits Section */}
            <div className="mb-10">
              <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.keyBenefits &&
                  product.keyBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`${
                        theme === "dark"
                          ? "bg-gray-700 hover:bg-gray-650"
                          : "bg-white hover:bg-gray-50"
                      } p-6 rounded-lg border ${getBorderColor()} shadow-sm transition-all duration-200 hover:shadow-md`}
                    >
                      <div
                        className={`rounded-full w-12 h-12 flex items-center justify-center ${
                          theme === "dark" ? "bg-brand-900" : "bg-brand-50"
                        } mb-4`}
                      >
                        <FaCheckCircle
                          className={`${getIconColor()} text-xl`}
                        />
                      </div>
                      <h3
                        className={`font-semibold ${getTextColor()} text-lg mb-2`}
                      >
                        Benefit {index + 1}
                      </h3>
                      <p className={`${getSubTextColor()}`}>{benefit}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Coverage Details Section */}
            <div className="mb-10">
              <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>
                What's Covered
              </h2>
              <div
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-white"
                } p-6 rounded-lg border ${getBorderColor()} shadow-sm`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.coverages &&
                    product.coverages.map((coverage, index) => (
                      <div key={index} className="flex items-start">
                        <div
                          className={`rounded-full p-1 ${
                            theme === "dark" ? "bg-green-900" : "bg-green-100"
                          } mt-1 flex-shrink-0`}
                        >
                          <FaCheckCircle
                            className={`${
                              theme === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                            } text-sm`}
                          />
                        </div>
                        <span className={`${getSubTextColor()} ml-3`}>
                          {coverage}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Financial Details Section */}
            <div className="mb-10">
              <h2 className={`text-2xl font-semibold ${getTextColor()} mb-6`}>
                Financial Details
              </h2>
              <div
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-white"
                } rounded-lg border ${getBorderColor()} shadow-sm overflow-hidden`}
              >
                <table className="w-full">
                  <thead>
                    <tr
                      className={`${
                        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                      }`}
                    >
                      <th
                        className={`px-6 py-4 text-left text-sm font-semibold ${getTextColor()}`}
                      >
                        Detail
                      </th>
                      <th
                        className={`px-6 py-4 text-right text-sm font-semibold ${getTextColor()}`}
                      >
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className={`px-6 py-4 ${getSubTextColor()}`}>
                        Sum Insured
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-medium ${getTextColor()}`}
                      >
                        {formatCurrency(product.sumInsured)}
                      </td>
                    </tr>
                    <tr
                      className={`${
                        theme === "dark" ? "bg-gray-750" : "bg-gray-50"
                      }`}
                    >
                      <td className={`px-6 py-4 ${getSubTextColor()}`}>
                        Base Premium
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-medium ${getTextColor()}`}
                      >
                        {formatCurrency(product.basePremium)}
                      </td>
                    </tr>
                    <tr>
                      <td className={`px-6 py-4 ${getSubTextColor()}`}>
                        Premium Rate
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-medium ${getTextColor()}`}
                      >
                        {product.premiumRate}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Call to Action */}
            <div
              className={`${
                theme === "dark" ? "bg-gray-750" : "bg-gray-50"
              } rounded-lg p-8 text-center border ${getBorderColor()}`}
            >
              <h3 className={`text-xl font-semibold ${getTextColor()} mb-3`}>
                Ready to protect what matters most?
              </h3>
              <p className={`${getSubTextColor()} mb-6 max-w-2xl mx-auto`}>
                Get personalized coverage that fits your needs and budget. Our
                experts are ready to help you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to={`/products/${product.productId}/apply`}
                  className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    theme === "dark"
                      ? "bg-brand-600 hover:bg-brand-500"
                      : "bg-brand-500 hover:bg-brand-600"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200`}
                >
                  Apply Now
                </Link>
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center px-6 py-3 border ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  } rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200`}
                >
                  Contact an Agent
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className={`${getCardBgColor()} rounded-lg shadow-md overflow-hidden border ${getBorderColor()} mb-8`}
        >
          <div
            className={`${
              theme === "dark" ? "bg-gray-750" : "bg-gray-50"
            } px-6 py-4 border-b ${getBorderColor()}`}
          >
            <h2 className={`text-xl font-semibold ${getTextColor()}`}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  question: "How do I file a claim?",
                  answer:
                    "You can file a claim through our online portal, mobile app, or by calling our 24/7 customer service line. Our claims process is designed to be simple and hassle-free.",
                },
                {
                  question: "What does this insurance cover?",
                  answer:
                    "This insurance provides coverage for a range of scenarios as detailed in the 'What's Covered' section. For specific coverage questions, please refer to the policy documents or contact our support team.",
                },
                {
                  question: "How are premiums calculated?",
                  answer:
                    "Premiums are calculated based on several factors including coverage amount, risk assessment, and optional add-ons. The base premium shown is a starting point, and your actual premium may vary.",
                },
                {
                  question: "Can I customize my coverage?",
                  answer:
                    "Yes, we offer flexible coverage options that can be tailored to your specific needs. During the application process, you'll have the opportunity to customize your policy.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-white"
                  } rounded-lg border ${getBorderColor()} overflow-hidden`}
                >
                  <div
                    className={`px-6 py-4 ${
                      theme === "dark" ? "bg-gray-750" : "bg-gray-50"
                    } border-b ${getBorderColor()}`}
                  >
                    <h3 className={`font-medium ${getTextColor()}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className="px-6 py-4">
                    <p className={getSubTextColor()}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        {/* <div className={`${getCardBgColor()} rounded-lg shadow-md overflow-hidden border ${getBorderColor()}`}>
          <div className={`${theme === "dark" ? "bg-gray-750" : "bg-gray-50"} px-6 py-4 border-b ${getBorderColor()}`}>
            <h2 className={`text-xl font-semibold ${getTextColor()}`}>What Our Customers Say</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Homeowner",
                  comment: "The claims process was incredibly smooth. I was worried about getting coverage for my damages, but the team was supportive throughout the entire process."
                },
                {
                  name: "Michael Chen",
                  role: "Business Owner",
                  comment: "As a small business owner, I needed comprehensive coverage that wouldn't break the bank. This insurance provided exactly what I needed at a price I could afford."
                },
                {
                  name: "Emily Rodriguez",
                  role: "Family Coverage",
                  comment: "The customer service is exceptional. Whenever I have questions about my policy, I get clear and helpful answers. I feel secure knowing my family is protected."
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} p-6 rounded-lg border ${getBorderColor()} shadow-sm`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full ${theme === "dark" ? "bg-brand-800" : "bg-brand-100"} flex items-center justify-center`}>
                      <span className={`font-semibold ${theme === "dark" ? "text-brand-200" : "text-brand-700"}`}>
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h4 className={`font-medium ${getTextColor()}`}>{testimonial.name}</h4>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="inline-block text-yellow-400 mr-1" />
                    ))}
                  </div>
                  <p className={`${getSubTextColor()} italic`}>"{testimonial.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetail;
