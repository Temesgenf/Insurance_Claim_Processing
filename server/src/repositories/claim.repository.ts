import { EntityRepository, Repository } from "typeorm";
import { Claim } from "../entities/Claim";
import { AppDataSource } from "../config/data-source";
import { CreateClaimDto } from "../common/dtos/create-claim.dto";

@EntityRepository(Claim)
export class ClaimRepository extends Repository<Claim> {
  // Find claims by status
  static async findByStatus(status: string): Promise<Claim[]> {
    return AppDataSource.getRepository(Claim).find({
      where: { status },
    });
  }

  // Find claims by policy ID
  static async findByPolicyId(policyId: string): Promise<Claim[]> {
    return AppDataSource.getRepository(Claim).find({
      where: { policyId },
    });
  }

  // Find claims by claim number
  static async findByClaimNumber(claimNumber: string): Promise<Claim[]> {
    return AppDataSource.getRepository(Claim).find({
      where: { claimNumber },
    });
  }

  // Create a new claim
  static async createClaim(claim: CreateClaimDto): Promise<Claim> {
    console.log("claim", claim);
    return AppDataSource.getRepository(Claim).save(claim);
  }

  // Find a claim by ID
  static async findById(claimId: number): Promise<Claim | null> {
    return AppDataSource.getRepository(Claim).findOne({
      where: { claimId },
    });
  }

  // Find all claims
  static async findAll(): Promise<Claim[]> {
    return AppDataSource.getRepository(Claim).find();
  }

  // Delete a claim by ID
  static async deleteClaim(claimId: number): Promise<boolean> {
    const result = await AppDataSource.getRepository(Claim).delete({ claimId });
    return !!result.affected && result.affected > 0;
  }
}
