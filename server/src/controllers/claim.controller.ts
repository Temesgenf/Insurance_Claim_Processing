import { Request, Response } from "express";
import { ClaimService } from "../services/claim.service";
import { CreateClaimDto } from "../common/dtos/create-claim.dto";

// Create a new claim
export async function createClaim(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    console.log(req.body);
    const claimData = CreateClaimDto.fromRequestBody(req.body);
    console.log("Claim data from request body:", claimData);
    console.log("Claim data:", claimData);
    const newClaim = await ClaimService.createClaim(claimData);
    return res.status(201).json(newClaim);
  } catch (error) {
    console.error("Error creating claim:", error);
    return res.status(500).json({ message: "Failed to create claim" });
  }
}

export async function approveClaim(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const updatedClaim = await ClaimService.updateClaimStatus(+id, "Approved");
    if (!updatedClaim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    return res.status(200).json(updatedClaim);
  } catch (error) {
    console.error("Error approving claim:", error);
    return res.status(500).json({ message: "Failed to approve claim" });
  }
}

export async function rejectClaim(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const updatedClaim = await ClaimService.updateClaimStatus(+id, "Rejected");
    if (!updatedClaim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    return res.status(200).json(updatedClaim);
  } catch (error) {
    console.error("Error rejecting claim:", error);
    return res.status(500).json({ message: "Failed to reject claim" });
  }
}

// Get all claims
export async function getAllClaims(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const claims = await ClaimService.getAllClaims();
    return res.status(200).json(claims);
  } catch (error) {
    console.error("Error fetching claims:", error);
    return res.status(500).json({ message: "Failed to fetch claims" });
  }
}

// Get a single claim by ID
export async function getClaimById(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const claim = await ClaimService.getClaimById(+id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    return res.status(200).json(claim);
  } catch (error) {
    console.error("Error fetching claim:", error);
    return res.status(500).json({ message: "Failed to fetch claim" });
  }
}
