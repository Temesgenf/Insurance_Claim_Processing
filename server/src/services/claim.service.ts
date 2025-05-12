import { CreateClaimDto } from "../common/dtos/create-claim.dto";
import { ApplicationStatus } from "../common/enums/application-status.enum";
import { Claim } from "../entities/Claim";
import { ClaimRepository } from "../repositories/claim.repository";
import { AppDataSource } from "../config/data-source";

export class ClaimService {
  static async getAllClaims() {
    return ClaimRepository.findAll();
  }

  static async createClaim(claim: CreateClaimDto) {
    // for claimId we will generate a random claimnumber which mimics actual claimnumber in insurance systems but it should be unique and has patter like CLA-XXXX-XXXX

    claim.claimNumber = `CLA-${Math.floor(Math.random() * 10000)}-${Math.floor(
      Math.random() * 10000
    )}`;
    claim.claimNumber = `CLA-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;
    return ClaimRepository.createClaim(claim);
  }
  
  static async updateClaimStatus(claimId: number, status: string) {
    const claim = await ClaimRepository.findById(claimId);
    if (!claim) return null;
    claim.status = status;
    return await AppDataSource.getRepository('Claim').save(claim);
  }

  static async getClaimById(claimId: number) {
    return ClaimRepository.findById(claimId).then((claim) => {
      if (!claim) {
        throw new Error("Claim not found");
      }
      return claim;
    });
  }

  static async deleteClaim(claimId: number) {
    return ClaimRepository.deleteClaim(claimId);
  }
}
