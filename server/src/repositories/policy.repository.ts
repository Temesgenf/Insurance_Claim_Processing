import { Product } from "../entities/Product";
import { AppDataSource } from "../config/data-source";
import { CreateProductDto } from "../common/dtos/create-product.dto";
import { Policy } from "../entities/Policy";

export class PolicyRepository {
  static async findAll(): Promise<Policy[]> {
    return AppDataSource.getRepository(Policy).find();
  }

  static async createPolicy(policy: Policy) {
    const response = await AppDataSource.getRepository(Policy).save(policy);
    return response;
  }
}
