// import React from "react";
// import pricingPlanImage from "../../assets/pricing-plan.png";
// import { MdHealthAndSafety } from "react-icons/md";
// import { MdFamilyRestroom } from "react-icons/md";
// import { FaCheck } from "react-icons/fa6";
// import { IoCheckmark } from "react-icons/io5";
// import { FaArrowRight } from "react-icons/fa";
// const Pricing = () => {
//   return (
//     <section className="mt-[200px] block font-poppins leading-[30px] text-rgb([#000]/[0.87])">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-wrap mx-3">
//           {/* Left Column */}
//           <div className="hidden xl:flex xl:w-5/12 justify-end">
//             <div className="relative">
//               <img
//                 src={pricingPlanImage}
//                 className="max-w-full h-auto"
//                 alt="Pricing illustration"
//               />
//               <div className="flex items-center justify-between gap-[30px] mt-[100px] text-left">
//                 <div className="leading-[30px]">
//                   <h4 className="text-[32px] text-[#000] leading-[44px] font-bold">
//                     Need Your Custom Pricing?
//                   </h4>
//                   <p className="mt-[20px] text-[#797979] font-poppins">
//                     If your need any custom pricing for your business or
//                     anything you can contact with us.
//                   </p>
//                 </div>
//                 <a
//                   href="contact.html"
//                   className="bg-[#ff6a16] w-[162px] h-[162px] text-white rounded-[50%] flex items-center justify-center p-2 grow-0 shrink-0"
//                 >
//                   Contact Us →
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="w-full xl:w-7/12 xl:pl-12">
//             <div className="mb-12 text-left">
//               <h4 className=" font-inter font-normal leading-7 inline-block py-2 px-[30px] bg-[#ff6a16]-50 border border-[#ff6a16]-100 text-[#ff6a16] rounded-[27px] ">
//                 Our Pricing Plan
//               </h4>
//               <h2 className="text-[#797979] text-[66px] leading-[84px] font-tight mt-[30px]">
//                 Your best <span className="text-blue-700">pricing plan</span>{" "}
//                 for your service
//               </h2>
//             </div>

//             <div className="flex flex-wrap -mx-4 ">
//               {/* Insurance Plan 1 */}
//               <div className="max-w-full w-1/2 px-3">
//                 <div className="p-8 rounded-lg hover:shadow-lg transition-shadow">
//                   {/* <img
//                     src="svg/health-insurance.svg"
//                     className="w-16 h-16 mb-4"
//                     alt="Health Insurance Icon"
//                   /> */}
//                   <MdHealthAndSafety className="w-16 h-16 text-blue-600" />
//                   <h3 className="text-[2rem] leading-[44px]  mt-5 mb-[30px] font-bold font-poppins">
//                     Basic Health Plan
//                   </h3>
//                   <ul className="">
//                     {[
//                       "hospitalization up to $10,000",
//                       "Free annual health check-ups",
//                       "24/7 Telemedicine support",
//                       "Affordable monthly premiums",
//                       "Accident & Emergency coverage",
//                     ].map((item) => (
//                       <li
//                         key={item}
//                         className="flex items-center justify-start gap-2 mb-5 leading-[28px]"
//                       >
//                         <FaCheck className="" />
//                         <span className="text-left">{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                   <a
//                     href="contact.html"
//                     className="inline-flex font-[500] items-center gap-3 pb-[5px] relative  text-[#ffa616] mt-[50px]  "
//                   >
//                     Choose Plan
//                     <FaArrowRight className="inline-block ml-2" />
//                     <div className="absolute bottom-0 bg-[#ffa616] w-full h-[2px] transition-transform duration-300"></div>
//                   </a>
//                 </div>
//               </div>

