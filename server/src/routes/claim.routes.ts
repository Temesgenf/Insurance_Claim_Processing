import { Router } from "express";
import {
  createClaim,
  getAllClaims,
  getClaimById,
} from "../controllers/claim.controller";

const claimRouter = Router();
claimRouter.post("/", createClaim);

claimRouter.get("/", getAllClaims);

claimRouter.get("/:id", getClaimById);

// claimRouter.put("/:id", updateClaim);

// claimRouter.delete("/:id", deleteClaim);

export default claimRouter;
