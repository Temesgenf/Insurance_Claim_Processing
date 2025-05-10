import { Router } from "express";
import { createPolicy } from "../controllers/policy.controller";
import { getAllProducts } from "../controllers/product.controller";

export const policyRouter = Router();

policyRouter.post("/", createPolicy);
policyRouter.get("/", getAllProducts);