//               {/* Insurance Plan 2 (Active) */}
//               <div className="max-w-full w-1/2 px-3 bg-[#f6f6f6]">
//                 <div className="p-8 rounded-lg hover:shadow-lg transition-shadow">
//                   <MdFamilyRestroom className="w-16 h-16 text-blue-600" />
//                   <h3 className="text-[2rem] leading-[44px]  mt-5 mb-[30px] font-bold font-poppins">
//                     Family Protection Plan
//                   </h3>
//                   <ul className="">
//                     {[
//                       "Covers up to 4 family members",
//                       "Maternity & newborn care",
//                       "No co-pay on primary visits",
//                       "Worldwide emergency coverage",
//                       "Lifetime renewal guarantee",
//                     ].map((item) => (
//                       <li
//                         key={item}
//                         className="flex items-center justify-start gap-2 mb-5 leading-[28px]"
//                       >
//                         <FaCheck className="" />
//                         <span className="text-left">{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                   <a
//                     href="contact.html"
//                     className="inline-flex font-[500] items-center gap-3 pb-[5px] relative  text-[#ffa616] mt-[50px]  "
//                   >
//                     Choose Plan
//                     <FaArrowRight className="inline-block ml-2" />
//                     <div className="absolute bottom-0 bg-[#ffa616] w-full h-[2px] transition-transform duration-300"></div>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;
// import React from "react";
// import pricingPlanImage from "../../assets/pricing-plan.png";
// import { MdHealthAndSafety, MdFamilyRestroom } from "react-icons/md";
// import { FaCheck, FaArrowRight } from "react-icons/fa";
// import { motion } from "framer-motion";

// const plans = [
//   {
//     id: 1,
//     icon: <MdHealthAndSafety className="w-12 h-12 text-blue-600" />,
//     title: "Basic Health Plan",
//     features: [
//       "Hospitalization up to $10,000",
//       "Free annual health check-ups",
//       "24/7 Telemedicine support",
//       "Affordable monthly premiums",
//       "Accident & Emergency coverage",
//     ],
//     highlight: false,
//   },
//   {
//     id: 2,
//     icon: <MdFamilyRestroom className="w-12 h-12 text-blue-600" />,
//     title: "Family Protection Plan",
//     features: [
//       "Covers up to 4 family members",
//       "Maternity & newborn care",
//       "No co-pay on primary visits",
//       "Worldwide emergency coverage",
//       "Lifetime renewal guarantee",
//     ],
//     highlight: true,
//   },
// ];

// export default function Pricing() {
//   return (
//     <section className="bg-white py-20" id="pricing">
//       <div className="container mx-auto px-6 lg:px-20">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-base text-blue-600 font-semibold mb-2">
//             Our Pricing Plan
//           </h2>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
//             Choose the best plan for you
//           </h1>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             Flexible options to suit your needs—whether you’re an individual or
//             a whole family.
//           </p>
//         </motion.div>

//         <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
//           {plans.map((plan, idx) => (
//             <motion.div
//               key={plan.id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: idx * 0.2 + 0.5, duration: 0.6 }}
//               className={`relative flex-1 bg-${
//                 plan.highlight ? "blue-50" : "gray-100"
//               } p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition`}
//             >
//               {/* Ribbon for Highlighted */}
//               {plan.highlight && (
//                 <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
//                   Popular
//                 </div>
//               )}

//               <div className="flex flex-col items-center text-center">
//                 <div className="p-4 bg-white rounded-full shadow-md -mt-12 mb-4">
//                   {plan.icon}
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//                   {plan.title}
//                 </h3>
//                 <ul className="space-y-4 mb-8 text-left">
//                   {plan.features.map((feat) => (
//                     <li key={feat} className="flex items-start gap-3">
//                       <FaCheck className="text-green-500 mt-1" />
//                       <span className="text-gray-700">{feat}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <a
//                   href="#contact"
//                   className={`inline-flex items-center gap-2 font-medium px-6 py-3 rounded-full transition ${
//                     plan.highlight
//                       ? "bg-blue-600 text-white hover:bg-blue-700"
//                       : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
//                   }`}
//                 >
//                   Choose Plan <FaArrowRight />
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Illustration for large screens */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.8 }}
//           className="hidden xl:flex justify-end mt-12"
//         >
//           <img
//             src={pricingPlanImage}
//             alt="Pricing plan illustration"
//             className="w-96 h-auto"
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }
// import React from "react";
// import pricingPlanImage from "../../assets/pricing-plan.png";
// import { MdHealthAndSafety, MdFamilyRestroom } from "react-icons/md";
// import { FaCheck, FaArrowRight } from "react-icons/fa";
// import { motion } from "framer-motion";

