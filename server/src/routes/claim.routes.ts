import { Router } from "express";
import {
  createClaim,
  getAllClaims,
  getClaimById,
  approveClaim,
  rejectClaim,
} from "../controllers/claim.controller";

const claimRouter = Router();
claimRouter.post("/", createClaim);

claimRouter.get("/", getAllClaims);

claimRouter.get("/:id", getClaimById);
claimRouter.put("/:id/approve", approveClaim);
claimRouter.put("/:id/reject", rejectClaim);




// claimRouter.put("/:id", updateClaim);

// claimRouter.delete("/:id", deleteClaim);

export default claimRouter;
