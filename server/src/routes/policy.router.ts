import { Router } from "express";
import {
  createPolicy,
  getAllPolicies,
  getPolicyById,
  getPolicyByPolicyNumber,
} from "../controllers/policy.controller";

export const policyRouter = Router();

policyRouter.post("/", createPolicy);
policyRouter.get("/", getAllPolicies);
policyRouter.get("/:id", getPolicyById);
policyRouter.get("/policyNumber/:policyNumber", getPolicyByPolicyNumber);
