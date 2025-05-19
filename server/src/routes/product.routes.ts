import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller";
import { verifyToken } from "../middleware/auth.middleware";

export const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", verifyToken, getAllProducts);
productRouter.get("/:id", verifyToken, getProductById);
productRouter.delete("/:id", deleteProduct);
