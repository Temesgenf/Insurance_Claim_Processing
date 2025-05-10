import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.controller";

export const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
// productRouter.get("/:id", getProducctById);
productRouter.delete("/:id", deleteProduct);
