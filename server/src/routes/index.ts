import { Express } from "express";
import { userRouter } from "./user.routes";
import { productRouter } from "./product.routes";

export function registerRoutes(app: Express) {
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);
}
