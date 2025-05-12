import { Express } from "express";
import userRouter from "./user.routes";
import { productRouter } from "./product.routes";
import { policyRouter } from "./policy.router";
import claimRouter from "./claim.routes";
import authRouter from "./auth.routes";

export function registerRoutes(app: Express) {
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);
  app.use("/api/policies", policyRouter);
  app.use("/api/claims", claimRouter);
  app.use("/api/auth", authRouter);
}
