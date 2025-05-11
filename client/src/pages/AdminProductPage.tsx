import React, { useState } from "react";
import AdminSidebar from "../components/layout/AdminSidebar";
import { createProduct } from "../services/productService";

type Product = {
  id: number;
  productCode: string;
  productName: string;
  sumInsured: string;
  basePremium: string;
  premiumRate: string;
  description: string;
  keyBenefits: string[];
};


import { useEffect } from "react";
import { getAllProducts } from "../services/productService";
const AdminProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    productCode: "",
    productName: "",
    sumInsured: "",
    basePremium: "",
    premiumRate: "Annual",
    description: "",
    keyBenefits: "",
    coverages: ""
  });

  // Fetch products helper
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productCode || !form.productName || !form.sumInsured || !form.basePremium || !form.premiumRate || !form.description) return;
    setLoading(true);
    setSuccess(false);
    try {
      const productToSend = {
        ...form,
        keyBenefits: form.keyBenefits
          .split(",")
          .map((b) => b.trim())
          .filter((b) => b.length > 0),
        coverages: form.coverages
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c.length > 0),
      };
      
      // After successful creation, re-fetch all products from backend
      await createProduct(productToSend);
      await fetchProducts();
      setForm({
        productCode: "",
        productName: "",
        sumInsured: "",
        basePremium: "",
        premiumRate: "Annual",
        description: "",
        keyBenefits: "",
        coverages: ""
      });
      setSuccess(true);
      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
      }, 1200);
    } catch (error) {
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 ml-64">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Product Management</h1>
        {/* Toggle between Product Table and Create Form */}
        {!showForm ? (
          <>
            <div className="flex flex-col items-start mb-6 gap-3">
              <button
                className="flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-5 py-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setShowForm(true)}
              >
                <span className="text-xl font-bold">+</span>
                Create New Product
              </button>
              <h2 className="text-xl font-semibold text-gray-700 mt-2">Currently Available Products</h2>
            </div>
            {/* Product Table */}
            <div className="overflow-x-auto mb-10">
              <table className="min-w-full bg-white rounded-lg border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 tracking-wider uppercase border-b border-gray-200">Product Code</th>
                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 tracking-wider uppercase border-b border-gray-200">Product Name</th>
                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 tracking-wider uppercase border-b border-gray-200">Sum Insured</th>
                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 tracking-wider uppercase border-b border-gray-200">Base Premium</th>
                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 tracking-wider uppercase border-b border-gray-200">Premium Rate</th>
                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 tracking-wider uppercase border-b border-gray-200">Description</th>
                    <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 tracking-wider uppercase border-b border-gray-200">Key Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-4 px-6 text-gray-500 text-center">No products available.</td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-6 text-blue-600 font-medium cursor-pointer hover:underline">{product.productCode}</td>
                        <td className="py-3 px-6">{product.productName}</td>
                        <td className="py-3 px-6">{product.sumInsured}</td>
                        <td className="py-3 px-6">{product.basePremium}</td>
                        <td className="py-3 px-6">{product.premiumRate}</td>
                        <td className="py-3 px-6 max-w-xs truncate" title={product.description}>{product.description}</td>
                        <td className="py-3 px-6">
                          {product.keyBenefits.length > 0
                            ? product.keyBenefits.map((benefit: string, idx: number) => (
                                <span key={idx} className="inline-block bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-medium mr-1 mb-1">
                                  {benefit}
                                </span>
                              ))
                            : "-"}
                        </td>
                        
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <section className="max-w-xl bg-white p-8 rounded-xl shadow space-y-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Create New Product</h2>
            </div>
            {success && (
              <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center font-semibold">
                Product added successfully!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Product Code</label>
                <input
                  type="text"
                  name="productCode"
                  value={form.productCode}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Sum Insured</label>
                <input
                  type="number"
                  name="sumInsured"
                  value={form.sumInsured}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Base Premium</label>
                <input
                  type="number"
                  name="basePremium"
                  value={form.basePremium}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Premium Rate</label>
                <select
                  name="premiumRate"
                  value={form.premiumRate}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="Annual">Annual</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annual">Semi-Annual</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                  rows={3}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Key Benefits (comma-separated)</label>
                <textarea
                  name="keyBenefits"
                  value={form.keyBenefits}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  rows={2}
                  placeholder="e.g. Fast claims, 24/7 support, Cashless treatment"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Coverages (comma-separated)</label>
                <textarea
                  name="coverages"
                  value={form.coverages}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  rows={2}
                  placeholder="e.g. Hospitalization, Outpatient, Maternity"
                />
              </div>
              <button
                type="submit"
                className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mt-4 flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  'Add Product'
                )}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminProductPage;
