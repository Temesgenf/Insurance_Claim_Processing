// import React from "react";
// import { IoShieldCheckmark } from "react-icons/io5";
// import { FaClock } from "react-icons/fa";
// import { IoDocuments } from "react-icons/io5";
// import { FaBriefcaseMedical } from "react-icons/fa";

// const About = () => {
//   return (
//     <section className="relative overflow-hidden">
//       <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="lg:text-center">
//             <h2 className="font-heading mb-6 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-full md:w-72 md:mx-auto text-sm font-semibold tracking-widest uppercase transform hover:scale-105 transition-transform duration-300">
//               Why Choose Us?
//             </h2>
//             <p className="font-heading mt-4 text-4xl leading-tight font-bold text-gray-900 sm:text-5xl bg-clip-text bg-gradient-to-r from-blue-800 to-teal-600">
//               Your Health, Our Priority
//             </p>
//             <p className="mt-6 max-w-3xl text-xl text-gray-600 lg:mx-auto">
//               Experience healthcare coverage that truly cares. We combine
//               compassionate service with cutting-edge solutions to protect your
//               well-being.
//             </p>
//           </div>

//           <div className="mt-16">
//             <dl className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
//               <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
//                 <div className="absolute -top-6 left-6 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
//                   <IoShieldCheckmark className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="mt-8 text-2xl font-bold text-gray-800">
//                   360° Coverage
//                 </h3>
//                 <p className="mt-4 text-gray-600 leading-relaxed">
//                   Full-spectrum protection including preventive care,
//                   emergencies, chronic conditions, and alternative therapies.
//                 </p>
//               </div>

//               <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
//                 <div className="absolute -top-6 left-6 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
//                   <FaClock className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="mt-8 text-2xl font-bold text-gray-800">
//                   Instant Support
//                 </h3>
//                 <p className="mt-4 text-gray-600 leading-relaxed">
//                   24/7 virtual consultations with doctors, instant claim
//                   approvals, and emergency response within minutes.
//                 </p>
//               </div>

//               <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
//                 <div className="absolute -top-6 left-6 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
//                   <IoDocuments className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="mt-8 text-2xl font-bold text-gray-800">
//                   Smart Claims
//                 </h3>
//                 <p className="mt-4 text-gray-600 leading-relaxed">
//                   AI-powered claims processing with 98% approval rate in under 4
//                   hours. Track real-time via our wellness app.
//                 </p>
//               </div>

//               <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
//                 <div className="absolute -top-6 left-6 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-white transform group-hover:-translate-y-2 transition-transform duration-300">
//                   <FaBriefcaseMedical className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="mt-8 text-2xl font-bold text-gray-800">
//                   Elite Network
//                 </h3>
//                 <p className="mt-4 text-gray-600 leading-relaxed">
//                   Access to 50,000+ premium healthcare providers across 150+
//                   specialties worldwide.
//                 </p>
//               </div>
//             </dl>
//           </div>

//           <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//             <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-20 mix-blend-multiply"></div>
//             <div className="absolute -bottom-40 -left-20 w-72 h-72 bg-teal-100 rounded-full opacity-20 mix-blend-multiply"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;
// import { useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import aboutImage from "../../assets/about.png"; // replace with your asset
// import { FaBolt, FaUsers, FaShieldAlt } from "react-icons/fa";

// export default function About() {
//   const controls = useAnimation();

//   useEffect(() => {
//     controls.start("visible");
//   }, [controls]);

//   const section = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { staggerChildren: 0.2, when: "beforeChildren" },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 120, damping: 12 },
//     },
//   };

//   return (
//     <section className="relative bg-gradient-to-br from-blue-50 to-white py-24 overflow-hidden">
//       {/* Decorative background shape */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-20 animate-spin-slow"></div>
//       <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>

//       <motion.div
//         className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
//         variants={section}
//         initial="hidden"
//         animate={controls}
//       >
//         {/* Text & Features */}
//         <div className="space-y-6">
//           <motion.h2
//             variants={item}
//             className="text-4xl md:text-5xl font-extrabold text-gray-800"
//           >
//             About <span className="text-blue-600">ClaimPro</span>
//           </motion.h2>
//           <motion.p
//             variants={item}
//             className="text-lg text-gray-600 leading-relaxed"
//           >
//             ClaimPro is an innovative AI-driven claims management platform that
//             streamlines insurance claims for both clients and administrators.
//             Our focus is on speed, transparency, and user satisfaction.
//           </motion.p>

//           {/* Feature Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {[
//               {
//                 icon: <FaBolt className="text-white text-2xl" />,
//                 title: "Instant Processing",
//                 desc: "Auto-analyze and approve claims within minutes.",
//               },
//               {
//                 icon: <FaShieldAlt className="text-white text-2xl" />,
//                 title: "Secure & Reliable",
//                 desc: "Bank-grade security for your sensitive data.",
//               },
//               {
//                 icon: <FaUsers className="text-white text-2xl" />,
//                 title: "24/7 Support",
//                 desc: "Dedicated support team ready to help anytime.",
//               },
//             ].map((feat, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={item}
//                 className="flex space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition"
//               >
//                 <div className="flex-shrink-0 bg-blue-600 rounded-md p-4">
//                   {feat.icon}
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     {feat.title}
//                   </h4>
//                   <p className="text-gray-500 mt-1">{feat.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Image Showcase */}
//         <motion.div
//           variants={item}
//           className="relative flex justify-center md:justify-end"
//         >
//           <div className="relative">
//             <img
//               src={aboutImage}
//               alt="About us"
//               className="w-full max-w-lg rounded-3xl shadow-2xl"
//             />
//             {/* Overlay pattern */}
//             <div className="absolute -top-10 -right-10 w-24 h-24 border-4 border-blue-600 rounded-full opacity-30 animate-ping"></div>
//             <div className="absolute bottom-0 left-0 w-32 h-32 border-4 border-blue-400 rounded-full opacity-20 animate-pulse"></div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }
// import { useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import aboutImage from "../../assets/c.png"; // replace with your asset
// import { FaBolt, FaUsers, FaShieldAlt } from "react-icons/fa";

