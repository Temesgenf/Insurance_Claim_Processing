import { Product } from "../entities/Product";
import { AppDataSource } from "../config/data-source";
// import { CreateProductDto } from "../common/dtos/create-product.dto";
import { Policy } from "../entities/Policy";
import { CreatePolicyDto } from "../common/dtos/create-policy.dto";
import { ApplicationStatus } from "../common/enums/application-status.enum";

export class PolicyRepository {
  static async findAll(): Promise<Policy[]> {
    return AppDataSource.getRepository(Policy).find();
  }

  static async findById(id: number): Promise<Policy | null> {
    return AppDataSource.getRepository(Policy).findOne({
      where: { policyId: id },
    });
  }

  static async findByPolicyNumber(
    policyNumber: string
  ): Promise<Policy | null> {
    return AppDataSource.getRepository(Policy).findOne({
      where: { policyNumber },
    });
  }

  static async createPolicy(policyDto: CreatePolicyDto) {
    // Create a policy entity from the DTO
    const policyEntity = {
      productId: policyDto.productId,
      policyNumber: policyDto.policyNumber,
      startDate: policyDto.startDate,
      endDate: policyDto.endDate,
      status: policyDto.status || ApplicationStatus.PENDING,
      premiumAmount: policyDto.premiumAmount,
      deductibleAmount: policyDto.deductibleAmount,
      coverageLimit: policyDto.coverageLimit,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const response = await AppDataSource.getRepository(Policy).save(policyEntity);
    return response;
  }

  static async updatePolicyStatus(policyId: number, status: ApplicationStatus) {
    const repo = AppDataSource.getRepository(Policy);
    const policy = await repo.findOne({ where: { policyId } });
    if (!policy) return null;
    policy.status = status;
    return await repo.save(policy);
  }

  static async deletePolicy(policyId: number) {
    const repo = AppDataSource.getRepository(Policy);
    return await repo.delete(policyId);
  }
}

