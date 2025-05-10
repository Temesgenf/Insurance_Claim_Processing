import { Request, Response } from "express";
import ProductService from "../services/product.service";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await ProductService.createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const product = await ProductService.getProductById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await ProductService.deleteProduct(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
