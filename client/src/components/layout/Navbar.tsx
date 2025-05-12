import insuranceMoney from "../../assets/insurance.svg";
import { navbarMenuItems } from "../../constants/index";
import type { NavbarMenuItem } from "../../types/navbar-menu-item";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    }),
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-20 top-0">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-20">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src={insuranceMoney}
            alt="ClaimPro Logo"
            className="w-8 h-8 group-hover:transform group-hover:scale-[1.1]"
          />
          <span className="text-2xl font-extrabold text-gray-800">
            ClaimPro
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-8">
          {navbarMenuItems.map((item: NavbarMenuItem, idx) => (
            <motion.li
              key={item.id}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={menuVariants}
              className="relative group"
            >
              <a
                href={item.link}
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                {item.title}
              </a>
              <motion.span
                layoutId="underline"
                className="absolute left-0 -bottom-1 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all"
              />
            </motion.li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/login?role=user")}
            className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            User Sign-In
          </button>
          <button
            onClick={() => navigate("/login?role=admin")}
            className="px-5 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition transform hover:-translate-y-1"
          >
            Admin Sign-In
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="focus:outline-none relative w-8 h-8"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="absolute block w-full h-0.5 bg-gray-800"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="absolute block w-full h-0.5 bg-gray-800 top-1/2 transform -translate-y-1/2"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="absolute block w-full h-0.5 bg-gray-800 bottom-0"
            />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ clipPath: "circle(0% at 90% 10%)" }}
              animate={{ clipPath: "circle(150% at 90% 10%)" }}
              exit={{ clipPath: "circle(0% at 90% 10%)" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="fixed inset-0 bg-white z-30 flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-extrabold text-gray-800">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="focus:outline-none"
                >
                  ✕
                </button>
              </div>
              <ul className="flex flex-col gap-6">
                {navbarMenuItems.map((item: NavbarMenuItem, idx) => (
                  <motion.li
                    key={item.id}
                    custom={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: idx * 0.1 + 0.2, type: "spring" },
                    }}
                    className="text-xl font-medium text-gray-700"
                    onClick={() => {
                      navigate(item.link);
                      setOpen(false);
                    }}
                  >
                    {item.title}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-4 pt-8">
                <button
                  onClick={() => {
                    navigate("/login?role=user");
                    setOpen(false);
                  }}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  User Sign-In
                </button>
                <button
                  onClick={() => {
                    navigate("/login?role=admin");
                    setOpen(false);
                  }}
                  className="w-full py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  Admin Sign-In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
