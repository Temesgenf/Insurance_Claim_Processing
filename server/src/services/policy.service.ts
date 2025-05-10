import { CreateProductDto } from "../common/dtos/create-product.dto";
import { Policy } from "../entities/Policy";
import { Product } from "../entities/Product";
import { PolicyRepository } from "../repositories/policy.repository";

class PolicyService {
  static async getAllPolicies() {
    return PolicyRepository.findAll();
  }

  static async createPolicy(policy: Policy) {
    return PolicyRepository.createPolicy(policy);
  }
}

export default PolicyService;
