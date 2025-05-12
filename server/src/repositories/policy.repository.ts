import { Product } from "../entities/Product";
import { AppDataSource } from "../config/data-source";
import { CreateProductDto } from "../common/dtos/create-product.dto";
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

  static async createPolicy(policyDto: CreatePolicyDto) {
    const response = await AppDataSource.getRepository(Policy).save(policyDto);
    return response;
  }

  static async updatePolicyStatus(policyId: number, status: string) {
    const repo = AppDataSource.getRepository(Policy);
    const policy = await repo.findOne({ where: { policyId } });
    if (!policy) return null;
    policy.status = status as ApplicationStatus;
    return await repo.save(policy);
  }

  static async deletePolicy(policyId: number) {
    const repo = AppDataSource.getRepository(Policy);
    return await repo.delete(policyId);
  }
}

