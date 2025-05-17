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
