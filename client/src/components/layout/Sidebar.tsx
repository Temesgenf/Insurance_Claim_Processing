import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { getAllProducts } from "../../services/productService";
import type { Product } from "../../../../types/product.enum";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const filteredProducts = React.useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((p) =>
      p.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.productCode?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

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
    <aside className="h-screen w-64 bg-[#154654] text-white shadow-lg flex flex-col sticky top-0">
      <nav className="flex-1">
        <ul className="py-6 space-y-2">
          <li>
            <Link
              to="/user/dashboard"
              className={`flex items-center px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${location.pathname === "/user/dashboard" ? "bg-[#0a393f] text-blue-300" : "hover:bg-[#0a393f]"}`}
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li className="relative">
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
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="absolute left-6 right-2 mt-2 w-56 max-h-80 overflow-y-auto rounded-xl bg-[#1e3340]/95 shadow-2xl border border-blue-900/40 z-50 backdrop-blur-lg custom-scrollbar"
              >
                {/* Search bar */}
                <div className="sticky top-0 z-10 bg-[#1e3340]/95 p-2 border-b border-blue-900/40">
                  <div className="flex items-center gap-2">
                    <MagnifyingGlassIcon className="h-5 w-5 text-blue-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="flex-1 px-3 py-2 rounded-md border border-blue-900/40 focus:outline-none focus:ring-2 focus:ring-blue-300 text-blue-100 bg-[#22384a]/90 placeholder:text-blue-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
                {/* Product list */}
                <ul className="max-h-64 overflow-y-auto custom-scrollbar divide-y divide-blue-900/20">
                  {filteredProducts.length === 0 ? (
                    <li className="py-6 text-center text-blue-300 select-none">No products found.</li>
                  ) : (
                    filteredProducts.map((product) => (
                      <li key={product.productId}>
                        <Link
                          to={`/products/${product.productId}`}
                          className={`group flex items-center gap-4 px-5 py-3 transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-[#294056]/80 active:bg-[#22384a]/90 cursor-pointer ${location.pathname === `/products/${product.productId}` ? "bg-blue-900/80 text-white" : ""}`}
                          tabIndex={0}
                          role="menuitem"
                        >
                          {/* Avatar */}
                          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center text-blue-800 font-bold text-lg">
                            {product.productName?.charAt(0) || (
                              <svg className="h-5 w-5 text-indigo-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            )}
                          </div>
                          {/* Product info */}
                          <div className="flex-1 min-w-0">
                            <div className="truncate font-semibold text-white group-hover:text-white">{product.productName}</div>
                            <div className="truncate text-xs text-white/80 group-hover:text-white">{product.productCode}</div>
                          </div>
                          {/* Chevron */}
                          <svg className="h-4 w-4 text-blue-400 group-hover:text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </motion.div>
            )}
          </li>
          <li>
            <Link
              to="/user/policies"
              className={`flex items-center px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${location.pathname.startsWith("/user/policies") ? "bg-[#0a393f] text-blue-300" : "hover:bg-[#0a393f]"}`}
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Policies
            </Link>
          </li>
          <li>
            <Link
              to="/user/claims"
              className={`flex items-center px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${location.pathname.startsWith("/user/claims") ? "bg-[#0a393f] text-blue-300" : "hover:bg-[#0a393f]"}`}
            >
              <ClipboardDocumentListIcon className="h-5 w-5 mr-3" />
              Claims
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
