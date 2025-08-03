import AppSidebar from "../components/layout/AppSidebar";
import { useState, useEffect } from "react";
import { createPolicy } from "../services/policyService";
import { getAllProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../server/src/common/enums/product.enum";
import { motion, type Variants } from "framer-motion"; // Add Variants import
import { FaShieldAlt, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

interface FormState {
  productId: string;
  sumInsured: string;
  deductibleAmount: string;
  basePremium: string;
}

const NewPolicyPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [form, setForm] = useState<FormState>({
    productId: "",
    sumInsured: "",
    deductibleAmount: "",
    basePremium: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getAllProducts();
        setProducts(response.data || []);
      } catch (err) {
        setProducts([]);
        setError("Failed to load products. Please try again later.");
      }
    }
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "productId") {
      if (!value) {
        // Reset form if product is deselected
        setForm({
          productId: "",
          sumInsured: "",
          deductibleAmount: "",
          basePremium: "",
        });
        return;
      }

      // Auto-fill if a product is selected
      const selectedProduct = products.find((p) => p.productId.toString() === value);
      if (selectedProduct) {
        setForm({
          productId: value,
          sumInsured: selectedProduct.sumInsured.toString(),
          deductibleAmount: "0", // Default deductible
          basePremium: selectedProduct.basePremium.toString(),
        });
        return;
      }
    }

    // Default behavior for other inputs
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.productId) {
      setError("Please select a product");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createPolicy({
        productId: form.productId,
        sumInsured: form.sumInsured,
        deductibleAmount: form.deductibleAmount,
        basePremium: form.basePremium,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/user/policies");
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "Failed to create policy");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 }, // Fix: Add 'as const'
    },
  };

  // Theme functions
  const getBgColor = () => (theme === "dark" ? "bg-gray-900" : "bg-gray-50");
  const getCardBgColor = () => (theme === "dark" ? "bg-gray-800" : "bg-white");
  const getTextColor = () => (theme === "dark" ? "text-gray-100" : "text-gray-800");
  const getSubTextColor = () => (theme === "dark" ? "text-gray-300" : "text-gray-600");
  const getBorderColor = () => (theme === "dark" ? "border-gray-700" : "border-gray-200");
  const getHeaderBgColor = () => (theme === "dark" ? "bg-gray-700" : "bg-gray-50");
  const getInputBgColor = () => (theme === "dark" ? "bg-gray-700" : "bg-white");
  const getInputBorderColor = () => (theme === "dark" ? "border-gray-600" : "border-gray-300");
  const getInputTextColor = () => (theme === "dark" ? "text-gray-100" : "text-gray-900");
  const getInputPlaceholderColor = () => (theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500");
  const getInfoBgColor = () => (theme === "dark" ? "bg-blue-900" : "bg-blue-50");
  const getInfoBorderColor = () => (theme === "dark" ? "border-blue-800" : "border-blue-200");
  const getInfoTextColor = () => (theme === "dark" ? "text-blue-200" : "text-blue-700");

  const selectedProduct = products.find(p => p.productId.toString() === form.productId);

  return (
    <main className={`flex min-h-screen ${getBgColor()}`}>
      <AppSidebar />
      <div className="flex-1 p-6 md:p-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className={`text-3xl font-bold ${getTextColor()} mb-2`}>
              Create New Policy
            </h1>
            <p className={getSubTextColor()}>
              Complete the form below to create a new insurance policy
            </p>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900' : 'bg-green-50'} border ${theme === 'dark' ? 'border-green-800' : 'border-green-200'} ${theme === 'dark' ? 'text-green-200' : 'text-green-700'} flex items-center`}
            >
              <FaShieldAlt className="mr-3" />
              <div>
                <p className="font-medium">Policy created successfully!</p>
                <p className="text-sm">Redirecting to your policies...</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900' : 'bg-red-50'} border ${theme === 'dark' ? 'border-red-800' : 'border-red-200'} ${theme === 'dark' ? 'text-red-200' : 'text-red-700'}`}
            >
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className={`${getCardBgColor()} rounded-xl shadow-sm ${getBorderColor()} border overflow-hidden`}
          >
            <div className={`p-6 border-b ${getBorderColor()} ${getHeaderBgColor()}`}>
              <div className="flex items-center">
                <FaShieldAlt className={`${theme === 'dark' ? 'text-blue-300' : 'text-[#154654]'} mr-3 text-xl`} />
                <h2 className={`text-xl font-semibold ${getTextColor()}`}>
                  Policy Information
                </h2>
              </div>
            </div>

            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className={`block text-sm font-medium ${getSubTextColor()}`}>
                    Select Product <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="productId"
                    value={form.productId}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  >
                    <option value="">-- Select a product --</option>
                    {products.map((product) => (
                      <option key={product.productId} value={product.productId}>
                        {product.productName}
                      </option>
                    ))}
                  </select>
                  <p className={`text-xs ${getSubTextColor()} mt-1`}>
                    <FaInfoCircle className="inline mr-1" />
                    Choose the insurance product that best fits your needs
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className={`block text-sm font-medium ${getSubTextColor()}`}>
                    Sum Insured
                  </label>
                  <input
                    type="text"
                    name="sumInsured"
                    value={form.sumInsured}
                    onChange={handleChange}
                    readOnly
                    className={`w-full px-4 py-3 rounded-lg border ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} ${getInputPlaceholderColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  />
                  <p className={`text-xs ${getSubTextColor()} mt-1`}>
                    <FaInfoCircle className="inline mr-1" />
                    Maximum coverage amount for this policy
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className={`block text-sm font-medium ${getSubTextColor()}`}>
                    Deductible Amount
                  </label>
                  <input
                    type="text"
                    name="deductibleAmount"
                    value={form.deductibleAmount}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} ${getInputPlaceholderColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  />
                  <p className={`text-xs ${getSubTextColor()} mt-1`}>
                    <FaInfoCircle className="inline mr-1" />
                    Amount you pay before insurance coverage begins
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className={`block text-sm font-medium ${getSubTextColor()}`}>
                    Base Premium
                  </label>
                  <input
                    type="text"
                    name="basePremium"
                    value={form.basePremium}
                    onChange={handleChange}
                    readOnly
                    className={`w-full px-4 py-3 rounded-lg border ${getInputBorderColor()} ${getInputBgColor()} ${getInputTextColor()} ${getInputPlaceholderColor()} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  />
                  <p className={`text-xs ${getSubTextColor()} mt-1`}>
                    <FaInfoCircle className="inline mr-1" />
                    {selectedProduct?.premiumRate || 'Annual'} premium amount
                  </p>
                </motion.div>
              </div>

              {form.productId && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-4 p-4 rounded-lg ${getInfoBgColor()} border ${getInfoBorderColor()}`}
                >
                  <h4 className={`font-medium ${getInfoTextColor()}`}>Product Benefits:</h4>
                  <ul className={`text-sm ${getInfoTextColor()} space-y-1 pl-6 list-disc mt-2`}>
                    {selectedProduct?.keyBenefits?.map((benefit:string, i:number) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                  {selectedProduct?.description && (
                    <p className={`text-sm ${getInfoTextColor()} mt-2`}>
                      {selectedProduct.description}
                    </p>
                  )}
                </motion.div>
              )}

              <div className={`pt-4 border-t ${getBorderColor()}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className={`text-sm ${getSubTextColor()}`}>
                    <FaCalendarAlt className="inline mr-2" />
                    Policy will start from today and be valid for one year
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition-all flex items-center justify-center ${
                      loading ? "bg-blue-400" : "bg-[#154654] hover:bg-[#0a393f]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        Creating Policy...
                      </>
                    ) : (
                      <>
                        <FaShieldAlt className="mr-2" />
                        Create Policy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <div className={`${getInfoBgColor()} border ${getInfoBorderColor()} rounded-lg p-4`}>
              <h3 className={`font-medium ${getInfoTextColor()} mb-2 flex items-center`}>
                <FaInfoCircle className="mr-2" />
                What happens next?
              </h3>
              <ul className={`text-sm ${getInfoTextColor()} space-y-1 pl-6 list-disc`}>
                <li>Your policy will be created with a unique policy number</li>
                <li>Initial status will be "pending" until approved by our team</li>
                <li>You can view all your policies in the Policies section</li>
                <li>Coverage begins on the start date and ends after one year</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default NewPolicyPage;