// export default function About() {
//   const controls = useAnimation();

//   useEffect(() => {
//     controls.start("visible");
//   }, [controls]);

//   const section = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { staggerChildren: 0.2, when: "beforeChildren" },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 120, damping: 12 },
//     },
//   };

//   return (
//     <section className="relative bg-white py-24 overflow-hidden">
//       <motion.div
//         className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
//         variants={section}
//         initial="hidden"
//         animate={controls}
//       >
//         {/* Text & Features */}
//         <div className="space-y-6">
//           <motion.h2
//             variants={item}
//             className="text-4xl md:text-5xl font-extrabold text-gray-800"
//           >
//             About <span className="text-blue-600">ClaimPro</span>
//           </motion.h2>
//           <motion.p
//             variants={item}
//             className="text-lg text-gray-600 leading-relaxed"
//           >
//             ClaimPro is an innovative AI-driven claims management platform that
//             streamlines insurance claims for both clients and administrators.
//             Our focus is on speed, transparency, and user satisfaction.
//           </motion.p>

//           {/* Feature Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {[
//               {
//                 icon: <FaBolt className="text-white text-2xl" />,
//                 title: "Instant Processing",
//                 desc: "Auto-analyze and approve claims within minutes.",
//               },
//               {
//                 icon: <FaShieldAlt className="text-white text-2xl" />,
//                 title: "Secure & Reliable",
//                 desc: "Bank-grade security for your sensitive data.",
//               },
//               {
//                 icon: <FaUsers className="text-white text-2xl" />,
//                 title: "24/7 Support",
//                 desc: "Dedicated support team ready to help anytime.",
//               },
//             ].map((feat, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={item}
//                 className="flex space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition"
//               >
//                 <div className="flex-shrink-0 bg-blue-600 rounded-md p-4">
//                   {feat.icon}
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-semibold text-gray-800">
//                     {feat.title}
//                   </h4>
//                   <p className="text-gray-500 mt-1">{feat.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Image Showcase */}
//         <motion.div
//           variants={item}
//           className="relative flex justify-center md:justify-end"
//         >
//           <div className="relative">
//             <img
//               src={aboutImage}
//               alt="About us"
//               className="w-full max-w-lg rounded-3xl shadow-2xl"
//             />
//             {/* Overlay pattern */}
//             <div className="absolute -top-10 -right-10 w-24 h-24 border-4 border-blue-600 rounded-full opacity-30 animate-ping"></div>
//             <div className="absolute bottom-0 left-0 w-32 h-32 border-4 border-blue-400 rounded-full opacity-20 animate-pulse"></div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import aboutImage from "../../assets/companypeople.jpg";
import { FaBolt, FaUsers, FaShieldAlt } from "react-icons/fa";

export default function About() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const section = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
        duration: 0.6,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        duration: 0.4,
      },
    },
  };

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <motion.div
        className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        variants={section}
        initial="hidden"
        animate={controls}
      >
        {/* Text & Features */}
        <div className="space-y-8">
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Revolutionizing Claims with ClaimPro
          </motion.h2>

          <motion.p
            variants={item}
            className="text-lg text-gray-600 leading-relaxed max-w-2xl"
          >
            Harnessing AI to deliver lightning-fast, transparent insurance
            solutions that put people first.
          </motion.p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-5">
            {[
              {
                icon: <FaBolt className="text-white text-xl" />,
                title: "Instant Processing",
                desc: "AI-powered approvals in under 5 minutes",
                color: "from-yellow-400 to-orange-400",
              },
              {
                icon: <FaShieldAlt className="text-white text-xl" />,
                title: "Military Security",
                desc: "256-bit encryption & GDPR compliance",
                color: "from-green-400 to-blue-500",
              },
              {
                icon: <FaUsers className="text-white text-xl" />,
                title: "24/7 Support",
                desc: "Real human assistance anytime",
                color: "from-purple-400 to-pink-500",
              },
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className={`group relative p-5 bg-white rounded-xl shadow-md hover:shadow-lg backdrop-blur-sm border border-gray-100/50 transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 bg-gradient-to-br ${feat.color} rounded-lg p-3 transform group-hover:rotate-12 transition`}
                  >
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {feat.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">{feat.desc}</p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/20 pointer-events-none transition" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Showcase */}
        <motion.div
          variants={item}
          className="relative flex justify-center md:justify-end"
        >
          <div className="relative max-w-lg">
            <motion.img
              src={aboutImage}
              alt="About us"
              className="w-full rounded-[2rem] shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300"
              whileHover={{ scale: 1.02 }}
            />

            {/* Animated Decorations */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border-4 border-blue-300/30 rounded-full animate-ping" />
            <div className="absolute bottom-8 -left-8 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl -z-10" />

            <motion.div
              className="absolute -bottom-6 -left-6 bg-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-2xl font-bold text-blue-600">99.8%</div>
              <div className="text-sm text-gray-600">
                Accuracy
                <br />
                Rate
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
