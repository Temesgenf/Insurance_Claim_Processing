import { CreatePolicyDto } from "../common/dtos/create-policy.dto";
import { Policy } from "../entities/Policy";
import { PolicyRepository } from "../repositories/policy.repository";

class PolicyService {
  static async getAllPolicies() {
    return PolicyRepository.findAll();
  }

  static async createPolicy(policyDto: CreatePolicyDto) {
    policyDto.policyNumber = `POL-${Math.floor(Math.random() * 10000)}-${Math.floor(
      Math.random() * 10000
    )}`;
    policyDto.policyNumber = `POL-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;

    policyDto.startDate = new Date();
    policyDto.endDate = new Date();
    return PolicyRepository.createPolicy(policyDto);
  }

  static async getPolicyById(id: number) {
    return PolicyRepository.findById(id);
  }
}

export default PolicyService;
