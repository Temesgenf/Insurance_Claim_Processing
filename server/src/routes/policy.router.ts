import { Router } from "express";
import {
  createPolicy,
  getAllPolicies,
  getPolicyById, approvePolicy, rejectPolicy, deletePolicy,
  getPolicyByPolicyNumber,
} from "../controllers/policy.controller";

export const policyRouter = Router();

policyRouter.post("/", createPolicy);
policyRouter.get("/", getAllPolicies);
policyRouter.get("/:id", getPolicyById);
policyRouter.put("/:id/approve", approvePolicy);
policyRouter.put("/:id/reject", rejectPolicy);
policyRouter.delete("/:id", deletePolicy);
policyRouter.get("/policyNumber/:policyNumber", getPolicyByPolicyNumber);
