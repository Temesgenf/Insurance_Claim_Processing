import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const getAllProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/products`);
  return response;
};

export const getProductByName = async (productName: string | undefined) => {
  if (!productName) throw new Error("Product name is required");
  const response = await axios.get(
    `${API_BASE_URL}/api/products/name/${productName}`
  );
  return response;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
  return response;
};

export const createProduct = async (productData: any) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/products`,
    productData
  );
  return response;
};
