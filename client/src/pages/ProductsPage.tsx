import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../services/productService";
import type { Product } from "../../../types/product.enum";
import { useTheme } from "../Context/ThemeContext";
import {
  FaShieldAlt,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaInfoCircle,
  FaChevronRight,
  FaTag,
} from "react-icons/fa";
import { formatCurrency } from "../utils/formatters";
import Breadcrumb from "../components/ui/Breadcrumb";
import Spinner from "../components/ui/Spinner";
import PageMeta from "../components/common/PageMeta";

const ProductsPage: React.FC = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"productName" | "basePremium">(
    "productName"
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Helper functions for theme-based styling
  const getBgColor = () => (theme === "dark" ? "bg-gray-900" : "bg-gray-50");
  const getCardBgColor = () => (theme === "dark" ? "bg-gray-800" : "bg-white");
  const getTextColor = () =>
    theme === "dark" ? "text-gray-100" : "text-gray-800";
  const getSubTextColor = () =>
    theme === "dark" ? "text-gray-300" : "text-gray-600";
  const getBorderColor = () =>
    theme === "dark" ? "border-gray-700" : "border-gray-200";
  // const getHeaderBgColor = () =>
  //   theme === "dark" ? "bg-gray-700" : "bg-gray-50";
  const getIconColor = () =>
    theme === "dark" ? "text-brand-400" : "text-brand-500";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter and sort products whenever dependencies change
    let result = [...products];

    // Apply category filter
    if (filterCategory !== "all") {
      result = result.filter((product) =>
        product.productCode.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "productName") {
        return sortOrder === "asc"
          ? a.productName.localeCompare(b.productName)
          : b.productName.localeCompare(a.productName);
      } else {
        return sortOrder === "asc"
          ? a.basePremium - b.basePremium
          : b.basePremium - a.basePremium;
      }
    });

    setFilteredProducts(result);
  }, [products, searchTerm, sortOrder, sortBy, filterCategory]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as "productName" | "basePremium");
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value);
  };

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
            <button
              onClick={() => window.location.reload()}
              className={`${
                theme === "dark" ? "text-brand-400" : "text-brand-500"
              } hover:${
                theme === "dark" ? "text-brand-300" : "text-brand-600"
              } font-medium`}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getBgColor()}`}>
      <PageMeta
        title="Insurance Products | Browse All Products"
        description="Browse our comprehensive range of insurance products designed to protect what matters most to you"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
          ]}
        />

        {/* Hero Section */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gradient-to-r from-brand-900 to-brand-700"
              : "bg-gradient-to-r from-brand-700 to-brand-500"
          } text-white rounded-xl shadow-lg mb-8 p-8`}
        >
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Insurance Products
            </h1>
            <p className="text-lg text-brand-100 mb-6">
              Discover our comprehensive range of insurance solutions designed
              to protect what matters most to you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-brand-700 bg-white hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200"
              >
                Talk to an Agent
              </Link>
              <a
                href="#products"
                className="inline-flex items-center px-6 py-3 border border-white rounded-md shadow-sm text-base font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200"
              >
                View Products
              </a>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div
          className={`${getCardBgColor()} rounded-lg shadow-md p-6 mb-8 border ${getBorderColor()}`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className={getSubTextColor()} />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2 border ${getBorderColor()} rounded-md leading-5 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-900"
                  } placeholder-gray-500 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm`}
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search products"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex items-center">
                <label
                  htmlFor="filter"
                  className={`mr-2 text-sm ${getSubTextColor()}`}
                >
                  <FaFilter className="inline mr-1" /> Filter:
                </label>
                <select
                  id="filter"
                  className={`block w-full pl-3 pr-10 py-2 text-base border ${getBorderColor()} rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-900"
                  } focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm`}
                  value={filterCategory}
                  onChange={handleFilterChange}
                  aria-label="Filter by category"
                >
                  <option value="all">All Categories</option>
                  <option value="auto">Auto Insurance</option>
                  <option value="home">Home Insurance</option>
                  <option value="life">Life Insurance</option>
                  <option value="health">Health Insurance</option>
                  <option value="business">Business Insurance</option>
                </select>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="sortBy"
                  className={`mr-2 text-sm ${getSubTextColor()}`}
                >
                  <FaSortAmountDown className="inline mr-1" /> Sort:
                </label>
                <select
                  id="sortBy"
                  className={`block w-full pl-3 pr-10 py-2 text-base border ${getBorderColor()} rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-900"
                  } focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm`}
                  value={sortBy}
                  onChange={handleSortByChange}
                  aria-label="Sort by"
                >
                  <option value="productName">Name</option>
                  <option value="basePremium">Price</option>
                </select>
                <button
                  onClick={toggleSortOrder}
                  className={`ml-2 p-2 rounded-md ${
                    theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors duration-200`}
                  aria-label={
                    sortOrder === "asc" ? "Sort ascending" : "Sort descending"
                  }
                >
                  {sortOrder === "asc" ? (
                    <FaSortAmountUp className={getIconColor()} />
                  ) : (
                    <FaSortAmountDown className={getIconColor()} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div id="products" className="mb-12">
          <h2 className={`text-2xl font-bold ${getTextColor()} mb-6`}>
            Available Insurance Products
            <span className={`ml-2 text-sm font-normal ${getSubTextColor()}`}>
              ({filteredProducts.length} products)
            </span>
          </h2>

          {filteredProducts.length === 0 ? (
            <div
              className={`${getCardBgColor()} rounded-lg shadow-md p-8 text-center border ${getBorderColor()}`}
            >
              <FaInfoCircle
                className={`w-12 h-12 mx-auto mb-4 ${getSubTextColor()}`}
              />
              <h3 className={`text-xl font-semibold ${getTextColor()} mb-2`}>
                No Products Found
              </h3>
              <p className={getSubTextColor()}>
                We couldn't find any products matching your search criteria.
                Please try different search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("all");
                  setSortBy("productName");
                  setSortOrder("asc");
                }}
                className={`mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  theme === "dark"
                    ? "bg-brand-600 hover:bg-brand-500"
                    : "bg-brand-500 hover:bg-brand-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500`}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.productId}
                  className={`${getCardBgColor()} rounded-lg shadow-md overflow-hidden border ${getBorderColor()} transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
                >
                  <div
                    className={`${
                      theme === "dark" ? "bg-brand-800" : "bg-brand-50"
                    } p-4 border-b ${getBorderColor()}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div
                          className={`rounded-full p-2 ${
                            theme === "dark" ? "bg-brand-700" : "bg-brand-100"
                          }`}
                        >
                          <FaShieldAlt className={`${getIconColor()}`} />
                        </div>
                        <h3
                          className={`ml-3 text-lg font-semibold ${getTextColor()}`}
                        >
                          {product.productName}
                        </h3>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          theme === "dark"
                            ? "bg-brand-900 text-brand-200"
                            : "bg-brand-100 text-brand-800"
                        }`}
                      >
                        <FaTag className="inline mr-1" />
                        {product.productCode}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className={`${getSubTextColor()} mb-4 line-clamp-3`}>
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className={`text-sm ${getSubTextColor()}`}>
                          Starting from
                        </p>
                        <p className={`text-xl font-bold ${getTextColor()}`}>
                          {formatCurrency(product.basePremium)}
                        </p>
                      </div>
                      <div className={`text-right ${getSubTextColor()}`}>
                        <p className="text-sm">Coverage up to</p>
                        <p className={`font-medium ${getTextColor()}`}>
                          {formatCurrency(product.sumInsured)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col space-y-2">
                      <Link
                        to={`/products/${product.productId}`}
                        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                          theme === "dark"
                            ? "bg-brand-600 hover:bg-brand-500"
                            : "bg-brand-500 hover:bg-brand-600"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500`}
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/products/${product.productId}/apply`}
                        className={`w-full inline-flex justify-center items-center px-4 py-2 border ${
                          theme === "dark"
                            ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        } rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500`}
                      >
                        Get a Quote <FaChevronRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-md p-8 text-center border ${getBorderColor()}`}
        >
          <h2 className={`text-2xl font-bold ${getTextColor()} mb-4`}>
            Need Help Choosing the Right Coverage?
          </h2>
          <p className={`${getSubTextColor()} max-w-2xl mx-auto mb-6`}>
            Our insurance experts are ready to help you find the perfect
            coverage for your specific needs. Get personalized advice and find
            the best insurance solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                theme === "dark"
                  ? "bg-brand-600 hover:bg-brand-500"
                  : "bg-brand-500 hover:bg-brand-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200`}
            >
              Contact an Agent
            </Link>
            <Link
              to="/about"
              className={`inline-flex items-center justify-center px-6 py-3 border ${
                theme === "dark"
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              } rounded-md shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all duration-200`}
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
