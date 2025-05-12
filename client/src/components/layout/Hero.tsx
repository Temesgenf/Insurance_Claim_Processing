import { useEffect } from "react";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import happyFamilyImage from "../../assets/c.png";
import { AiFillLike } from "react-icons/ai";
import { motion, useAnimation } from "framer-motion";

export default function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [0.8, 1.05, 1],
      opacity: [0, 1],
      transition: { duration: 1.2, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <section className="relative overflow-hidden bg-white mt-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen py-16">
        {/* Left Text Column */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center md:text-left"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full shadow-sm"
          >
            <span className="bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
              New Feature
            </span>
            <span className="ml-3 text-sm font-medium text-gray-800">
              Instant Claim Processing 🚀
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 ">
            <span className="text-blue-600">Smart Insurance</span> Claims Made
            Simple
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl">
            Revolutionize your claims experience with AI-powered solutions that
            save time and reduce paperwork.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 ">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Free Trial
              <IoChevronForwardCircleOutline className="ml-3 text-2xl animate-pulse" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center bg-white text-gray-900 font-semibold px-8 py-4 rounded-full shadow-md border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
            >
              Watch Demo
              <IoChevronForwardCircleOutline className="ml-3 text-2xl text-blue-600" />
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center md:justify-start gap-6 "
          >
            <div className="flex -space-x-4">
              {[...Array(4)].map((_, i) => (
                <motion.img
                  key={i}
                  whileHover={{ y: -5 }}
                  className="w-12 h-12 rounded-full ring-2 ring-white shadow-md hover:shadow-lg transition-all duration-300"
                  src={`https://i.pravatar.cc/48?img=${i + 1}`}
                  alt="avatar"
                />
              ))}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full ring-2 ring-white bg-yellow-400 flex items-center justify-center font-bold text-gray-800 shadow-md hover:shadow-lg"
              >
                +24
              </motion.div>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">
                Trusted by 500+ Agents
              </p>
              <div className="flex items-center mt-1">
                <AiFillLike className="text-blue-600 mr-1" />
                <span className="text-sm text-gray-600">4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image Column */}
        <div className="relative flex justify-center items-center">
          <motion.div
            className="relative"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={happyFamilyImage}
              alt="Happy Family"
              className="w-full max-w-2xl mx-auto transform scale-105"
            />

            {/* Floating Elements */}
            <motion.div
              className="absolute top-0 -right-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100"
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Faster Processing</div>
              </div>
            </motion.div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 flex justify-center items-center -z-10">
              <div className="absolute w-[700px] h-[700px] rounded-full bg-gray-100/40 animate-pulse"></div>
              <div className="absolute w-[500px] h-[500px] rounded-full bg-gray-100/30"></div>
            </div>
          </motion.div>

          {/* Testimonial Card */}
          <motion.div
            initial={{ scale: 0 }}
            animate={controls}
            className="absolute -bottom-8 left-0 bg-white rounded-2xl shadow-xl flex items-center space-x-4 px-6 py-4 max-w-sm border-l-4 border-blue-600"
          >
            <img
              className="w-14 h-14 rounded-full border-2 border-blue-200"
              src="https://i.pravatar.cc/48?img=12"
              alt="Doney"
            />
            <div>
              <h3 className="font-bold text-gray-900">Sarah Johnson</h3>
              <p className="text-sm text-gray-600">
                Claim approved in 2 hours! ⚡
              </p>
            </div>
            <AiFillLike className="text-3xl text-blue-600 animate-bounce" />
          </motion.div>
        </div>
      </div>

      {/* Subtle Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: 12,
            height: 12,
            background: `rgba(59, 130, 246, 0.1)`,
            borderRadius: "50%",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </section>
  );
}
