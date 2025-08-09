import { Request, Response } from "express";
import { ClaimService } from "../services/claim.service";
import { CreateClaimDto } from "../common/dtos/create-claim.dto";
import { NotificationService } from "../services/notification.service";
import { cloudinaryService } from "../services/cloudinary.service";
import { ClaimDocument } from "../entities/Claim-Document";
import { AppDataSource } from "../config/data-source";
// Create a new claim
export async function createClaim(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    req.body.user = req.user;
    const claimData = CreateClaimDto.fromRequestBody(req.body);
    const newClaim = await ClaimService.createClaim(claimData);
    
    // Handle claim document upload if provided
    if (req.file) {
      try {
        // Upload document to Cloudinary
        const { url, public_id } = await cloudinaryService.uploadClaimDocument(
          req.file.buffer,
          req.file.originalname
        );
        
        // Save document metadata to database
        const claimDocumentRepository = AppDataSource.getRepository(ClaimDocument);
        const claimDocument = claimDocumentRepository.create({
          claimId: newClaim.claimId,
          fileUrl: url,
          originalFileName: req.file.originalname
        });
        
        await claimDocumentRepository.save(claimDocument);
        
        // Update the response to include document info
        (newClaim as any).document = {
          url,
          public_id,
          originalFileName: req.file.originalname
        };
      } catch (uploadError) {
        console.error("Error uploading claim document:", uploadError);
        // Don't fail the claim creation if document upload fails
        // Just log the error and continue
      }
    }

    NotificationService.emitToUser(req.body.user.userId, {
      type: "claim",
      message: "Your claim has been created.",
      data: {
        timestamp: new Date().toISOString(),
        path: `user/claims/${newClaim.claimId}`
      }
    });

    console.log("claim created successfully", newClaim);
    return res.status(201).json(newClaim);
  } catch (error) {
    console.error("Error creating claim:", error);
    return res.status(500).json({ message: "Failed to create claim" });
  }
}

export async function getUserClaims(
  req: Request,
  res: Response

): Promise<Response> {
  try {
    const userId = req?.user?.userId;
    const claims = await ClaimService.getClaimsByUserId(userId!);
    return res.status(200).json(claims);
  }
  catch (error) {
    console.error("Error fetching claims:", error);
    return res.status(500).json({ message: "Failed to fetch claims" });
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

// Get documents for a specific claim
export async function getClaimDocuments(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    
    // Check if claim exists
    const claim = await ClaimService.getClaimById(+id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    
    // Get documents for this claim
    const claimDocumentRepository = AppDataSource.getRepository(ClaimDocument);
    const documents = await claimDocumentRepository.find({
      where: { claimId: +id }
    });
    
    return res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching claim documents:", error);
    return res.status(500).json({ message: "Failed to fetch claim documents" });
  }
}

// Upload document to existing claim
export async function uploadClaimDocument(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    
    // Check if claim exists
    const claim = await ClaimService.getClaimById(+id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    // Upload document to Cloudinary
    const { url, public_id, resource_type } = await cloudinaryService.uploadClaimDocument(
      req.file.buffer,
      req.file.originalname
    );
    
    // Save document metadata to database
    const claimDocumentRepository = AppDataSource.getRepository(ClaimDocument);
    const claimDocument = claimDocumentRepository.create({
      claimId: claim.claimId,
      fileUrl: url,
      originalFileName: req.file.originalname
    });
    
    await claimDocumentRepository.save(claimDocument);
    
    return res.status(201).json({
      message: "Document uploaded successfully",
      document: {
        url,
        public_id,
        resource_type,
        originalFileName: req.file.originalname
      }
    });
  } catch (error) {
    console.error("Error uploading claim document:", error);
    return res.status(500).json({ message: "Failed to upload document" });
  }
}

// Delete a claim document by ID
export async function deleteClaimDocument(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id, documentId } = req.params;
    
    // Check if claim exists
    const claim = await ClaimService.getClaimById(+id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    
    // Check if document exists
    const claimDocumentRepository = AppDataSource.getRepository(ClaimDocument);
    const document = await claimDocumentRepository.findOne({
      where: { claimDocumentId: +documentId, claimId: +id }
    });
    
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    if (!document.fileUrl) {
      console.error("Document URL is missing");
      return res.status(400).json({ message: "Document URL is missing" });
    }
    // Delete from Cloudinary
    try {
      const publicId = document.fileUrl.split('/').pop()?.split('.')[0];
  if (publicId) {
    await cloudinaryService.deleteImage(publicId);
  }
      
    } catch (error) {
      console.error("Error deleting document from Cloudinary:", error);
      // Continue with database deletion even if Cloudinary deletion fails
    }
    
    // Delete from database
    await claimDocumentRepository.remove(document);
    
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting claim document:", error);
    return res.status(500).json({ message: "Failed to delete document" });
  }
}

// Delete a claim by ID
export async function deleteClaim(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const deleted = await ClaimService.deleteClaim(+id);
    if (!deleted) {
      return res.status(404).json({ message: "Claim not found" });
    }
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting claim:", error);
    return res.status(500).json({ message: "Failed to delete claim" });
  }
}
