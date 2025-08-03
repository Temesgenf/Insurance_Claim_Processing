import { Router } from "express";
import {
  createPolicy,
  getAllPolicies,
  getPolicyById, approvePolicy, rejectPolicy, deletePolicy,
  getPolicyByPolicyNumber,
  getUserPolicy,
} from "../controllers/policy.controller";
import { verifyToken } from "../middleware/auth.middleware";

export const policyRouter = Router();

policyRouter.post("/",verifyToken, createPolicy);
policyRouter.get("/userpolicy", verifyToken , getUserPolicy);

// policyRouter.get("/", getAllPolicies);
policyRouter.get("/:id", getPolicyById);
policyRouter.put("/:id/approve", approvePolicy);
policyRouter.put("/:id/reject", rejectPolicy);
policyRouter.delete("/:id", deletePolicy);
policyRouter.get("/policyNumber/:policyNumber", getPolicyByPolicyNumber);