// const plans = [
//   {
//     id: 1,
//     icon: <MdHealthAndSafety className="w-12 h-12 text-blue-600" />,
//     title: "Basic Health Plan",
//     features: [
//       "Hospitalization up to $10,000",
//       "Free annual health check-ups",
//       "24/7 Telemedicine support",
//       "Affordable monthly premiums",
//       "Accident & Emergency coverage",
//     ],
//     highlight: false,
//   },
//   {
//     id: 2,
//     icon: <MdFamilyRestroom className="w-12 h-12 text-blue-600" />,
//     title: "Family Protection Plan",
//     features: [
//       "Covers up to 4 family members",
//       "Maternity & newborn care",
//       "No co-pay on primary visits",
//       "Worldwide emergency coverage",
//       "Lifetime renewal guarantee",
//     ],
//     highlight: true,
//   },
// ];

// export default function Pricing() {
//   return (
//     <section className="bg-white py-20" id="pricing">
//       <div className="container mx-auto px-6 lg:px-20">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-base text-blue-600 font-semibold mb-2">
//             Our Pricing Plan
//           </h2>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
//             Choose the best plan for you
//           </h1>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             Flexible options to suit your needs—whether you’re an individual or
//             a whole family.
//           </p>
//         </motion.div>

//         <div className="flex flex-col xl:flex-row xl:items-start xl:space-x-12">
//           {/* Plans */}
//           <div className="flex-1 flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
//             {plans.map((plan, idx) => (
//               <motion.div
//                 key={plan.id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: idx * 0.2 + 0.5, duration: 0.6 }}
//                 className={`relative flex-1 px-4 py-8 bg-${
//                   plan.highlight ? "blue-50" : "gray-100"
//                 } rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition`}
//               >
//                 {plan.highlight && (
//                   <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
//                     Popular
//                   </div>
//                 )}
//                 <div className="flex flex-col items-center text-center">
//                   <div className="p-4 bg-white rounded-full shadow-md -mt-12 mb-4">
//                     {plan.icon}
//                   </div>
//                   <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//                     {plan.title}
//                   </h3>
//                   <ul className="space-y-4 mb-8 text-left">
//                     {plan.features.map((feat) => (
//                       <li key={feat} className="flex items-start gap-3">
//                         <FaCheck className="text-green-500 mt-1" />
//                         <span className="text-gray-700">{feat}</span>
//                       </li>
//                     ))}
//                   </ul>
//                   <a
//                     href="#contact"
//                     className={`inline-flex items-center gap-2 font-medium px-6 py-3 rounded-full transition ${
//                       plan.highlight
//                         ? "bg-blue-600 text-white hover:bg-blue-700"
//                         : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
//                     }`}
//                   >
//                     Choose Plan <FaArrowRight />
//                   </a>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Illustration positioned next to plans on lg+, below on mobile */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.2, duration: 0.8 }}
//             className="mt-12 lg:mt-0 xl:flex-none xl:w-1/3 flex justify-center xl:justify-end"
//           >
//             <img
//               src={pricingPlanImage}
//               alt="Pricing plan illustration"
//               className="w-full max-w-md lg:max-w-lg h-auto"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import { MdHealthAndSafety, MdFamilyRestroom, MdElderly } from "react-icons/md";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

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
  return (
    <section className="bg-white py-20" id="pricing">
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
