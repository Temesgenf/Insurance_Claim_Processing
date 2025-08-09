import { Router } from "express";
import {
  createClaim,
  getAllClaims,
  getClaimById,
  approveClaim,
  rejectClaim,
  deleteClaim,
  getUserClaims,
  uploadClaimDocument,
  getClaimDocuments,
  deleteClaimDocument,
} from "../controllers/claim.controller";
import { verifyToken, uploadClaimDocumentMiddleware } from "../middleware/auth.middleware";

const claimRouter = Router();
claimRouter.post("/", verifyToken, uploadClaimDocumentMiddleware, createClaim);

claimRouter.get("/userclaims",verifyToken, getUserClaims);

claimRouter.get("/:id", getClaimById);
claimRouter.put("/:id/approve", approveClaim);
claimRouter.put("/:id/reject", rejectClaim);

// Upload document to existing claim
claimRouter.post("/:id/documents", verifyToken, uploadClaimDocumentMiddleware, uploadClaimDocument);

// Get documents for a specific claim
claimRouter.get("/:id/documents", verifyToken, getClaimDocuments);

// Delete a specific document from a claim
claimRouter.delete("/:id/documents/:documentId", verifyToken, deleteClaimDocument);

// claimRouter.put("/:id", updateClaim);

claimRouter.delete("/:id", deleteClaim);

export default claimRouter;
