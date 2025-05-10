import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import type { Product } from "../../../types/product.enum";
import ProductTabs from "../components/layout/ProductTabs";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(parseInt(productId!));
        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product details.");
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-50">
        {product && <ProductTabs product={product} />}
      </main>
    </div>
  );
};

export default ProductDetail;
