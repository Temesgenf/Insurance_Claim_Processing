import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../entities/Product";
import { CreateProductDto } from "../common/dtos/create-product.dto";
import ProductService from "../services/product.service";
import { User } from "../entities/User";
import { userService } from "../services/user.service";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// export const createProduct = async (req: Request, res: Response) => {
//   console.log("this is controller", req.body);
//   try {
//     console.log("req.body in controller", req.body);
//     const product = await ProductService.createProduct(req.body);
//     console.log("product in controller", product);
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create product" });
//   }
// };

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await ProductService.createProduct(req.body);
    console.log("product in controller", product);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
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
