
import React from "react";
import { MdHealthAndSafety, MdFamilyRestroom, MdElderly } from "react-icons/md";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: 1,
    icon: <MdHealthAndSafety className="w-8 h-8" />,
    title: "Basic Health Plan",
    price: "$99/mo",
    features: [
      "Hospitalization up to $10k",
      "Free health check-ups",
      "24/7 Telemedicine",
      "Accident coverage",
    ],
    highlight: false,
  },
  {
    id: 2,
    icon: <MdFamilyRestroom className="w-8 h-8" />,
    title: "Family Protection",
    price: "$299/mo",
    features: [
      "Covers 4 family members",
      "Maternity & newborn care",
      "No co-pay visits",
      "Worldwide coverage",
    ],
    highlight: true,
  },
  {
    id: 3,
    icon: <MdElderly className="w-8 h-8" />,
    title: "Senior Care Plan",
    price: "$199/mo",
    features: [
      "Senior-focused coverage",
      "Chronic condition support",
      "Physical therapy",
      "Prescription coverage",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const handleNavigation=()=>{
    navigate("/login");
  }
  return (
    <section className="bg-white py-20" id="products">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-blue-600 mb-4 tracking-wider">
            SIMPLE PRICING
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Protection Made <span className="text-blue-600">Easy</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Straightforward plans with no hidden fees. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className={`relative p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all ${
                plan.highlight
                  ? "border-2 border-blue-500"
                  : "border border-gray-100"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-bl-2xl text-sm font-medium animate-pulse">
                  Most Popular
                </div>
              )}

              <div className="flex flex-col items-start space-y-6">
                <div
                  className={`p-3 rounded-lg ${
                    plan.highlight ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {React.cloneElement(plan.icon, {
                    className: "w-6 h-6 text-blue-600",
                  })}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {plan.title}
                  </h3>
                  <p className="text-3xl font-extrabold text-gray-900">
                    {plan.price}
                    <span className="text-lg font-medium text-gray-500">
                      /month
                    </span>
                  </p>
                </div>

                <ul className="space-y-4 w-full">
                  {plan.features.map((feat, featIdx) => (
                    <motion.li
                      key={feat}
                    
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.2 + featIdx * 0.1 + 0.5 }}
                      className="flex items-center gap-3 text-gray-600 text-sm"
                    >
                      <div className="p-1 bg-green-100 rounded-full">
                        <FaCheck className="text-green-500 w-4 h-4" />
                      </div>
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                onClick={handleNavigation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
                    plan.highlight
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                  <FaArrowRight className="inline-block ml-2" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 mt-12 text-sm"
        >
          30-day money back guarantee • No credit card required
        </motion.p>
      </div>
    </section>
  );
}
