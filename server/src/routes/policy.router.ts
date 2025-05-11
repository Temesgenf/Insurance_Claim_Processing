import { Router } from "express";
import { createPolicy, getAllPolicies, getPolicyById } from "../controllers/policy.controller";

export const policyRouter = Router();

policyRouter.post("/", createPolicy);
policyRouter.get("/", getAllPolicies);
policyRouter.get("/:id", getPolicyById);
