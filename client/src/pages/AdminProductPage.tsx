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
    keyBenefits: [""],
    coverages: [""],
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

  // Dynamic multi-input handlers for keyBenefits and coverages
  const handleMultiInputChange = (type: 'keyBenefits' | 'coverages', idx: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].map((item: string, i: number) => (i === idx ? value : item)),
    }));
  };

  const handleAddField = (type: 'keyBenefits' | 'coverages') => {
    setForm((prev) => ({
      ...prev,
      [type]: [...prev[type], ""]
    }));
  };

  const handleRemoveField = (type: 'keyBenefits' | 'coverages', idx: number) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].filter((_: string, i: number) => i !== idx)
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productCode || !form.productName || !form.sumInsured || !form.basePremium || !form.premiumRate || !form.description) return;
    setLoading(true);
    setSuccess(false);
    try {
      const productToSend = {
        ...form,
        keyBenefits: form.keyBenefits.map((b: string) => b.trim()).filter((b: string) => b.length > 0),
        coverages: form.coverages.map((c: string) => c.trim()).filter((c: string) => c.length > 0),
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
        keyBenefits: [""],
        coverages: [""],
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
          <section className="max-w-xl mx-auto bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8 rounded-2xl shadow-2xl border border-blue-100 mb-8 animate-fade-in">
  <div className="flex items-center gap-2 mb-6">
    <span className="bg-blue-600 text-white rounded-full p-2 shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
    </span>
    <h2 className="text-2xl font-bold text-blue-800 tracking-tight">Create New Product</h2>
  </div>
  {success && (
    <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center font-semibold animate-bounce-in">
      Product added successfully!
    </div>
  )}
  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label className="block font-semibold mb-1 text-blue-900 flex items-center gap-1">
        <span>Product Code</span>
        <span className="text-blue-400" title="Unique identifier for the product">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0m8 0a4 4 0 10-8 0m8 0V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0a4 4 0 01-8 0" /></svg>
        </span>
      </label>
      <input
        type="text"
        name="productCode"
        value={form.productCode}
        onChange={handleChange}
        className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 placeholder:text-blue-300 transition-shadow"
        required
        placeholder="e.g. HLTH1234"
      />
      <span className="text-xs text-gray-400 ml-1">Unique code for this product.</span>
    </div>
    <div>
      <label className="block font-semibold mb-1 text-blue-900 flex items-center gap-1">
        <span>Product Name</span>
        <span className="text-blue-400" title="Enter a descriptive name">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m9-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </span>
      </label>
      <input
        type="text"
        name="productName"
        value={form.productName}
        onChange={handleChange}
        className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 placeholder:text-blue-300 transition-shadow"
        required
        placeholder="e.g. Health Plus Plan"
      />
      <span className="text-xs text-gray-400 ml-1">Name as seen by customers.</span>
    </div>
    <div>
      <label className="block font-semibold mb-1 text-blue-900 flex items-center gap-1">
        <span>Sum Insured</span>
        <span className="text-blue-400" title="Maximum coverage amount">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.866 0-7 1.343-7 3v2c0 1.657 3.134 3 7 3s7-1.343 7-3v-2c0-1.657-3.134-3-7-3z" /></svg>
        </span>
      </label>
      <input
        type="number"
        name="sumInsured"
        value={form.sumInsured}
        onChange={handleChange}
        className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 placeholder:text-blue-300 transition-shadow"
        required
        min="0"
        placeholder="e.g. 100000"
      />
      <span className="text-xs text-gray-400 ml-1">Maximum amount covered by this product.</span>
    </div>
    <div>
      <label className="block font-semibold mb-1 text-blue-900 flex items-center gap-1">
        <span>Base Premium</span>
        <span className="text-blue-400" title="Base cost for this product">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.866 0-7 1.343-7 3v2c0 1.657 3.134 3 7 3s7-1.343 7-3v-2c0-1.657-3.134-3-7-3z" /></svg>
        </span>
      </label>
      <input
        type="number"
        name="basePremium"
        value={form.basePremium}
        onChange={handleChange}
        className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 placeholder:text-blue-300 transition-shadow"
        required
        min="0"
        placeholder="e.g. 1200"
      />
      <span className="text-xs text-gray-400 ml-1">Base premium for this policy.</span>
    </div>
    <div>
      <label className="block font-semibold mb-1 text-blue-900 flex items-center gap-1">
        <span>Premium Rate</span>
        <span className="text-blue-400" title="Select payment frequency">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m0-5a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </span>
      </label>
      <select
        name="premiumRate"
        value={form.premiumRate}
        onChange={handleChange}
        className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-shadow"
        required
      >
        <option value="Annual">Annual</option>
        <option value="Monthly">Monthly</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Semi-Annual">Semi-Annual</option>
      </select>
      <span className="text-xs text-gray-400 ml-1">How often is the premium paid?</span>
    </div>
    <div>
      <label className="block font-semibold mb-1 text-blue-900 flex items-center gap-1">
        <span>Description</span>
        <span className="text-blue-400" title="Short summary of the product">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /></svg>
        </span>
      </label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 placeholder:text-blue-300 transition-shadow"
        required
        rows={3}
        placeholder="e.g. Comprehensive health insurance for families."
      />
      <span className="text-xs text-gray-400 ml-1">Briefly describe this product.</span>
    </div>
    <div>
      <label className="block font-semibold mb-1 text-blue-900 flex items-center gap-1">
        <span>Key Benefits</span>
        <span className="text-blue-400" title="Add multiple benefits">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </span>
      </label>
      {form.keyBenefits.map((benefit: string, idx: number) => (
        <div className="flex items-center gap-2 mb-2" key={idx}>
          <input
            type="text"
            value={benefit}
            onChange={e => handleMultiInputChange('keyBenefits', idx, e.target.value)}
            className="flex-1 border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 placeholder:text-blue-300 transition-shadow"
            placeholder={idx === 0 ? "e.g. Fast claims" : "Add another benefit"}
          />
          {form.keyBenefits.length > 1 && (
            <button type="button" onClick={() => handleRemoveField('keyBenefits', idx)} className="text-red-500 hover:text-red-700 p-1" title="Remove">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
          {idx === form.keyBenefits.length - 1 && (
            <button type="button" onClick={() => handleAddField('keyBenefits')} className="text-blue-500 hover:text-blue-700 p-1" title="Add">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          )}
        </div>
      ))}
      <span className="text-xs text-gray-400 ml-1">Add as many benefits as you like.</span>
    </div>
    <div>
      <label className="block font-semibold mb-1 text-blue-900 flex items-center gap-1">
        <span>Coverages</span>
        <span className="text-blue-400" title="Add multiple coverages">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </span>
      </label>
      {form.coverages.map((coverage: string, idx: number) => (
        <div className="flex items-center gap-2 mb-2" key={idx}>
          <input
            type="text"
            value={coverage}
            onChange={e => handleMultiInputChange('coverages', idx, e.target.value)}
            className="flex-1 border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 placeholder:text-blue-300 transition-shadow"
            placeholder={idx === 0 ? "e.g. Hospitalization" : "Add another coverage"}
          />
          {form.coverages.length > 1 && (
            <button type="button" onClick={() => handleRemoveField('coverages', idx)} className="text-red-500 hover:text-red-700 p-1" title="Remove">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
          {idx === form.coverages.length - 1 && (
            <button type="button" onClick={() => handleAddField('coverages')} className="text-blue-500 hover:text-blue-700 p-1" title="Add">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          )}
        </div>
      ))}
      <span className="text-xs text-gray-400 ml-1">Add as many coverages as you like.</span>
    </div>
    <div className="flex gap-4 pt-2">
      <button
        type="submit"
        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-all flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
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
          <><svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add Product
          </>)
        }
      </button>
      <button
        type="button"
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg shadow transition-all"
        onClick={() => setShowForm(false)}
        disabled={loading}
      >
        Cancel
      </button>
    </div>
  </form>
</section>
        )}
      </main>
    </div>
  );
};

export default AdminProductPage;
