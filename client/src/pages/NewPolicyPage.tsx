import Sidebar from "../components/layout/Sidebar";
import Button from "../components/ui/Button";
import { useState, useEffect } from "react";
import { createPolicy } from "../services/policyService";
import { getAllProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../types/product.enum";
import type { Policy } from "./PoliciesPage";

const NewPolicyPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productId: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch {
        setProducts([]);
      }
    }
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createPolicy({ productId: form.productId } as Policy);
      navigate("/user/policies");
    } catch (err: any) {
      setError(err?.message || "Failed to create policy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-claim">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen p-10">
        <h1 className="font-bold text-[1.5rem]">Create New Policy</h1>
        <form className="mt-8 max-w-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Product</label>
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.productId} value={product.productId}>
                  {product.productName}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <Button
            text={loading ? "Creating..." : "Create Policy"}
            type="submit"
            disabled={loading}
          />
        </form>
      </div>
    </main>
  );
};

export default NewPolicyPage;
