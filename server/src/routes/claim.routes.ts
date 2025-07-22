import { Router } from "express";
import {
  createClaim,
  getAllClaims,
  getClaimById,
  approveClaim,
  rejectClaim,
  deleteClaim,
  getUserClaims,
} from "../controllers/claim.controller";
import { verifyToken } from "../middleware/auth.middleware";

const claimRouter = Router();
claimRouter.post("/",verifyToken, createClaim);

claimRouter.get("/userclaims",verifyToken, getUserClaims);

claimRouter.get("/:id", getClaimById);
claimRouter.put("/:id/approve", approveClaim);
claimRouter.put("/:id/reject", rejectClaim);




// claimRouter.put("/:id", updateClaim);

claimRouter.delete("/:id", deleteClaim);

export default claimRouter;
