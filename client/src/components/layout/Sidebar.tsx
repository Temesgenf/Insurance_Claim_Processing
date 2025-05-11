import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { getAllProducts } from "../../services/productService";
import type { Product } from "../../../../types/product.enum";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <aside className="h-screen w-64 bg-[#154654] text-white shadow-lg flex flex-col">
      <nav className="flex-1">
        <ul className="py-6 space-y-2">
          <li>
            <a
              href="/user/dashboard"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#0a393f] transition-colors duration-200 font-medium"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </a>
          </li>
          <li>
            <button
              className="flex items-center w-full px-6 py-3 rounded-lg hover:bg-[#0a393f] transition-colors duration-200 font-medium focus:outline-none"
              onClick={() => setProductsOpen((open) => !open)}
              aria-expanded={productsOpen}
            >
              <BuildingStorefrontIcon className="h-5 w-5 mr-3" />
              Products
              <svg
                className={`ml-auto w-5 h-5 transform transition-transform duration-200 ${
                  productsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {productsOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className=" z-50 w-full bg-[#1a798c] text-white backdrop-blur-xl border border-gray-200/50 shadow-2xl overflow-hidden mt-1.5"
              >
                {products?.map((product) => (
                  <motion.li
                    key={product.productId}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="border-b border-white/20 last:border-b-0"
                  >
                    <Link
                      to={`/products/${product.productId}`}
                      className="flex items-center px-5 py-4 group transition-all duration-300 hover:bg-gradient-to-r from-white to-blue-50/30"
                    >
                      {/* Elegant Initial Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-[#154654] from-blue-500/10 to-indigo-500/10 flex items-center justify-center overflow-hidden">
                          {product.productName?.charAt(0) ? (
                            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                              {product.productName.charAt(0)}
                            </span>
                          ) : (
                            <svg
                              className="h-5 w-5 text-indigo-400/80"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="absolute -inset-1 rounded-lg bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Luxurious Text Styling */}
                      <div className="ml-4 flex-1 min-w-0">
                        <p className="text-base font-medium text-gray-200 group-hover:text-blue-600 transition-colors duration-300 truncate">
                          {product.productName}
                        </p>
                        <p className="text-sm text-gray-200 group-hover:text-blue-500 transition-colors duration-300 truncate">
                          {product.productCode}
                        </p>
                      </div>

                      {/* Animated Chevron */}
                      <motion.div
                        className="ml-2"
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <svg
                          className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </li>
          <li>
            <a
              href="/user/policies"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#0a393f] transition-colors duration-200 font-medium"
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Policies
            </a>
          </li>
          <li>
            <a
              href="/user/claims"
              className="flex items-center px-6 py-3 rounded-lg hover:bg-[#0a393f] transition-colors duration-200 font-medium"
            >
              <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
              Claims
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
