import { CreatePolicyDto } from "../common/dtos/create-policy.dto";
import { Policy } from "../entities/Policy";
import { PolicyRepository } from "../repositories/policy.repository";

class PolicyService {
  static async getAllPolicies() {
    return PolicyRepository.findAll();
  }

  static async createPolicy(policyDto: CreatePolicyDto) {
    policyDto.policyNumber = `POL-${Math.floor(
      Math.random() * 10000
    )}-${Math.floor(Math.random() * 10000)}`;
    policyDto.policyNumber = `POL-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;

    policyDto.startDate = new Date();
    policyDto.endDate = new Date();
    // Set timestamps for creation
    (policyDto as any).createdAt = new Date();
    (policyDto as any).updatedAt = new Date();
    return PolicyRepository.createPolicy(policyDto);
  }

  static async getPolicyById(id: number) {
    return PolicyRepository.findById(id);
  }

  static async getPolicyByPolicyNumber(policyNumber: string) {
    return PolicyRepository.findByPolicyNumber(policyNumber);
  }

  static async approvePolicy(id: number) {
    return PolicyRepository.updatePolicyStatus(id, "approved");
  }

  static async rejectPolicy(id: number) {
    return PolicyRepository.updatePolicyStatus(id, "rejected");
  }

  static async deletePolicy(id: number) {
    return PolicyRepository.deletePolicy(id);
  }
}


export default PolicyService;
